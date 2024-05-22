import { FC, Fragment, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { useApp } from '../../../../context/App';
import { GuildChannel } from '../../../../services/discord/guild/guild.type';
import { MessageType } from '../../../../services/discord/modules/modules.types';
import findStringVarsAndSubstitute from '../../../../utils/findStringVarsAndSubstitute';
import Grid from '../../../Grid';
import AutocompleteInput from '../../items/Autocomplete/Input';
import AutocompleteTextarea from '../../items/Autocomplete/Textarea';
import Select from '../../items/Select';
import Switch from '../../items/Switch';
import DarkFormContainer from '../styles/DarkFormContainer';
import { formGridGutter } from '../styles/Default';
import autocompleteVars from './autocompleteVars';
import EmbedFieldList from './EmbedFieldList';
import handleChannels from './handleChannels';

const formElementsBreakpoint = { xs: 24, md: 12 };

const autocompleteTriggerWithoutPicture = [
    {
        name: 'poingVars',
        list: autocompleteVars.poingTextVars.listVarsValues({ withoutPictures: true }),
        trigger: autocompleteVars.poingTextVars.trigger
    }
]

type MessageFormProps = {
    channels: GuildChannel[];
    disableAutocomplete?: boolean;
}

const MessageForm: FC<MessageFormProps> = props => {
    const { colors } = useTheme();
    const { locale: { forms: { layouts: { message: messageForm } } } } = useApp();
    const methods = useFormContext<MessageType>();
    const channels = handleChannels(props.channels);

    const pictureVars = Object.entries(messageForm.poingTextVars)
        .filter(([key, label]) => key.match(/picture/) || key === '')
        .map(([key, value]) => ({ label: value, value: key }));

    const getValues = methods.getValues;
    const register = methods.register;
    const isMessageText = getValues('isMessageText');

    useEffect(() => {
        if (isMessageText) {
            register('messageEmbed.description', { required: false });
            register('messageText');
        } else {
            register('messageEmbed.description');
            register('messageText', { required: false });
        }
    }, [isMessageText, getValues, register]);

    return (
        <Grid>
            <Grid.Row breakpoints={{ xs: 24 }}>
                <Grid horizontalAlign='center' gutter={formGridGutter}>
                    <Grid.Row breakpoints={{ xs: 24, md: 8, lg: 6 }}>
                        <DarkFormContainer style={{ height: '100%' }}>
                            <Switch
                                defaultChecked={isMessageText}
                                onChange={e => { methods.setValue('isMessageText', e.target.checked) }}
                                label={methods.watch('isMessageText') ? messageForm.field.isMessageText.activeLabel : messageForm.field.isMessageText.disabledLabel}
                                color={{ bgActive: colors.primary }}
                                containerStyle={{
                                    display: 'flex', flexFlow: 'column', alignItems: 'center',
                                }}
                            />
                        </DarkFormContainer>
                    </Grid.Row>
                    <Grid.Row breakpoints={{ xs: 24, md: 8, lg: 6 }}>
                        <DarkFormContainer
                            style={{
                                height: '100%',
                                paddingLeft: formGridGutter[0],
                                paddingRight: formGridGutter[0]
                            }}
                        >
                            <Select
                                label={messageForm.field.channelId.label}
                                initialValue={channels.find(channel => channel.value === getValues('channelId')) ?? channels[0]}
                                options={channels}
                                onSelect={(selectedValue) => {
                                    methods.setValue('channelId', selectedValue.value, { shouldValidate: true });
                                }}
                            />
                        </DarkFormContainer>
                    </Grid.Row>
                </Grid>
            </Grid.Row>

            {!methods.watch('isMessageText') && (
                <Fragment>
                    <DarkFormContainer>
                        <Grid.Row breakpoints={{ xs: 24 }}>
                            <Grid gutter={formGridGutter}>
                                <Grid.Row breakpoints={formElementsBreakpoint}>
                                    <AutocompleteInput
                                        label={messageForm.field.messageEmbedAuthorName.label}
                                        placeholder={messageForm.field.messageEmbedAuthorName.placeholder}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errorMessage={methods.formState.errors.messageEmbed?.author?.name?.message}
                                        disableAutocomplete={props.disableAutocomplete}
                                        {...methods.register('messageEmbed.author.name', {
                                            maxLength: {
                                                value: 50,
                                                message: findStringVarsAndSubstitute(messageForm.field.messageEmbedAuthorName.validation.maxLength!,
                                                    { default: false, '{%value%}': '50' }
                                                ).join('')
                                            }
                                        })}
                                    />
                                </Grid.Row>
                                {getValues('messageEmbed.author.name') && (
                                    <Grid.Row breakpoints={formElementsBreakpoint}>
                                        <Select
                                            label={messageForm.field.messageEmbedAuthorPicture.label}
                                            initialValue={pictureVars.find(item => item.value === getValues('messageEmbed.author.picture'))}
                                            options={pictureVars}
                                            onSelect={function (selectedValue) {
                                                methods.setValue('messageEmbed.author.picture', selectedValue.value, { shouldValidate: true });
                                            }}
                                        />
                                    </Grid.Row>
                                )}
                            </Grid>
                        </Grid.Row>
                    </DarkFormContainer>

                    <DarkFormContainer>
                        <Grid.Row breakpoints={{ xs: 24 }} >
                            <Grid gutter={formGridGutter}>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteInput
                                        label={messageForm.field.messageEmbedTitle.label}
                                        placeholder={messageForm.field.messageEmbedTitle.placeholder}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errorMessage={methods.formState.errors.messageEmbed?.title?.message}
                                        disableAutocomplete={props.disableAutocomplete}
                                        {...methods.register('messageEmbed.title', {
                                            maxLength: {
                                                value: 100,
                                                message: findStringVarsAndSubstitute(messageForm.field.messageEmbedTitle.validation.maxLength, {
                                                    default: false, '{%value%}': '100'
                                                }).join('')
                                            }
                                        })}
                                    />
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteTextarea
                                        label={messageForm.field.messageEmbedDescription.label}
                                        placeholder={messageForm.field.messageEmbedDescription.placeholder}
                                        spellCheck={false}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errormessage={methods.formState.errors.messageEmbed?.description?.message}
                                        disableAutocomplete={props.disableAutocomplete}
                                        {...methods.register('messageEmbed.description', {
                                            required: {
                                                value: true,
                                                message: messageForm.field.messageEmbedDescription.validation.required!
                                            },
                                            maxLength: {
                                                value: 300,
                                                message: findStringVarsAndSubstitute(messageForm.field.messageEmbedDescription.validation.maxLength!, {
                                                    default: false, '{%value%}': '300'
                                                }).join('')
                                            }
                                        })}
                                    />
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteInput
                                        label={messageForm.field.messageEmbedThumbnail.label}
                                        placeholder={messageForm.field.messageEmbedThumbnail.placeholder}
                                        triggers={[
                                            {
                                                name: 'poingVars',
                                                list: autocompleteVars.poingTextVars.listVarsValues().filter(text => /picture/.test(text)),
                                                trigger: autocompleteVars.poingTextVars.trigger
                                            }
                                        ]}
                                        errorMessage={methods.formState.errors.messageEmbed?.thumbnail?.message}
                                        {...methods.register('messageEmbed.thumbnail', {
                                            pattern: {
                                                value: /(^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&/=]*)$)|(^{[\w.@]+}$)/,
                                                message: messageForm.field.messageEmbedThumbnail.validation.pattern
                                            },
                                            maxLength: {
                                                value: 150,
                                                message: messageForm.field.messageEmbedThumbnail.validation.maxLength?.replace('{%value%}', '150')!
                                            }
                                        })}
                                    />
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </DarkFormContainer>

                    <DarkFormContainer>
                        <Grid.Row breakpoints={{ xs: 24 }}>
                            <EmbedFieldList disableAutocomplete={props.disableAutocomplete} />
                        </Grid.Row>
                    </DarkFormContainer>

                    <DarkFormContainer>
                        <Grid.Row
                            breakpoints={{ xs: 24 }}
                            style={{
                                paddingLeft: formGridGutter[0] / 2,
                                paddingRight: formGridGutter[0] / 2,
                            }}
                        >
                            <AutocompleteInput
                                label={messageForm.field.messageEmbedFooter.label}
                                placeholder={messageForm.field.messageEmbedFooter.placeholder}
                                triggers={autocompleteTriggerWithoutPicture}
                                disableAutocomplete={props.disableAutocomplete}
                                {...methods.register('messageEmbed.footer', {
                                    maxLength: {
                                        value: 100,
                                        message: findStringVarsAndSubstitute(messageForm.field.messageEmbedFooter.validation.maxLength!, {
                                            default: false, '{%value%}': '100'
                                        }).join(''),
                                    }
                                })}
                            />
                        </Grid.Row>
                    </DarkFormContainer>

                </Fragment>
            )}

            {methods.watch('isMessageText') && (
                <Fragment>
                    <Grid.Row breakpoints={{ xs: 24 }}>
                        <DarkFormContainer>
                            <AutocompleteTextarea
                                label={messageForm.field.messageText.label}
                                placeholder={messageForm.field.messageText.placeholder}
                                errormessage={methods.formState.errors.messageText?.message}
                                initialValue={getValues?.('messageText') || ''}
                                disableAutocomplete={props.disableAutocomplete}
                                triggers={[
                                    {
                                        name: 'poingVars',
                                        list: autocompleteVars.poingTextVars.listVarsValues(),
                                        trigger: autocompleteVars.poingTextVars.trigger
                                    }
                                ]}
                                {...methods.register('messageText', {
                                    required: {
                                        value: true,
                                        message: messageForm.field.messageText.validation.required!
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: findStringVarsAndSubstitute(messageForm.field.messageText.validation.maxLength!, {
                                            default: false, '{%value%}': '500'
                                        }).join('')
                                    }
                                })}
                            />
                        </DarkFormContainer>
                    </Grid.Row>
                </Fragment>
            )}
        </Grid>
    );
}

export default MessageForm;
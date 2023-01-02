import { FC, Fragment, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { WelcomeOrLeaveMemberType } from '../../../services/discord/modules/modules.types';
import Grid from '../../Grid';
import Switch from '../items/Switch';
import AutocompleteTextarea from '../items/Autocomplete/Textarea';
import AutocompleteInput from '../items/Autocomplete/Input';
import autocompleteVars from './autocompleteVars';
import DarkFormContainer from '../Layouts/DarkFormContainer';
import Select from '../items/Select';
import EmbedFieldList from './EmbedFieldList';
import { useApp } from '../../../context/App';
import findStringVarsAndSubstitute from '../../../utils/findStringVarsAndSubstitute';

const formElementsBreakpoint = { xs: 24, md: 12 };
export const gridGutter: [number, number] = [12, 12];

const autocompleteTriggerWithoutPicture = [
    {
        name: 'poingVars',
        list: autocompleteVars.poingTextVars.listVarsValues({ withoutPictures: true }),
        trigger: autocompleteVars.poingTextVars.trigger
    }
]

const FormElements: FC<{ channels: { label: string; value: string; }[] }> = props => {
    const { colors } = useTheme();
    const { locale: { forms: { welcomeOrLeaveMember } } } = useApp();
    const methods = useFormContext<WelcomeOrLeaveMemberType>();

    const pictureVars = Object.entries(welcomeOrLeaveMember.poingTextVars)
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
                <Grid horizontalAlign='center' gutter={gridGutter}>
                    <Grid.Row breakpoints={{ xs: 24, md: 8, lg: 6 }}>
                        <DarkFormContainer style={{ height: '100%' }}>
                            <Switch
                                defaultChecked={isMessageText}
                                onChange={e => { methods.setValue('isMessageText', e.target.checked) }}
                                label={methods.watch('isMessageText') ? welcomeOrLeaveMember.field.isMessageText.activeLabel : welcomeOrLeaveMember.field.isMessageText.disabledLabel}
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
                                paddingLeft: gridGutter[0],
                                paddingRight: gridGutter[0]
                            }}
                        >
                            <Select
                                label={welcomeOrLeaveMember.field.channelId.label}
                                initialValue={props.channels.find(channel => channel.value === getValues('channelId')) || props.channels[0]}
                                options={props.channels}
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
                            <Grid gutter={gridGutter}>
                                <Grid.Row breakpoints={formElementsBreakpoint}>
                                    <AutocompleteInput
                                        label={welcomeOrLeaveMember.field.messageEmbedAuthorName.label}
                                        placeholder={welcomeOrLeaveMember.field.messageEmbedAuthorName.placeholder}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errorMessage={methods.formState.errors.messageEmbed?.author?.name?.message}
                                        {...methods.register('messageEmbed.author.name', {
                                            maxLength: {
                                                value: 50,
                                                message: findStringVarsAndSubstitute(welcomeOrLeaveMember.field.messageEmbedAuthorName.validation.maxLength,
                                                    { default: false, '{%value%}': '50' }
                                                ).join('')
                                            }
                                        })}
                                    />
                                </Grid.Row>
                                {getValues('messageEmbed.author.name') && (
                                    <Grid.Row breakpoints={formElementsBreakpoint}>
                                        <Select
                                            label={welcomeOrLeaveMember.field.messageEmbedAuthorPicture.label}
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
                            <Grid gutter={gridGutter}>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteInput
                                        label={welcomeOrLeaveMember.field.messageEmbedTitle.label}
                                        placeholder={welcomeOrLeaveMember.field.messageEmbedTitle.placeholder}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errorMessage={methods.formState.errors.messageEmbed?.title?.message}
                                        {...methods.register('messageEmbed.title', {
                                            maxLength: {
                                                value: 100,
                                                message: findStringVarsAndSubstitute(welcomeOrLeaveMember.field.messageEmbedTitle.validation.maxLength, {
                                                    default: false, '{%value%}': '100'
                                                }).join('')
                                            }
                                        })}
                                    />
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteTextarea
                                        label={welcomeOrLeaveMember.field.messageEmbedDescription.label}
                                        placeholder={welcomeOrLeaveMember.field.messageEmbedDescription.placeholder}
                                        spellCheck={false}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errormessage={methods.formState.errors.messageEmbed?.description?.message}
                                        {...methods.register('messageEmbed.description', {
                                            required: {
                                                value: true,
                                                message: welcomeOrLeaveMember.field.messageEmbedDescription.validation.required
                                            },
                                            maxLength: {
                                                value: 300,
                                                message: findStringVarsAndSubstitute(welcomeOrLeaveMember.field.messageEmbedDescription.validation.maxLength, {
                                                    default: false, '{%value%}': '300'
                                                }).join('')
                                            }
                                        })}
                                    />
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </DarkFormContainer>

                    <DarkFormContainer>
                        <Grid.Row breakpoints={{ xs: 24 }}>
                            <EmbedFieldList />
                        </Grid.Row>
                    </DarkFormContainer>

                    <DarkFormContainer>
                        <Grid.Row
                            breakpoints={{ xs: 24 }}
                            style={{
                                paddingLeft: gridGutter[0] / 2,
                                paddingRight: gridGutter[0] / 2,
                            }}
                        >
                            <AutocompleteInput
                                label={welcomeOrLeaveMember.field.messageEmbedFooter.label}
                                placeholder={welcomeOrLeaveMember.field.messageEmbedFooter.placeholder}
                                triggers={autocompleteTriggerWithoutPicture}
                                {...methods.register('messageEmbed.footer', {
                                    maxLength: {
                                        value: 100,
                                        message: findStringVarsAndSubstitute(welcomeOrLeaveMember.field.messageEmbedFooter.validation.maxLength, {
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
                                label={welcomeOrLeaveMember.field.messageText.label}
                                placeholder={welcomeOrLeaveMember.field.messageText.placeholder}
                                errormessage={methods.formState.errors.messageText?.message}
                                initialValue={getValues?.('messageText') || ''}
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
                                        message: welcomeOrLeaveMember.field.messageText.validation.required
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: findStringVarsAndSubstitute(welcomeOrLeaveMember.field.messageText.validation.maxLength, {
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

export default FormElements;
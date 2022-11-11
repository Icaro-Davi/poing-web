import { FC, Fragment, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { WelcomeModuleType } from '../../../services/discord/modules/modules.types';
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
export const welcomeModuleGridGutter: [number, number] = [12, 12];

const autocompleteTriggerWithoutPicture = [
    {
        name: 'poingVars',
        list: autocompleteVars.welcomeModuleVars.listVarsValues({ withoutPictures: true }),
        trigger: autocompleteVars.welcomeModuleVars.trigger
    }
]

const FormElements: FC<{ channels: { label: string; value: string; }[] }> = props => {
    const { colors } = useTheme();
    const { locale: { forms: { welcomeMember } } } = useApp();
    const methods = useFormContext<WelcomeModuleType>();

    const pictureVars = Object.entries(welcomeMember.welcomeMemberPoingVars)
        .filter(([key, label]) => key.match(/picture/) || key === '')
        .map(([key, value]) => ({ label: value, value: key }));

    return (
        <Grid>
            <Grid.Row breakpoints={{ xs: 24 }}>
                <Grid horizontalAlign='center' gutter={welcomeModuleGridGutter}>
                    <Grid.Row breakpoints={{ xs: 24, md: 8, lg: 6 }}>
                        <DarkFormContainer style={{ height: '100%' }}>
                            <Switch
                                defaultChecked={methods.getValues('isMessageText')}
                                onChange={e => { methods.setValue('isMessageText', e.target.checked) }}
                                label={methods.watch('isMessageText') ? welcomeMember.field.isMessageText.activeLabel : welcomeMember.field.isMessageText.disabledLabel}
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
                                paddingLeft: welcomeModuleGridGutter[0],
                                paddingRight: welcomeModuleGridGutter[0]
                            }}
                        >
                            <Select
                                label={welcomeMember.field.channelId.label}
                                initialValue={props.channels.find(channel => channel.value === methods.getValues('channelId')) || props.channels[0]}
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
                            <Grid gutter={welcomeModuleGridGutter}>
                                <Grid.Row breakpoints={formElementsBreakpoint}>
                                    <AutocompleteInput
                                        label={welcomeMember.field.messageEmbedAuthorName.label}
                                        placeholder={welcomeMember.field.messageEmbedAuthorName.placeholder}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errorMessage={methods.formState.errors.messageEmbed?.author?.name?.message}
                                        {...methods.register('messageEmbed.author.name', {
                                            maxLength: {
                                                value: 50,
                                                message: findStringVarsAndSubstitute(welcomeMember.field.messageEmbedAuthorName.validation.maxLength,
                                                    { default: false, '{%value%}': '50' }
                                                ).join('')
                                            }
                                        })}
                                    />
                                </Grid.Row>
                                {methods.getValues('messageEmbed.author.name') && (
                                    <Grid.Row breakpoints={formElementsBreakpoint}>
                                        <Select
                                            label={welcomeMember.field.messageEmbedAuthorPicture.label}
                                            initialValue={pictureVars.find(item => item.value === methods.getValues('messageEmbed.author.picture'))}
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
                            <Grid gutter={welcomeModuleGridGutter}>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteInput
                                        label={welcomeMember.field.messageEmbedTitle.label}
                                        placeholder={welcomeMember.field.messageEmbedTitle.placeholder}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errorMessage={methods.formState.errors.messageEmbed?.title?.message}
                                        {...methods.register('messageEmbed.title', {
                                            maxLength: {
                                                value: 100,
                                                message: findStringVarsAndSubstitute(welcomeMember.field.messageEmbedTitle.validation.maxLength, {
                                                    default: false, '{%value%}': '100'
                                                }).join('')
                                            }
                                        })}
                                    />
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteTextarea
                                        label={welcomeMember.field.messageEmbedDescription.label}
                                        placeholder={welcomeMember.field.messageEmbedDescription.placeholder}
                                        spellCheck={false}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        errormessage={methods.formState.errors.messageEmbed?.description?.message}
                                        {...methods.register('messageEmbed.description', {
                                            maxLength: {
                                                value: 300,
                                                message: findStringVarsAndSubstitute(welcomeMember.field.messageEmbedDescription.validation.maxLength, {
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
                                paddingLeft: welcomeModuleGridGutter[0] / 2,
                                paddingRight: welcomeModuleGridGutter[0] / 2,
                            }}
                        >
                            <AutocompleteInput
                                label={welcomeMember.field.messageEmbedFooter.label}
                                placeholder={welcomeMember.field.messageEmbedFooter.placeholder}
                                triggers={autocompleteTriggerWithoutPicture}
                                {...methods.register('messageEmbed.footer', {
                                    maxLength: {
                                        value: 100,
                                        message: findStringVarsAndSubstitute(welcomeMember.field.messageEmbedFooter.validation.maxLength, {
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
                                label={welcomeMember.field.messageText.label}
                                placeholder={welcomeMember.field.messageText.placeholder}
                                errormessage={methods.formState.errors.messageText?.message}
                                initialValue={methods.getValues?.('messageText') || ''}
                                triggers={[
                                    {
                                        list: autocompleteVars.welcomeModuleVars.listVarsValues(),
                                        name: 'poingVars',
                                        trigger: autocompleteVars.welcomeModuleVars.trigger
                                    }
                                ]}
                                {...methods.register('messageText', {
                                    maxLength: {
                                        value: 500,
                                        message: findStringVarsAndSubstitute(welcomeMember.field.messageText.validation.maxLength, {
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
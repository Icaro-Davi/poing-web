import { FC, Fragment } from 'react';
import { WelcomeModuleType } from '../../../services/discord/modules/modules.types';
import Grid from '../../Grid';
import { FormProps } from '../form.interface';
import Switch from '../items/Switch';
import AutocompleteTextarea from '../items/Autocomplete/Textarea';
import AutocompleteInput from '../items/Autocomplete/Input';
import autocompleteVars from './autocompleteVars';
import DarkFormContainer from '../Layouts/DarkFormContainer';
import Select from '../items/Select';
import { Controller } from 'react-hook-form';
import { BORDER, SPACING } from '../items/DefaultPropertyValues';
import EmbedFieldList from './EmbedFieldList';

const formElementsBreakpoint = { xs: 24, md: 12 };
export const welcomeModuleGridGutter: [number, number] = [12, 12];

// On translate this array create a object with all welcomeModule vars and use them to create as key for array and translate value
const translate = [
    { '': 'Sem Avatar' },
    { '{guild.picture}': 'Avatar da guild' },
    { '{member.picture}': 'Avatar do novo membro' }
]

const autocompleteTriggerWithoutPicture = [
    {
        name: 'poingVars',
        list: autocompleteVars.welcomeModuleVars.listVarsValues({ withoutPictures: true }),
        trigger: autocompleteVars.welcomeModuleVars.trigger
    }
]

const FormElements: FC<FormProps<WelcomeModuleType>> = props => {
    const selectAuthorItems = Object.keys(translate).map(
        (translateKey) => {
            let [[value, label]] = Object.entries(translate[translateKey as any]);
            return { label, value };
        }
    );
    return (
        <Grid>
            <Grid.Row breakpoints={{ xs: 24 }} horizontalAlign='center'>
                <Switch
                    onChange={e => { props.setValue('isMessageText', e.target.checked) }}
                    label={props.watch('isMessageText') ? 'Ativar mensagem incorporada' : 'Ativar mensagem normal'}
                    containerStyle={{
                        boxShadow: '1px 1px 5px #1a1a1a29',
                        padding: SPACING.md,
                        borderRadius: BORDER.radius,
                        display: 'flex', flexFlow: 'column', alignItems: 'center',
                    }}
                />
            </Grid.Row>
            {!props.watch('isMessageText') && (
                <Fragment>
                    <DarkFormContainer>
                        <Grid.Row breakpoints={{ xs: 24 }}>
                            <Grid gutter={welcomeModuleGridGutter}>
                                <Grid.Row breakpoints={formElementsBreakpoint}>
                                    {props.control && (
                                        <Controller
                                            control={props.control}
                                            name='messageEmbed.author.picture'
                                            render={({ field: { onChange, onBlur } }) => (
                                                <Select
                                                    label='Foto do autor'
                                                    initialValue={selectAuthorItems[2]}
                                                    options={selectAuthorItems}
                                                    onBlur={onBlur}
                                                    onSelect={(selectedItem) => onChange(selectedItem.value)}
                                                />

                                            )}
                                        />
                                    )}
                                </Grid.Row>
                                <Grid.Row breakpoints={formElementsBreakpoint}>
                                    <AutocompleteInput
                                        label='Descrição do autor'
                                        placeholder='Escreva algo...'
                                        triggers={autocompleteTriggerWithoutPicture}
                                        {...props.register('messageEmbed.author.name', {
                                            maxLength: {
                                                value: 50,
                                                message: 'Precisa conter em até 50 caracteres.'
                                            }
                                        })}
                                    />
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </DarkFormContainer>

                    <DarkFormContainer>
                        <Grid.Row breakpoints={{ xs: 24 }} >
                            <Grid gutter={welcomeModuleGridGutter}>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteInput
                                        label='Titulo'
                                        placeholder='Escreva um titulo legal...'
                                        triggers={autocompleteTriggerWithoutPicture}
                                        {...props.register('messageEmbed.title', {
                                            maxLength: {
                                                value: 250,
                                                message: 'Precisa conter em até 250 caracteres.'
                                            }
                                        })}
                                    />
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24 }}>
                                    <AutocompleteTextarea
                                        label='Descrição'
                                        placeholder='Escreva uma descrição legal...'
                                        spellCheck={false}
                                        triggers={autocompleteTriggerWithoutPicture}
                                        {...props.register('messageEmbed.description', {
                                            maxLength: {
                                                value: 250,
                                                message: 'Precisa conter em até 250 caracteres.'
                                            }
                                        })}
                                    />
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </DarkFormContainer>

                    <DarkFormContainer>
                        <Grid.Row breakpoints={{ xs: 24 }}>
                            <EmbedFieldList

                            />
                        </Grid.Row>
                    </DarkFormContainer>
                </Fragment>
            )}
            {props.watch('isMessageText') && (
                <Fragment>
                    <Grid.Row breakpoints={{ xs: 24 }}>
                        <DarkFormContainer>
                            <AutocompleteTextarea
                                label='Mensagem de boas vindas'
                                triggers={[
                                    { list: autocompleteVars.welcomeModuleVars.listVarsValues(), name: 'poingVars', trigger: autocompleteVars.welcomeModuleVars.trigger }
                                ]}
                                placeholder='Escreva com uma mensagem de boas vindas'
                                errormessage={props.formState.errors.messageText?.message}
                                initialValue={props.getValue?.('messageText') || ''}
                                {...props.register('messageText', {
                                    minLength: 0,
                                    maxLength: {
                                        value: 500,
                                        message: 'A mensagem so pode conter até 500 caracteres.'
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
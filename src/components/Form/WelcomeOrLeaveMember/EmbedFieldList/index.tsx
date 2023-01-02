import { FC, memo, useContext, useRef } from 'react';
import { IoArrowUp, IoArrowDownSharp, IoTrashSharp, IoAddSharp } from 'react-icons/io5';
import { ThemeContext } from 'styled-components';
import { FormState, useFieldArray, UseFieldArrayMove, UseFieldArrayRemove, useFormContext, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Grid from '../../../Grid';
import Input from '../../items/Input';
import Switch from '../../items/Switch';
import AutocompleteTextarea from '../../items/Autocomplete/Textarea';
import { gridGutter } from '../Form';
import autocompleteVars from '../autocompleteVars';
import { IconButton, DangerButton, Button } from '../../../Buttons';
import { SPACING } from '../../items/DefaultPropertyValues';
import { Locale } from '../../../../locale/index.type';
import { useApp } from '../../../../context/App';
import findStringVarsAndSubstitute from '../../../../utils/findStringVarsAndSubstitute';

import type { WelcomeOrLeaveMemberType } from '../../../../services/discord/modules/modules.types';

const EmbedFieldGridGutter: [number, number] = [6, 0];
const autocompleteTriggers = [
    {
        name: 'poingVars',
        list: autocompleteVars.poingTextVars.listVarsValues({ withoutPictures: true }),
        trigger: autocompleteVars.poingTextVars.trigger
    }
]

interface IProps {
    index: number;
    has: {
        previous: boolean;
        next: boolean;
    };
    primaryColor: string;
    secondaryColor: string;
    formState: FormState<WelcomeOrLeaveMemberType>;
    locale: Locale;
    register: UseFormRegister<WelcomeOrLeaveMemberType>;
    setValue: UseFormSetValue<WelcomeOrLeaveMemberType>;
    remove: UseFieldArrayRemove;
    move: UseFieldArrayMove;
    forceUpdateForm: () => void;
}

const EmbedField: FC<IProps> = memo((props) => (
    <div style={{ border: '3px dashed #FFF', width: '100%' }}>
        <Grid.Row breakpoints={{ xs: 24 }} style={{ padding: EmbedFieldGridGutter[0] }}>
            <Grid gutter={gridGutter}>
                <Grid.Row breakpoints={{ xs: 6, md: 3 }}>
                    <Switch
                        label={props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldInline.label}
                        color={{ bgActive: props.primaryColor }}
                        onChange={e => { props.setValue(`messageEmbed.fields.${props.index}.inline`, e.target.checked, { shouldValidate: true }) }}
                    />
                </Grid.Row>
                <Grid.Row breakpoints={{ xs: 18, md: 21 }}>
                    <Input
                        label={props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldName.label}
                        placeholder={findStringVarsAndSubstitute(props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldName.placeholder, {
                            default: false, '{%index%}': `${props.index}`
                        }).join('')}
                        errorMessage={props.formState.errors.messageEmbed?.fields?.[props.index]?.name?.message}
                        {...props.register(`messageEmbed.fields.${props.index}.name`, {
                            required: {
                                value: true,
                                message: props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldName.validation.required
                            },
                            maxLength: {
                                value: 100,
                                message: findStringVarsAndSubstitute(props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldName.validation.maxLength, {
                                    default: false, '{%value%}': '100'
                                }).join(''),
                            }
                        })}
                    />
                </Grid.Row>
                <Grid.Row breakpoints={{ xs: 24 }}>
                    <AutocompleteTextarea
                        label={props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldValue.label}
                        placeholder={findStringVarsAndSubstitute(props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldValue.placeholder, {
                            default: false, '{%index%}': `${props.index}`
                        }).join('')}
                        triggers={autocompleteTriggers}
                        errormessage={props.formState.errors.messageEmbed?.fields?.[props.index]?.value?.message}
                        {...props.register(`messageEmbed.fields.${props.index}.value`, {
                            required: {
                                value: true,
                                message: props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldValue.validation.required
                            },
                            maxLength: {
                                value: 250,
                                message: findStringVarsAndSubstitute(props.locale.forms.welcomeOrLeaveMember.field.messageEmbedFieldValue.validation.maxLength, {
                                    default: false, '{%value%}': '250'
                                }).join(''),
                            }
                        })}
                    />
                </Grid.Row>
                <Grid.Row breakpoints={{ xs: 24 }}>
                    <Grid>
                        <Grid.Row breakpoints={{ xs: 8 }} style={{ display: 'flex', flexFlow: 'row', columnGap: SPACING.sm, alignItems: 'center' }}>
                            <IconButton
                                disabled={!props.has.previous}
                                hoverColor={props.primaryColor}
                                onClick={() => {
                                    props.move(props.index, props.index - 1);
                                    props.forceUpdateForm();
                                }}
                            >
                                <IoArrowUp />
                            </IconButton>
                            <IconButton
                                disabled={!props.has.next}
                                hoverColor={props.secondaryColor}
                                onClick={() => {
                                    props.move(props.index, props.index + 1);
                                    props.forceUpdateForm();
                                }}
                            >
                                <IoArrowDownSharp />
                            </IconButton>
                        </Grid.Row>
                        <Grid.Row breakpoints={{ xs: 16 }} horizontalAlign='right'>
                            <div style={{ width: '100%', maxWidth: 200 }}>
                                <DangerButton
                                    label={props.locale.forms.welcomeOrLeaveMember.btnRemoveField}
                                    icon={<IoTrashSharp />}
                                    onClick={() => {
                                        props.remove(props.index);
                                        props.forceUpdateForm();
                                    }}
                                />
                            </div>
                        </Grid.Row>
                    </Grid>
                </Grid.Row>
            </Grid>
        </Grid.Row>
    </div>
));

EmbedField.displayName = 'EmbedField';

const forceUpdateForm = (element: HTMLElement) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    setter?.call(element, `${Math.random().toString(32).slice(2, 7)}`);
    const event = new Event('input', { bubbles: true });
    element?.dispatchEvent(event);
}

const EmbedFields: FC = props => {
    const { locale } = useApp();
    const { colors } = useContext(ThemeContext);
    const { control, watch, register, setValue, formState } = useFormContext<WelcomeOrLeaveMemberType>();
    const forceFormUpdateRef = useRef<HTMLInputElement>(null);
    const { fields, append, remove, move } = useFieldArray({
        control, name: 'messageEmbed.fields',
        rules: { maxLength: 5 },
    });

    const watchFieldArray = watch('messageEmbed.fields');
    const controlledFields = watchFieldArray
        ? fields.map((field, index) => ({
            ...field,
            ...watchFieldArray[index]
        }))
        : [];

    return (
        <Grid gutter={[EmbedFieldGridGutter[0], 0]}>
            <input ref={forceFormUpdateRef} style={{ display: 'none' }} />
            {controlledFields.map((field, index) => (
                <EmbedField
                    key={field.id}
                    index={index}
                    formState={formState}
                    primaryColor={colors.primary}
                    secondaryColor={colors.secondary}
                    locale={locale}
                    register={register}
                    setValue={setValue}
                    move={move}
                    remove={remove}
                    forceUpdateForm={() => forceUpdateForm(forceFormUpdateRef.current!)}
                    has={{
                        next: !!controlledFields[index + 1],
                        previous: !!controlledFields[index - 1]
                    }}
                />
            ))}
            <Grid.Row breakpoints={{ xs: 24 }} horizontalAlign='center'>
                <div style={{ width: 250 }}>
                    <Button
                        icon={<IoAddSharp />}
                        disabled={controlledFields.length === 5}
                        onClick={() => append({ name: '', value: '', inline: false })}
                    >{locale.forms.welcomeOrLeaveMember.btnNewFieldLabel}</Button>
                </div>
            </Grid.Row>
        </Grid>
    );
}

export default EmbedFields;
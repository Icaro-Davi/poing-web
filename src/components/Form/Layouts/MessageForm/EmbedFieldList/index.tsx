import { FC, memo, useContext, useRef } from 'react';
import { FormState, useFieldArray, UseFieldArrayMove, UseFieldArrayRemove, useFormContext, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IoAddSharp, IoArrowDownSharp, IoArrowUp, IoTrashSharp } from 'react-icons/io5';
import { ThemeContext } from 'styled-components';
import { useApp } from '../../../../../context/App';
import { Locale } from '../../../../../locale/index.type';
import findStringVarsAndSubstitute from '../../../../../utils/findStringVarsAndSubstitute';
import { Button, DangerButton, IconButton } from '../../../../Buttons';
import Grid from '../../../../Grid';
import AutocompleteTextarea from '../../../items/Autocomplete/Textarea';
import { SPACING } from '../../../items/DefaultPropertyValues';
import Input from '../../../items/Input';
import Switch from '../../../items/Switch';
import autocompleteVars from '../autocompleteVars';

import type { MessageType } from '../../../../../services/discord/modules/modules.types';
import forceUpdateReactState from '../../../../../utils/forceUpdateReactState';
import DashedBorder from '../../styles/DashedBorder';
import { formGridGutter, formGridVerticalGutter, FORM_PADDING } from '../../styles/Default';

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
    disableAutocomplete?: boolean;
    primaryColor: string;
    secondaryColor: string;
    formState: FormState<MessageType>;
    locale: Locale;
    register: UseFormRegister<MessageType>;
    setValue: UseFormSetValue<MessageType>;
    remove: UseFieldArrayRemove;
    move: UseFieldArrayMove;
    forceUpdateForm: () => void;
}

const EmbedField: FC<IProps> = memo((props) => (
    <DashedBorder>
        <Grid.Row breakpoints={{ xs: 24 }} style={{ padding: FORM_PADDING.sm }}>
            <Grid gutter={formGridGutter}>
                <Grid.Row breakpoints={{ xs: 6, md: 3 }}>
                    <Switch
                        label={props.locale.forms.layouts.message.field.messageEmbedFieldInline.label}
                        color={{ bgActive: props.primaryColor }}
                        onChange={e => { props.setValue(`messageEmbed.fields.${props.index}.inline`, e.target.checked, { shouldValidate: true }) }}
                    />
                </Grid.Row>
                <Grid.Row breakpoints={{ xs: 18, md: 21 }}>
                    <Input
                        label={props.locale.forms.layouts.message.field.messageEmbedFieldName.label}
                        placeholder={findStringVarsAndSubstitute(props.locale.forms.layouts.message.field.messageEmbedFieldName.placeholder!, {
                            default: false, '{%index%}': `${props.index}`
                        }).join('')}
                        errorMessage={props.formState.errors.messageEmbed?.fields?.[props.index]?.name?.message}
                        {...props.register(`messageEmbed.fields.${props.index}.name`, {
                            required: {
                                value: true,
                                message: props.locale.forms.layouts.message.field.messageEmbedFieldName.validation.required!
                            },
                            maxLength: {
                                value: 100,
                                message: findStringVarsAndSubstitute(props.locale.forms.layouts.message.field.messageEmbedFieldName.validation.maxLength!, {
                                    default: false, '{%value%}': '100'
                                }).join(''),
                            }
                        })}
                    />
                </Grid.Row>
                <Grid.Row breakpoints={{ xs: 24 }}>
                    <AutocompleteTextarea
                        label={props.locale.forms.layouts.message.field.messageEmbedFieldValue.label}
                        placeholder={findStringVarsAndSubstitute(props.locale.forms.layouts.message.field.messageEmbedFieldValue.placeholder!, {
                            default: false, '{%index%}': `${props.index}`
                        }).join('')}
                        triggers={autocompleteTriggers}
                        errormessage={props.formState.errors.messageEmbed?.fields?.[props.index]?.value?.message}
                        {...props.register(`messageEmbed.fields.${props.index}.value`, {
                            required: {
                                value: true,
                                message: props.locale.forms.layouts.message.field.messageEmbedFieldValue.validation.required!
                            },
                            maxLength: {
                                value: 250,
                                message: findStringVarsAndSubstitute(props.locale.forms.layouts.message.field.messageEmbedFieldValue.validation.maxLength!, {
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
                                    label={props.locale.labels.remove}
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
    </DashedBorder>
));

EmbedField.displayName = 'EmbedField';

type EmbedFieldsProps = {
    disableAutocomplete?: boolean;
}

const EmbedFields: FC<EmbedFieldsProps> = ({ disableAutocomplete }) => {
    const { locale } = useApp();
    const { colors } = useContext(ThemeContext);
    const { control, watch, register, setValue, formState } = useFormContext<MessageType>();
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
        <Grid gutter={formGridVerticalGutter}>
            <input ref={forceFormUpdateRef} style={{ display: 'none' }} />
            {controlledFields.map((field, index) => (
                <EmbedField
                    key={field.id}
                    index={index}
                    formState={formState}
                    primaryColor={colors.primary}
                    secondaryColor={colors.secondary}
                    locale={locale}
                    disableAutocomplete={disableAutocomplete}
                    register={register}
                    setValue={setValue}
                    move={move}
                    remove={remove}
                    forceUpdateForm={() => forceUpdateReactState(forceFormUpdateRef.current!)}
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
                    >{locale.labels.newField}</Button>
                </div>
            </Grid.Row>
        </Grid>
    );
}

export default EmbedFields;
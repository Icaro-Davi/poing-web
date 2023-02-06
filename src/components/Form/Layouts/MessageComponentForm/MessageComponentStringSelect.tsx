import { FC, Fragment, memo, useCallback, useMemo } from "react";

import { DeepRequired, FieldError, FieldErrorsImpl, Merge, useFieldArray, useFormContext } from "react-hook-form";
import { IoAddSharp, IoTrashSharp } from 'react-icons/io5';
import { useTheme } from "styled-components";
import { useApp } from "../../../../context/App";
import { ComponentStringSelect, MessageWithComponentsType, MessageSelectOption } from "../../../../services/discord/modules/modules.types";
import { Button, DangerButton, IconButton } from "../../../Buttons";
import Grid from "../../../Grid";
import Input from "../../items/Input";
import Select from "../../items/Select";
import Switch from "../../items/Switch";
import { DashedBorderDivider } from "../styles/DashedBorder";
import { formGridGutter, FORM_PADDING } from "../styles/Default";

const MessageComponentStringSelect: FC<{
    index: number;
    roles: { label: string; value: string }[];
    removeSelectString: () => void;
}> = props => {
    const { control, formState, setValue, register, watch } = useFormContext<MessageWithComponentsType>();
    const { fields, remove, append } = useFieldArray({ name: `components.${props.index}.components.0.options`, control, rules: { minLength: 1, maxLength: 25 } });
    const errors = formState.errors.components?.[props.index]?.components?.[0] as Merge<FieldError, FieldErrorsImpl<DeepRequired<ComponentStringSelect>>>;
    const { locale } = useApp();
    const { colors } = useTheme();
    const localeMessageComponent = locale.forms.layouts.messageComponents

    const crateNewOption = useCallback(() => append({ label: '', value: '' }), [append]);
    const allComponents = watch(`components.${props.index}.components`) as ComponentStringSelect[];

    const updateSelectedRoles = JSON.stringify(allComponents?.[0]?.options?.map((option, index) => ({ a: option.value, b: index })) ?? "");
    const selectedRoles = useMemo(() =>
        allComponents.reduce((prev, current) => {
            if (current.type !== 'STRING_SELECT') return prev;
            (current as ComponentStringSelect).options.forEach((option, index) => {
                prev.push({ optionIndex: index, roleId: option.value });
            });
            return prev;
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [] as { optionIndex: number; roleId: string; }[]), [updateSelectedRoles]);

    const getRoles = (index: number) => {
        return props.roles.filter((role => {
            const selectedRole = selectedRoles.find(selectedRole => selectedRole.roleId === role.value);
            if (!selectedRole) return true;
            if (selectedRole.optionIndex === index) return true;
            return false;
        }));
    }

    return (
        <Grid style={{ padding: FORM_PADDING.sm }}>
            <Grid.Row breakpoints={{ xs: 24 }} horizontalAlign='center'>
                <div style={{ width: '100%', maxWidth: 250 }}>
                    <DangerButton
                        label={locale.forms.layouts.messageComponents.labels.removeOptions}
                        icon={<IoTrashSharp />}
                        onClick={props.removeSelectString}
                    />
                </div>
                <div style={{ width: '100%', margin: FORM_PADDING.sm }}>
                    <DashedBorderDivider style={{ marginLeft: FORM_PADDING.sm, marginRight: FORM_PADDING.sm }} />
                </div>
            </Grid.Row>
            <Grid.Row breakpoints={{ xs: 24 }}>
                <Grid gutter={formGridGutter}>
                    <Grid.Row breakpoints={{ xs: 12, md: 6 }}>
                        <Input
                            {...register(`components.${props.index}.components.0.max_values`, {
                                pattern: {
                                    value: /^\d+$/,
                                    message: localeMessageComponent.field.fieldsStringSelect.maxValues.rules.pattern
                                },
                                min: {
                                    value: 1,
                                    message: localeMessageComponent.field.fieldsStringSelect.maxValues.rules.min.replace('{%value%}', '1')
                                },
                                max: {
                                    value: 25,
                                    message: localeMessageComponent.field.fieldsStringSelect.maxValues.rules.max.replace('{%value%}', '25')
                                },
                                required: {
                                    value: true,
                                    message: localeMessageComponent.field.fieldsStringSelect.maxValues.rules.required
                                }
                            })}
                            label={localeMessageComponent.field.fieldsStringSelect.maxValues.label}
                            title={localeMessageComponent.field.fieldsStringSelect.maxValues.placeholder}
                            placeholder={localeMessageComponent.field.fieldsStringSelect.maxValues.placeholder}
                            errorMessage={errors?.max_values?.message}
                        />
                    </Grid.Row>
                    <Grid.Row breakpoints={{ xs: 12, md: 18 }}>
                        <Input
                            {...register(`components.${props.index}.components.0.placeholder`, {
                                maxLength: {
                                    value: 150,
                                    message: localeMessageComponent.field.fieldsStringSelect.placeholder.rules.maxLength.replace('{%value%}', '150')
                                }
                            })}
                            label={localeMessageComponent.field.fieldsStringSelect.placeholder.label}
                            title={localeMessageComponent.field.fieldsStringSelect.placeholder.placeholder}
                            placeholder={localeMessageComponent.field.fieldsStringSelect.placeholder.placeholder}
                            errorMessage={errors?.placeholder?.message}
                        />
                    </Grid.Row>
                    {fields.map((field, optionIndex) => (
                        <Fragment key={field.id}>
                            <Grid.Row breakpoints={{ xs: 24 }}>
                                <DashedBorderDivider />
                            </Grid.Row>
                            <Grid.Row breakpoints={{ xs: 24, md: 6 }}>
                                <Select
                                    label={localeMessageComponent.field.shared.roleId.label}
                                    options={getRoles(optionIndex)}
                                    initialValue={getRoles(optionIndex).find(role => role.value === (field as MessageSelectOption).value) ?? getRoles(optionIndex)[0]}
                                    onSelect={selected => setValue(`components.${props.index}.components.0.options.${optionIndex}.value`, selected.value as never)}
                                />
                            </Grid.Row>
                            <Grid.Row breakpoints={{ xs: 24, md: 18 }}>
                                <Input
                                    {...register(`components.${props.index}.components.0.options.${optionIndex}.label`, {
                                        required: {
                                            value: true,
                                            message: localeMessageComponent.field.fieldsStringSelect.optionLabel.rules.required
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: localeMessageComponent.field.fieldsStringSelect.optionLabel.rules.required.replace('{%value%}', '100')
                                        }
                                    })}
                                    label={localeMessageComponent.field.fieldsStringSelect.optionLabel.label}
                                    title={localeMessageComponent.field.fieldsStringSelect.optionLabel.placeholder}
                                    placeholder={localeMessageComponent.field.fieldsStringSelect.optionLabel.placeholder}
                                    errorMessage={errors?.options?.[optionIndex]?.label?.message}
                                />
                            </Grid.Row>
                            <Grid.Row breakpoints={{ xs: 24 }}>
                                <Input
                                    {...register(`components.${props.index}.components.0.options.${optionIndex}.description`, {
                                        maxLength: {
                                            value: 100,
                                            message: localeMessageComponent.field.fieldsStringSelect.optionDescription.rules.maxLength.replace('{%value%}', '100')
                                        }
                                    })}
                                    label={localeMessageComponent.field.fieldsStringSelect.optionDescription.label}
                                    title={localeMessageComponent.field.fieldsStringSelect.optionDescription.placeholder}
                                    placeholder={localeMessageComponent.field.fieldsStringSelect.optionDescription.placeholder}
                                    errorMessage={errors?.options?.[optionIndex]?.description?.message}
                                />
                            </Grid.Row>
                            <Grid.Row breakpoints={{ xs: 24, md: 8 }}>
                                <Input
                                    {...register(`components.${props.index}.components.0.options.${optionIndex}.emoji.id`, {
                                        maxLength: {
                                            value: 50,
                                            message: localeMessageComponent.field.shared.emojiId.rules.maxLength.replace('{%value%}', '50')
                                        },
                                        pattern: {
                                            value: /^\d+$/,
                                            message: localeMessageComponent.field.shared.emojiId.rules.onlyNumbers
                                        }
                                    })}
                                    label={localeMessageComponent.field.shared.emojiId.label}
                                    title={localeMessageComponent.field.shared.emojiId.placeholder}
                                    placeholder={localeMessageComponent.field.shared.emojiId.placeholder}
                                    errorMessage={errors?.options?.[optionIndex]?.emoji?.id?.message}
                                />
                            </Grid.Row>
                            <Grid.Row breakpoints={{ xs: 24, md: 8 }}>
                                <Input
                                    {...register(`components.${props.index}.components.0.options.${optionIndex}.emoji.name`, {
                                        maxLength: {
                                            value: 50,
                                            message: localeMessageComponent.field.shared.emojiName.rules.maxLength.replace('{%value%}', '50')
                                        },
                                    })}
                                    label={localeMessageComponent.field.shared.emojiName.label}
                                    title={localeMessageComponent.field.shared.emojiName.placeholder}
                                    placeholder={localeMessageComponent.field.shared.emojiName.placeholder}
                                    errorMessage={errors?.options?.[optionIndex]?.emoji?.name?.message}
                                />
                            </Grid.Row>
                            <Grid.Row breakpoints={{ xs: 24, md: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Switch
                                        label={localeMessageComponent.field.shared.emojiAnimated.label}
                                        color={{ bgActive: colors.primary }}
                                        defaultChecked={field.emoji?.animated}
                                        onChange={value => setValue(`components.${props.index}.components.0.options.${optionIndex}.emoji.animated`, value.currentTarget.checked as never)}
                                    />
                                    {optionIndex !== 0 && (
                                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <IconButton hoverColor={colors.error} onClick={() => remove(optionIndex)}>
                                                <IoTrashSharp />
                                            </IconButton>
                                        </div>
                                    )}
                                </div>
                            </Grid.Row>
                        </Fragment>
                    ))}
                    <Grid.Row breakpoints={{ xs: 24 }}>
                        <DashedBorderDivider />
                    </Grid.Row>
                    <Grid.Row breakpoints={{ xs: 24 }} horizontalAlign='center'>
                        <div style={{ width: 200 }}>
                            <Button blurColor={colors.success} icon={<IoAddSharp />} onClick={crateNewOption} disabled={fields.length > 25}>
                                {localeMessageComponent.labels.newOption}
                            </Button>
                        </div>
                    </Grid.Row>
                </Grid>
            </Grid.Row>
        </Grid>
    )
}

export default memo(MessageComponentStringSelect);
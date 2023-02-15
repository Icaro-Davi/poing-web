import { FC, Fragment, memo } from 'react';
import { DeepRequired, FieldError, FieldErrorsImpl, Merge, useFieldArray, useFormContext } from 'react-hook-form';
import { IoAddSharp, IoArrowDownSharp, IoArrowUp, IoTrashSharp } from 'react-icons/io5';
import { useTheme } from 'styled-components';
import { useApp } from '../../../../context/App';
import { ComponentButton, MessageWithComponentsType } from '../../../../services/discord/modules/modules.types';
import { Button, IconButton } from '../../../Buttons';
import Grid from '../../../Grid';
import { SPACING } from '../../items/DefaultPropertyValues';
import Input from '../../items/Input';
import Select from '../../items/Select';
import Switch from '../../items/Switch';
import { DashedBorderDivider } from '../styles/DashedBorder';
import { formGridGutter, FORM_PADDING } from '../styles/Default';

const MessageComponentButton: FC<{
    index: number;
    roles: { label: string; value: string }[];
    removeButtons: () => void;
}> = props => {
    const { control, formState, setValue, register } = useFormContext<MessageWithComponentsType>();
    const { fields, move, remove, append } = useFieldArray({ name: `components.${props.index}.components`, control, rules: { minLength: 1, maxLength: 5 } });
    const { colors } = useTheme();
    const { locale } = useApp();
    const localeMessageComponent = locale.forms.layouts.messageComponents.field;
    const errors = formState.errors.components?.[props.index]?.components as Merge<FieldError, FieldErrorsImpl<DeepRequired<ComponentButton[]>>>
    const roles = props.roles;

    const StyleOptions = Object.keys(localeMessageComponent.fieldsButton.style.options)
        .map(key => ({
            value: key,
            label: localeMessageComponent.fieldsButton.style.options[key as keyof typeof localeMessageComponent.fieldsButton.style.options],
        }));

    const addNewComponent = () => append({ type: 'BUTTON', style: 'PRIMARY', roleId: roles[0].value } as ComponentButton);

    return (
        <Fragment>
            <div style={{ width: 250, paddingTop: FORM_PADDING.sm, margin: 'auto' }}>
                <Button blurColor={colors.error} icon={<IoTrashSharp />} onClick={props.removeButtons}>
                    {locale.forms.layouts.messageComponents.labels.removeButtons}
                </Button>
            </div>
            <DashedBorderDivider style={{ marginTop: FORM_PADDING.sm, marginLeft: FORM_PADDING.md, marginRight: FORM_PADDING.md }} />
            {
                fields.map((field, buttonIndex) => (
                    <Grid key={field.id} gutter={formGridGutter} style={{ padding: FORM_PADDING.sm }}>
                        <Grid.Row breakpoints={{ xs: 24, md: 8, }}>
                            <Select
                                label={localeMessageComponent.shared.roleId.label}
                                initialValue={roles.find(role => role.value === (field as ComponentButton).roleId) ?? roles?.[0]}
                                options={roles}
                                onSelect={selected => setValue(`components.${props.index}.components.${buttonIndex}.roleId`, selected.value)}
                            />
                        </Grid.Row>
                        <Grid.Row breakpoints={{ xs: 24, md: 8 }}>
                            <Select
                                label={localeMessageComponent.fieldsButton.style.label}
                                initialValue={StyleOptions.find(option => option.value === (field as ComponentButton).style) ?? StyleOptions[0]}
                                onSelect={selected => setValue(`components.${props.index}.components.${buttonIndex}.style`, selected.value)}
                                options={StyleOptions}
                            />
                        </Grid.Row>
                        <Grid.Row breakpoints={{ xs: 24, md: 8 }}>
                            <Input
                                {...register(`components.${props.index}.components.${buttonIndex}.label`, {
                                    maxLength: {
                                        value: 80,
                                        message: localeMessageComponent.fieldsButton.label.validation.maxLength?.replace('{%value%}', '80')!
                                    },
                                    required: {
                                        value: true,
                                        message: localeMessageComponent.fieldsButton.label.validation.required!
                                    }
                                })}
                                label={localeMessageComponent.fieldsButton.label.label}
                                title={localeMessageComponent.fieldsButton.label.placeholder}
                                placeholder={localeMessageComponent.fieldsButton.label.placeholder}
                                errorMessage={errors?.[buttonIndex]?.label?.message}
                            />
                        </Grid.Row>
                        <Grid.Row breakpoints={{ xs: 24, md: 8 }}>
                            <Input
                                {...register(`components.${props.index}.components.${buttonIndex}.emoji.id`, {
                                    maxLength: {
                                        value: 50,
                                        message: locale.forms.layouts.messageComponents.field.shared.emojiId.validation.maxLength?.replace('{%value%}', '50')!
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: locale.forms.layouts.messageComponents.field.shared.emojiId.validation.onlyNumbers!
                                    }
                                })}
                                label={locale.forms.layouts.messageComponents.field.shared.emojiId.label}
                                title={locale.forms.layouts.messageComponents.field.shared.emojiId.placeholder}
                                placeholder={locale.forms.layouts.messageComponents.field.shared.emojiId.placeholder}
                                errorMessage={errors?.[buttonIndex]?.emoji?.id?.message}
                            />
                        </Grid.Row>
                        <Grid.Row breakpoints={{ xs: 24, md: 8 }}>
                            <Input
                                {...register(`components.${props.index}.components.${buttonIndex}.emoji.name`, {
                                    maxLength: {
                                        value: 50,
                                        message: locale.forms.layouts.messageComponents.field.shared.emojiName.validation.maxLength?.replace('{%value%}', '50')!
                                    },
                                })}
                                label={locale.forms.layouts.messageComponents.field.shared.emojiName.label}
                                title={locale.forms.layouts.messageComponents.field.shared.emojiName.placeholder}
                                placeholder={locale.forms.layouts.messageComponents.field.shared.emojiName.placeholder}
                                errorMessage={errors?.[buttonIndex]?.emoji?.name?.message}
                            />
                        </Grid.Row>
                        <Grid.Row breakpoints={{ xs: 24, md: 8 }}>
                            <Switch
                                defaultChecked={(field as ComponentButton).emoji?.animated}
                                label={locale.forms.layouts.messageComponents.field.shared.emojiAnimated.label}
                                color={{ bgActive: colors.primary }}
                                onChange={value => setValue(`components.${props.index}.components.${buttonIndex}.emoji.animated`, value.currentTarget.checked)}
                            />
                        </Grid.Row>
                        <Grid.Row breakpoints={{ xs: 24 }}>
                            <Grid>
                                <Grid.Row breakpoints={{ xs: 8 }} style={{ display: 'flex', flexFlow: 'row', columnGap: SPACING.sm, alignItems: 'center' }}>
                                    <IconButton
                                        disabled={!fields[buttonIndex - 1]}
                                        hoverColor={colors.primary}
                                        onClick={() => move(buttonIndex, buttonIndex - 1)}
                                    ><IoArrowUp /></IconButton>
                                    <IconButton
                                        disabled={!fields[buttonIndex + 1]}
                                        hoverColor={colors.secondary}
                                        onClick={() => move(buttonIndex, buttonIndex + 1)}
                                    ><IoArrowDownSharp /></IconButton>
                                </Grid.Row>
                                {buttonIndex !== 0 && (
                                    <Grid.Row breakpoints={{ xs: 16 }} horizontalAlign='right'>
                                        <IconButton hoverColor={colors.error} onClick={() => remove(buttonIndex)}>
                                            <IoTrashSharp />
                                        </IconButton>
                                    </Grid.Row>
                                )}
                            </Grid>
                            <DashedBorderDivider style={{ marginTop: SPACING.sm }} />
                        </Grid.Row>
                    </Grid>
                ))
            }
            <div style={{ width: 250, paddingTop: 0, paddingBottom: FORM_PADDING.sm, margin: 'auto' }}>
                <Button blurColor={colors.success} icon={<IoAddSharp />} onClick={addNewComponent} disabled={fields.length > 4} >
                    {locale.forms.layouts.messageComponents.labels.createButton}
                </Button>
            </div>
        </Fragment>
    )
}

export default memo(MessageComponentButton);
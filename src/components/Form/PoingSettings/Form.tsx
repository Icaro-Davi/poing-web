import "react-color-palette/lib/css/styles.css"
import { ColorPicker, useColor } from 'react-color-palette';
import { useRef } from "react";
import Grid from "../../Grid";
import FloatInput from "../items/Float/Input";
import FloatSelect from "../items/Float/Select";
import { ColorPalletWrapper } from "./styled";
import findStringVarsAndSubstitute from "../../../utils/findStringVarsAndSubstitute";
import { useFormContext } from "react-hook-form";

import type { Color } from 'react-color-palette';
import type { CSSProperties, FC } from "react";
import type { GuildSettingsType } from "../../../services/discord/bot/bot.types";
import type { GetReference } from "../../../utils/general.types";
import type { Locale } from "../../../locale/index.type";

const style: CSSProperties = { width: '100%' };
const breakpoints = { xs: 24, md: 12, lg: 8 };

type BotFields = GetReference<GuildSettingsType, 'bot'>;
interface IForm {
    locale: Locale;
    channels: { label: string; key: string; }[];
}

const FormElements: FC<IForm> = ({ locale: { forms: { poingSettings: { field } } }, ...props }) => {
    const { watch, setValue, register, formState } = useFormContext<BotFields>();
    const borderColor = watch('messageEmbedHexColor');
    const [color, setColor] = useColor('hex', borderColor);
    const debounce = useRef<NodeJS.Timeout>();

    const onColorPickerChange = (color: Color) => {
        setColor(color);
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => { setValue('messageEmbedHexColor', color.hex, { shouldValidate: true }) }, 200);
    }

    return (
        <Grid style={{ rowGap: '1rem' }}>
            <Grid.Row breakpoints={breakpoints}>
                <FloatInput
                    label={field.prefix.label}
                    errorMessage={formState.errors.prefix?.message ?? ''}
                    style={style}
                    innerElement={{ style: { borderColor } }}
                    {...register('prefix', {
                        required: field.prefix.validation.required,
                        maxLength: {
                            value: 5,
                            message: findStringVarsAndSubstitute(field.prefix.validation.maxLength!, { '{%value%}': '5', default: false }).join('')
                        },
                        pattern: { value: /^[!@#$%&*\-_=+.:?/]{1,5}$/, message: field.prefix.validation.patternPrefix }
                    })}
                />
            </Grid.Row>
            <Grid.Row breakpoints={breakpoints}>
                <ColorPalletWrapper>
                    <FloatInput
                        label={field.messageEmbedHexColor.label}
                        errorMessage={formState.errors.messageEmbedHexColor?.message ?? ''}
                        style={style}
                        innerElement={{ style: { borderColor } }}
                        {...register('messageEmbedHexColor', {
                            required: field.messageEmbedHexColor.validation.required,
                            pattern: { value: /^#[0-9A-F]{6}$/i, message: field.messageEmbedHexColor.validation.patternHexColor },
                        })}
                    />
                    <ColorPicker
                        dark
                        hideHSV hideRGB hideHEX
                        width={250}
                        height={200}
                        onChange={onColorPickerChange}
                        color={color}
                    />
                </ColorPalletWrapper>
            </Grid.Row>
            <Grid.Row breakpoints={breakpoints}>
                <FloatSelect
                    style={style}
                    label={field.channelLogsId.label}
                    options={[{ label: field.channelLogsId.optionLogsDisabled, key: '' }, ...props.channels]}
                    defaultValue={''}
                    innerElement={{ style: { borderColor } }}
                    errorMessage={formState.errors.channel?.logsId?.message}
                    {...register('channel.logsId')}
                />
            </Grid.Row>
            <Grid.Row breakpoints={breakpoints}>
                <FloatSelect
                    label={field.locale.label}
                    errorMessage={formState.errors.locale?.message}
                    options={[
                        { label: 'Português', key: 'pt-BR' },
                        { label: 'Ingles', key: 'en-US' }
                    ]}
                    style={style}
                    innerElement={{ style: { borderColor } }}
                    {...register('locale', {
                        required: field.locale.validation.required,
                    })}
                />
            </Grid.Row>
        </Grid>
    );
}


export default FormElements;
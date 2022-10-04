import "react-color-palette/lib/css/styles.css"
import { ColorPicker, useColor } from 'react-color-palette';
import { useRef } from "react";
import Grid from "../../Grid";
import FloatInput from "../items/Float/Input";
import FloatSelect from "../items/Float/Select";
import { ColorPalletWrapper } from "./styled";

import type { Color } from 'react-color-palette';
import type { CSSProperties, FC } from "react";
import type { FormState, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { GuildSettingsType } from "../../../services/discord/bot/bot.types";
import type { GetReference } from "../../../utils/general.types";
import type { Locale } from "../../../locale/index.type";
import findStringVarsAndSubstitute from "../../../utils/findStringVarsAndSubstitute";

type BotFields = GetReference<GuildSettingsType, 'bot'>;

const style: CSSProperties = { width: '100%' };
const breakpoints = { xs: 24, md: 12, lg: 8 };

interface IProps {
    formState: FormState<BotFields>;
    register: UseFormRegister<BotFields>;
    watch: UseFormWatch<BotFields>;
    setValue: UseFormSetValue<BotFields>;
    locale: Locale;
}

const FormElements: FC<IProps> = ({ watch, locale: { forms: { poingSettings: { field } } }, ...props }) => {
    const [color, setColor] = useColor('hex', watch('messageEmbedHexColor'));
    const debounce = useRef<NodeJS.Timeout>();

    const onColorPickerChange = (color: Color) => {
        setColor(color);
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => { props.setValue('messageEmbedHexColor', color.hex); }, 200);
    }
    return (
        <Grid style={{ rowGap: '1rem' }}>
            <Grid.Row breakpoints={breakpoints}>
                <FloatInput
                    label={field.prefix.label}
                    errorMessage={props.formState.errors.prefix?.message}
                    style={style}
                    innerElement={{ style: { borderColor: watch('messageEmbedHexColor') } }}
                    {...props.register('prefix', {
                        required: field.prefix.validation.required,
                        maxLength: {
                            value: 5,
                            message: findStringVarsAndSubstitute(field.prefix.validation.maxLength, { '{%value%}': '5', default: false }).join('')
                        },
                        pattern: { value: /^[!@#$%&*\-_=+.:?/]{1,5}$/, message: field.prefix.validation.patternPrefix }
                    })}
                />
            </Grid.Row>
            <Grid.Row breakpoints={breakpoints}>
                <ColorPalletWrapper>
                    <FloatInput
                        label={field.messageEmbedHexColor.label}
                        errorMessage={props.formState.errors.messageEmbedHexColor?.message}
                        style={style}
                        innerElement={{ style: { borderColor: watch('messageEmbedHexColor') } }}
                        {...props.register('messageEmbedHexColor', {
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
                    label={field.locale.label}
                    errorMessage={props.formState.errors.locale?.message}
                    options={[
                        { label: 'Português', key: 'pt-BR' },
                        { label: 'Ingles', key: 'en-US' }
                    ]}
                    style={style}
                    innerElement={{ style: { borderColor: watch('messageEmbedHexColor') } }}
                    {...props.register('locale', {
                        required: field.locale.validation.required,
                    })}
                />
            </Grid.Row>
        </Grid>
    );
}


export default FormElements;
import "react-color-palette/lib/css/styles.css"
import { ColorPicker, Color, toColor, useColor } from 'react-color-palette';
import { CSSProperties, FC, useRef } from "react";
import type { FormState, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import type { GuildSettingsType } from "../../../services/discord/bot/bot.types";
import type { GetReference } from "../../../utils/general.types";
import Grid from "../../Grid";
import FloatInput from "../items/Float/Input";
import FloatSelect from "../items/Float/Select";
import { ColorPalletWrapper } from "./styled";

type BotFields = Omit<GetReference<GuildSettingsType, 'bot'>, 'roles'>;

const style: CSSProperties = { width: '100%' };
const breakpoints = { xs: 24, md: 12, lg: 8 };

interface IProps {
    formState: FormState<BotFields>;
    register: UseFormRegister<BotFields>;
    watch: UseFormWatch<BotFields>;
    setValue: UseFormSetValue<BotFields>;
}

const FormElements: FC<IProps> = ({ watch, ...props }) => {
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
                    label="Commando prefixo"
                    errorMessage={props.formState.errors.prefix?.message}
                    style={style}
                    innerElement={{ style: { borderColor: watch('messageEmbedHexColor') } }}
                    {...props.register('prefix', {
                        required: "Need be filled with bot prefix.",
                        maxLength: {
                            value: 4,
                            message: "Only can use 4 characters."
                        },
                    })}
                />
            </Grid.Row>
            <Grid.Row breakpoints={breakpoints}>
                <ColorPalletWrapper>
                    <FloatInput
                        label="Cor das mensagens"
                        errorMessage={props.formState.errors.messageEmbedHexColor?.message}
                        style={style}
                        innerElement={{ style: { borderColor: watch('messageEmbedHexColor') } }}
                        {...props.register('messageEmbedHexColor', {
                            required: "Need be filled with a hexadecimal color.",
                            pattern: { value: /^#[0-9A-F]{6}$/i, message: "Need be a valid hexadecimal color." },

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
                    label="Tradução"
                    errorMessage={props.formState.errors.locale?.message}
                    options={[
                        { label: 'Português', key: 'pt-BR' },
                        { label: 'Ingles', key: 'en-US' }
                    ]}
                    style={style}
                    innerElement={{ style: { borderColor: watch('messageEmbedHexColor') } }}
                    {...props.register('locale', {
                        required: "Choose any locale for bot vawvaw vaw.",
                    })}
                />
            </Grid.Row>
        </Grid>
    );
}


export default FormElements;
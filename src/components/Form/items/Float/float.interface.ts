import { UseFormRegisterReturn } from "react-hook-form";
import { CSSProperties } from "styled-components";

export interface FloatComponentProps extends Omit<UseFormRegisterReturn, 'ref'> {
    label?: string;
    style?: CSSProperties;
    errorMessage?: string;
    innerElement?:{
        style: CSSProperties;
    }
}
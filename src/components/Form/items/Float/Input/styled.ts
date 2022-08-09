import styled from "styled-components";
import { FLOAT_DEFAULT_SPACING } from "../styled";

export const FloatInput = styled.input<{ error: boolean }>`
    width: 100%;
    border: solid 1.5px ${props => props.error ? props.theme.colors.error : props.theme.colors.white};
    border-radius: ${FLOAT_DEFAULT_SPACING};
    background: none;
    padding: ${FLOAT_DEFAULT_SPACING};
    font-size: 1rem;
    color: ${props => props.theme.colors.white};
    transition: border 150ms ${FLOAT_DEFAULT_SPACING};

    :focus, :valid {
        outline: none;
        border: 1.5px solid ${props => props.error ? `${props.theme.colors.error} !important` : props.theme.colors.primary};
    }

    :focus ~ label, :valid ~ label {
        transform: translateY(-50%) translateX(-14px) scale(.8);
        background-color: ${props => props.theme.colors.black};
        padding: .2rem;
        color: ${props => props.error ? props.theme.colors.error : props.theme.colors.white};
    }
`;


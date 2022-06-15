import styled, { css } from "styled-components";
import { StrokeText } from "../../Typography/styled";

const StyledInputFocus = css`
    top: -10px;
    color: ${props => props.theme.colors.secondary};
    font-size: 14px;
    ${props => StrokeText({ textColor: props.theme.colors.white, shadowX: 0, shadowY: 0, strokeSize: 1, strokeColor: props.theme.colors.secondary  })}
`;

export const StyledInputContainer = styled.div`
    width: 100%;
    position: relative;
`;

export const StyledInputLabel = styled.label`
    position: absolute;
    left: 10px;
    top: 14px;
    transition: all 0.2s;
    padding: 0 2px;
    z-index: 1;
    color: ${props => props.theme.colors.gray};

    ::before {
        content: "";
        height: 5px;
        background: ${props => props.theme.colors.white};
        position: absolute;
        left: 0px;
        top: 10px;
        width: 100%;
        z-index: -1;
    }

    &.filled{
        ${StyledInputFocus}
    }
`;

export const StyledInput = styled.input`
    padding: 0.8rem;
    width: 100%;
    height: 100%;
    border: 2px solid ${props => props.theme.colors.backgroundDarker};
    background: ${props => props.theme.colors.white};
    border-radius: 5px;
    font-size: 18px;
    outline: none;
    transition: all 0.3s;
    color: ${props => props.theme.colors.black};

    :focus {
        border: 2px solid ${props => props.theme.colors.secondary};
    }

    :focus + ${StyledInputLabel} {
       ${StyledInputFocus}
    }

    ::placeholder {
        font-size: 16px;
        opacity: 0;
        transition: all 0.3s;
    }

    :focus::placeholder {
        opacity: 1;
    }
`;

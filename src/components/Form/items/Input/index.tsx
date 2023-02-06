import { HTMLAttributes, ForwardRefRenderFunction, forwardRef, useMemo } from "react";
import styled from "styled-components";
import { BORDER, INPUT_FORM, SPACING } from "../DefaultPropertyValues";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label";

const InputNormal = styled.div`
    width: 100%;

    input {
        width: 100%;
        height: ${INPUT_FORM.height};
        border-radius: ${BORDER.radius};
        outline: none;
        padding-left: ${SPACING.lg};
        padding-right: ${SPACING.lg};
        font-size: ${INPUT_FORM.font_size};
        font-weight: ${INPUT_FORM.weight};
        font-family: ${INPUT_FORM.font_family};
        border: 0;
    }
`;

interface IProps extends HTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
    placeholder?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, IProps> = ({ label, errorMessage, ...props }, ref) => {
    const id = useMemo(() => Math.random().toString(32).slice(2), []);
    return (
        <InputNormal>
            {label && (
                <Label htmlFor={props.id ?? id}>{label}</Label>
            )}
            <input
                ref={ref}
                id={props.id ?? id}
                autoComplete='off'
                {...props}
            />
            {errorMessage && (
                <ErrorMessage>
                    {errorMessage}
                </ErrorMessage>
            )}
        </InputNormal>
    );
}

export default forwardRef(Input);
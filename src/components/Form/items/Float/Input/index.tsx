import { forwardRef, useRef } from "react";
import ErrorMessage from "../../ErrorMessage";

import type { FloatComponentProps } from "../float.interface";
import { FloatGroup, FloatLabel, FLOAT_DEFAULT_SPACING } from "../styled";
import * as Component from "./styled";

const FloatInput = forwardRef<HTMLInputElement, FloatComponentProps>(({ label, style, ...props }, ref) => {
    const inputId = useRef((label || Math.random().toString(16).slice(2, 8)).replace(' ', '_'));
    return (
        <FloatGroup {...{ style }}>
            <Component.FloatInput
                {...props}
                {...props.innerElement}
                required
                error={!!(props.errorMessage)}
                ref={ref}
                form="noValidateForm"
                autoComplete="off"
                id={inputId.current}
            />
            {label && <FloatLabel error={!!(props.errorMessage)} htmlFor={inputId.current}>{label}</FloatLabel>}
            {props.errorMessage && <ErrorMessage style={{ paddingLeft: FLOAT_DEFAULT_SPACING }}>{props.errorMessage}</ErrorMessage>}
        </FloatGroup>
    );
});

FloatInput.displayName = 'FloatInput';

export default FloatInput;
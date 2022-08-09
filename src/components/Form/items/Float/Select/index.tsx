import { forwardRef, useRef } from "react";
import { IoChevronDownOutline } from 'react-icons/io5';

import { FloatComponentProps } from "../float.interface";
import * as Float from './styled';
import { FloatError, FloatGroup, FloatLabel } from "../styled"

interface IProps extends FloatComponentProps {
    options: { label: string; key?: string }[];
}

const FloatSelect = forwardRef<HTMLSelectElement, IProps>(
    ({ label, style, ...props }, ref) => {
        const selectId = useRef((label || Math.random().toString(16).slice(2, 8)).replace(' ', '_'));
        return (
            <FloatGroup {...{ style: { height: '100%', ...style, } }}>
                <IoChevronDownOutline size={18} />
                <Float.FloatSelect
                    {...props}
                    {...props.innerElement}
                    id={selectId.current}
                    error={!!props.errorMessage}
                    ref={ref}
                >
                    {props.options.map(option => (
                        <option key={option.key} value={option.key} >{option.label}</option>
                    ))}
                </Float.FloatSelect>
                {label && <FloatLabel error={!!props.errorMessage}>{label}</FloatLabel>}
                {props.errorMessage && <FloatError>{props.errorMessage}</FloatError>}
            </FloatGroup>
        );
    }
);

export default FloatSelect;
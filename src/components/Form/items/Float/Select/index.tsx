import { forwardRef, useRef } from "react";
import { IoChevronDownOutline } from 'react-icons/io5';

import { FloatComponentProps } from "../float.interface";
import * as Float from './styled';
import { FloatGroup, FloatLabel } from "../styled"
import ErrorMessage from "../../ErrorMessage";

type SelectItem = { label: string; key?: string };
interface IProps extends FloatComponentProps {
    options: SelectItem[];
    defaultValue?: string;
}

const FloatSelect = forwardRef<HTMLSelectElement, IProps>(
    ({ label, style, ...props }, ref) => {
        const selectId = useRef((label || Math.random().toString(16).slice(2, 8)).replace(' ', '_'));
        const { defaultValue, ...rest } = props;
        return (
            <FloatGroup {...{ style: { height: '100%', ...style, } }}>
                <IoChevronDownOutline size={18} />
                <Float.FloatSelect
                    {...rest}
                    {...rest.innerElement}
                    value={defaultValue}
                    id={selectId.current}
                    error={!!props.errorMessage}
                    ref={ref}
                >
                    {props.options.map(option => (
                        <option key={option.key} value={option.key}>{option.label}</option>
                    ))}
                </Float.FloatSelect>
                {label && <FloatLabel error={!!props.errorMessage} >{label}</FloatLabel>}
                {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
            </FloatGroup>
        );
    }
);

FloatSelect.displayName = 'FloatSelect';

export default FloatSelect;
import { FC, memo, RefObject, ChangeEvent, Fragment, ReactNode } from "react"
import { CSSProperties } from "styled-components";
import Label from "../Label";
import SwitchContainer from "./styled";
export { SWITCH_ANIMATION_DELAY } from './styled';

interface ISwitchProps {
    size?: number;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    ref?: RefObject<HTMLInputElement>;
    id?: string;
    color?: {
        bgActive?: string;
        bgInactive?: string;
    }
    defaultChecked?: boolean;
    disabled?: boolean;
    label?: string;
    icon?: ReactNode;
    containerStyle?: CSSProperties;
}

const Switch: FC<ISwitchProps> = props => {
    const id = props.id ?? Math.random().toString(32).slice(2);
    return (
        <div style={{...props.containerStyle }}>
            {props.label && (<Label htmlFor={id}>{props.icon} {props.label}</Label>)}
            <SwitchContainer {...{
                size: props.size,
                ...props?.color,
                active: !!props.defaultChecked,
            }}>
                <input
                    id={id}
                    ref={props.ref}
                    type='checkbox'
                    defaultChecked={props.defaultChecked}
                    onChange={props.onChange}
                    disabled={props.disabled}
                />
                <label style={props.disabled ? { cursor: 'not-allowed' } : {}} htmlFor={id} />
            </SwitchContainer>
        </div>
    )
}

export default memo(Switch);
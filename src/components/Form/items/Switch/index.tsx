import { FC, memo, RefObject, ChangeEvent } from "react"
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
}

const Switch: FC<ISwitchProps> = props => {
    const id = props.id ?? Math.random().toString(32).slice(2);
    return (
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
    )
}

export default memo(Switch);
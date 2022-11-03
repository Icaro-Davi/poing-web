import { FC, ReactNode, useContext } from "react";
import { ThemeContext } from "styled-components";
import Button from "../Button";

interface IProps {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
}

const DangerButton: FC<IProps> = props => {
    const { colors } = useContext(ThemeContext);
    return (
        <Button
            blurColor={colors.error}
            focusColor='#eb4949'
            icon={props.icon}
            onClick={props.onClick}
        >
            {props.label}
        </Button>
    );
}

export default DangerButton;
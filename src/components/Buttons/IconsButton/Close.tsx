import { ThemeContext } from "styled-components";
import { FC, useContext } from "react";
import { FiX } from 'react-icons/fi';
import { IconButton } from "../";

export const CloseButton: FC<{ onClick?: () => void; }> = props => {
    const { colors } = useContext(ThemeContext);
    return (
        <IconButton onClick={props.onClick} hoverColor={colors.error}>
            <FiX size={20} />
        </IconButton>
    );
}

export default CloseButton;
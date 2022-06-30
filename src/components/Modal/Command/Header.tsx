import { FiTerminal, FiX } from "react-icons/fi";
import { IconButton } from "../../Buttons";
import { Title } from "../../Typography";
import { StyledModalCommandCardHeader } from "./styled";

interface IHeader {
    commandName: string;
    closeButtonTitle: string;
    onClose: () => void;
}

const Header: React.FC<IHeader> = props => (
    <StyledModalCommandCardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FiTerminal size={30} /> <Title bold font="Roboto" stroke={{ strokeColor: '#000' }} level='4'>{props.commandName}</Title>
        </div>
        <IconButton title={props.closeButtonTitle} hoverColor="#f77474" onClick={props.onClose}>
            <FiX size={20} />
        </IconButton>
    </StyledModalCommandCardHeader>
)

export default Header;
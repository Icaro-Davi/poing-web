import { IoArrowUndoSharp } from 'react-icons/io5';

import { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import { IconButton } from "../../Buttons";
import SideMenu from "../../layout/DashboardGuild/SideMenu";
import { ModalWrapper } from "../styled";

const LayoutDashboardSideMenuModal: ModalComponentWrapper = props => (
    <ModalWrapper onClick={props.modal.close} style={{ flexFlow: 'row', justifyContent: 'start' }}>
        <SideMenu />
        <IconButton hoverColor='#FFFFFF' style={{ margin: '.5em' }}><IoArrowUndoSharp color='#000000' size={20} /></IconButton>
    </ModalWrapper>
);

export default LayoutDashboardSideMenuModal;
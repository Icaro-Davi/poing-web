import { FC } from "react";
import dynamic from 'next/dynamic';
import { useApp } from "../../../context/App";
import { ModalComponent } from "../../../hooks/useModal/modal.types";

const SideMenu = dynamic(async () => import("./SideMenu"));

const Navbar: FC<{ SideMenuModal: ModalComponent }> = ({ SideMenuModal }) => {
    const { layout } = useApp();
    return layout.isDesktopSize ? <SideMenu /> : <SideMenuModal />
}

export default Navbar;
import { FC } from 'react';
import { IoMenuSharp } from 'react-icons/io5';

import { IconButton, ICON_BUTTON_DEFAULT_HEIGHT } from "../../Buttons";
import InviteBotBtn from "../../Buttons/InviteBot";
import EmptyData from "../../EmptyData";
import { ModalConfigType } from '../../../hooks/useModal/modal.types';
import { useApp } from '../../../context/App';
import { ReactNode } from 'react-markdown/lib/ast-to-react';

const MainContent: FC<{ sideMenuModal: ModalConfigType<{}>, children: ReactNode | ReactNode[] }> = ({ sideMenuModal, ...props }) => {
    const { store, layout } = useApp();
    return store.guilds.length && store.guilds.some(guild => guild.hasBot)
        ? (
            <>
                {!layout.isDesktopSize && (
                    <>
                        <IconButton onClick={sideMenuModal.open} hoverColor='#FFFFFF' style={{ marginBottom: '.5em', position: 'absolute' }}>
                            <IoMenuSharp color='#000000' size={20} />
                        </IconButton>
                        <div style={{ width: '100%', height: `calc(${ICON_BUTTON_DEFAULT_HEIGHT} + .5rem)` }} />
                    </>
                )}
                {props.children}
            </>
        )
        : (
            <EmptyData>
                <InviteBotBtn />
            </EmptyData>
        )

}

export default MainContent;
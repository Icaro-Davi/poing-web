import { FC, Fragment } from "react";
import useModal from "../../../../hooks/useModal";
import ModalGuilds from "../../../Modal/Guilds";

const SideMenu: FC = props => {
    const [GuildModal, guildModal] = useModal(ModalGuilds);
    return (
        <Fragment>
            <div style={{ width: 150, height: '100%' }}>
                <button onClick={guildModal.open}>Chose Guild</button>
            </div>
            <GuildModal />
        </Fragment>
    );
}

export default SideMenu;
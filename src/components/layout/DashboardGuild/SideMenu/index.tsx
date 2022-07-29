import { FC } from "react";
import { SiDiscord } from 'react-icons/si';
import { IoExitSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { useApp } from "../../../../context/App";
import useModal from "../../../../hooks/useModal";
import ModalGuilds from "../../../Modal/Guilds";
import { NavigationContainer, NavigationScrollArea, SideMenuContainer } from "./styled";
import GuildChangeBtn from "./GuildChangeBtn";
import { Divider } from "../../../Divider";
import { Button } from "../../../Buttons";
import RenderNavigationButtons from "./RenderNavigationButtons";

const SideMenu: FC = props => {
    const { store } = useApp();
    const router = useRouter();
    const [GuildModal, guildModal] = useModal(ModalGuilds);
    const guild = store.guilds.find(guild => guild.id === store.selectedGuildId);
    return (
        <SideMenuContainer>
            <GuildChangeBtn guild={guild || {} as any} onClick={guildModal.open} />
            <Divider />
            <Button
                style={{ width: '90%' }}
                onClick={guildModal.open}
                icon={<SiDiscord />}
            >Guilds</Button>
            <Divider />
            <NavigationContainer btnQuantityInArea={6}>
                <NavigationScrollArea>
                    {RenderNavigationButtons({ currentPath: router.asPath })}
                </NavigationScrollArea>
            </NavigationContainer>
            <Divider />
            <Button
                style={{ width: '90%' }}
                onClick={() => router.push('/')}
                icon={<IoExitSharp />}
                focusColor="linear-gradient(to right, #ff7575,#ff2e2e)"
            >Sair</Button>
            <GuildModal />
        </SideMenuContainer>
    );
}

export default SideMenu;
import { SiDiscord } from 'react-icons/si';
import { IoExitSharp, IoHomeSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { useApp } from "../../../../context/App";
import useModal from "../../../../hooks/useModal";
import ModalGuilds from "../../../Modal/Guilds";
import { NavigationContainer, ButtonsArea, SideMenuContainer } from "./styled";
import { FC } from 'react';
import GuildChangeBtn from "./GuildChangeBtn";
import { Divider } from "../../../Divider";
import { Button } from "../../../Buttons";
import RenderNavigationButtons from "./RenderNavigationButtons";
import { useAuth } from '../../../../context/Auth';

const SideMenu: FC = props => {
    const { store } = useApp();
    const auth = useAuth();
    const router = useRouter();
    const [GuildModal, guildModal] = useModal(ModalGuilds);
    const guild = store.guilds.find(guild => guild.id === store.selectedGuildId);

    return (
        <SideMenuContainer onClick={e => e.stopPropagation()}>
            <GuildChangeBtn guild={guild || {} as any} onClick={guildModal.open} />
            <Divider />
            <ButtonsArea>
                <Button
                    style={{ width: '90%' }}
                    onClick={guildModal.open}
                    icon={<SiDiscord />}
                >Guilds</Button>
            </ButtonsArea>
            <Divider />
            <NavigationContainer btnQuantityInArea={6}>
                <ButtonsArea>
                    {RenderNavigationButtons({ currentPath: router.asPath })}
                </ButtonsArea>
            </NavigationContainer>
            <Divider />
            <ButtonsArea>
                <Button
                    style={{ width: '90%' }}
                    onClick={() => router.push('/')}
                    icon={<IoHomeSharp />}
                >Home</Button>
                <Button
                    style={{ width: '90%' }}
                    onClick={auth.logOut}
                    icon={<IoExitSharp />}
                    focusColor="linear-gradient(to right, #ff7575,#ff2e2e)"
                >Logout</Button>
            </ButtonsArea>
            <GuildModal />
        </SideMenuContainer>
    );
}

export default SideMenu;
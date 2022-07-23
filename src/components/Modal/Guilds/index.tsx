import { memo } from "react";
import { useApp } from "../../../context/App";
import { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import { UserGuildType } from "../../../services/discord/user/user.types";
import GuildCard from "../../Card/Guild";
import Grid from "../../Grid";
import { Title } from "../../Typography";
import { ModalWrapper } from "../styled";
import { ModalContainer, ModalHeader, ModalScrollContainer } from "./styles";

const ModalGuilds: ModalComponentWrapper<{ guilds: UserGuildType[] }> = props => {
    const { store, dispatchStore } = useApp();
    const onSelectGuild = (guildId: string) => {
        dispatchStore({ type: 'SET_SELECTED_GUILD', payload: { selectedGuildId: guildId } });
        setTimeout(props.modal.close, 100);
    }
    return (
        <ModalWrapper onClick={props.modal.close}>
            <Grid horizontalAlign="center" verticalAlign="center">
                <Grid.Row breakpoints={{ xs: 23, md: 10, lg: 8 }} onClick={e => e.stopPropagation()}>
                    <ModalHeader>
                        <Title stroke={{ strokeColor: '#000000' }}>Guilds</Title>
                    </ModalHeader>
                    <ModalContainer>
                        <ModalScrollContainer>
                            {store.guilds.map(guild => (<GuildCard key={guild.id} selected={guild.id === store.selectedGuildId} onClick={onSelectGuild} guild={guild} />))}
                        </ModalScrollContainer>
                    </ModalContainer>
                </Grid.Row>
            </Grid>
        </ModalWrapper>
    );
}

export default memo(ModalGuilds);
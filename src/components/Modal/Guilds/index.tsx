import { memo } from "react";
import { useApp } from "../../../context/App";
import AppDispatch from "../../../context/App/dispatch";
import { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import { UserGuildType } from "../../../services/discord/user/user.types";
import Grid from "../../Grid";
import { Title } from "../../Typography";
import { ModalWrapper } from "../styled";
import RenderGuildCards from "./RenderGuildCards";
import { ModalContainer, ModalHeader, ModalScrollContainer } from "./styles";

const ModalGuilds: ModalComponentWrapper<{ guilds: UserGuildType[] }> = props => {
    const { store, dispatchStore } = useApp();
    const onSelectGuild = (guildId: string) => {
        AppDispatch.setSelectedGuildId(dispatchStore, guildId);
        setTimeout(props.modal.close, 100);
    }
    return (
        <ModalWrapper onClick={props.modal.close}>
            <Grid horizontalAlign="center" verticalAlign="middle">
                <Grid.Row breakpoints={{ xs: 23, md: 10, lg: 8 }} onClick={e => e.stopPropagation()}>
                    <ModalHeader>
                        <Title stroke={{ strokeColor: '#000000' }}>Guilds</Title>
                    </ModalHeader>
                    <ModalContainer>
                        <ModalScrollContainer>
                            {RenderGuildCards(store.guilds, store.selectedGuildId, onSelectGuild)}
                        </ModalScrollContainer>
                    </ModalContainer>
                </Grid.Row>
            </Grid>
        </ModalWrapper>
    );
}

export default memo(ModalGuilds);
import { FC } from "react";
import { UserGuildType } from "../../../services/discord/user/user.types";
import { Paragraph, } from "../../Typography";
import { GuildCardContainer, GuildNameContainer } from "./styles";

interface IGuildCard {
    guild: UserGuildType;
    onClick: (guildId: string) => void;
    selected?: boolean;
}

const GuildCard: FC<IGuildCard> = ({ guild, onClick, selected }) => (
    <GuildCardContainer onClick={() => { onClick && onClick(guild.id); }}>
        <GuildNameContainer selected={selected} src={guild.icon}>
            <Paragraph stroke={{ strokeColor: '#FFFFFF', textColor: '#000000' }} >{guild.name}</Paragraph>
        </GuildNameContainer>
    </GuildCardContainer>
);

export default GuildCard;
import { FC } from "react";
import { UserGuildType } from "../../../services/discord/user/user.types";
import InviteBotBtn from "../../Buttons/InviteBot";
import GuildCard from "../../Card/Guild";
import EmptyData from "../../EmptyData";

type Fn = (guildId: string) => void;

interface IProps {
    guild: UserGuildType;
    selectedGuildId: string;
    onClick: Fn;
}

const GuildCardItem: FC<IProps> = ({ guild, selectedGuildId, onClick }) => (
    <GuildCard
        key={guild.id}
        selected={guild.id === selectedGuildId}
        onClick={onClick}
        guild={guild}
    />
)


const RenderGuildCards = (guilds: UserGuildType[], selectedGuildId: string, onClick: Fn) => guilds.length
    ? guilds
        .filter(guild => guild.hasBot)
        .map(guild => GuildCardItem({ guild, selectedGuildId, onClick }))
    : (
        <EmptyData>
            <InviteBotBtn />
        </EmptyData>
    );

export default RenderGuildCards;
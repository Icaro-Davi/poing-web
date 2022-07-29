import { FC } from "react";
import useImageLoad from "../../../../hooks/useImageLoad";
import { UserGuildType } from "../../../../services/discord/user/user.types";
import LoadWrapper from "../../../Loading/LoadWrapper";
import { Profile } from "../../../Profile";
import { Title } from "../../../Typography";
import { GuildNameContainer, Header } from "./styled";

const DEFAULT_IMAGE = '/image/slime_king.png';

interface IProps {
    onClick: () => void;
    guild: UserGuildType;
}

const GuildChangeBtn: FC<IProps> = ({ guild, ...props }) => {
    const imageLoaded = useImageLoad(guild.icon);
    return (
        <LoadWrapper isLoading={!imageLoaded}>
            <Header onClick={props.onClick} imageSrc={guild?.icon || DEFAULT_IMAGE}>
                <Profile imageSrc={guild?.icon || DEFAULT_IMAGE} size={85} />
                <GuildNameContainer>
                    <Title
                        level='4'
                        style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                        stroke={{ strokeColor: '#000000', shadowColor: '#FFFFFF' }}
                    >
                        {guild?.name}
                    </Title>
                </GuildNameContainer>
            </Header>
        </LoadWrapper>
    )
}

export default GuildChangeBtn;
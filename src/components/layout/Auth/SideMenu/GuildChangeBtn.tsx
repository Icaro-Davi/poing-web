import { FC, ReactNode } from "react";
import useImageLoad from "../../../../hooks/useImageLoad";
import LoadWrapper from "../../../Loading/LoadWrapper";
import { Header } from "./styled";

interface IProps {
    children: ReactNode;
    guildIconSrc: string;
    onClick: () => void;
}

const GuildChangeBtn: FC<IProps> = props => {
    const imageLoaded = useImageLoad(props.guildIconSrc);
    return (
        <LoadWrapper isLoading={!imageLoaded}>
            <Header onClick={props.onClick} imageSrc={props.guildIconSrc}>
                {props.children}
            </Header>
        </LoadWrapper>
    )
}

export default GuildChangeBtn;
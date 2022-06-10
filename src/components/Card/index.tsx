import { ReactNode } from "react";
import { IStyledCard } from "./card.types";
import { StyledCard } from "./styled";

interface ICard extends IStyledCard, React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    title?: string;
}

const Card: React.FC<ICard> = ({ children, title, ...props }) => {
    return (
        <StyledCard {...props}>
            {children}
        </StyledCard>
    )
};


export default Card;
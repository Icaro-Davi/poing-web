import { Fragment, ReactNode } from "react";
import { useApp } from "../../context/App";
import Grid from "../Grid";
import Img from "../Img";
import { IStyledCard } from "./card.types";
import { StyledCard, StyledCardParagraph, StyledCardTitle } from "./styled";

interface ICard extends IStyledCard, React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    title?: string;
    description?: string;
    imageSrc?: string;
}

const Card: React.FC<ICard> = ({ children, title, description, imageSrc, ...props }) => {
    const { layout: { breakpoints } } = useApp();

    return (
        <StyledCard {...props}>
            <Grid verticalAlign="center" horizontalAlign="center">
                {imageSrc && (
                    <Grid.Row breakpoints={{ xs: 24, md: 24, lg: 7 }} horizontalAlign="center">
                        <Img
                            imageSrc={imageSrc}
                            alt='Slime Rimuru Tempest'
                            style={{ position: 'relative', width: 'auto', height: 'clamp(15rem, 100vw, 25rem)' }}
                        />
                    </Grid.Row>
                )}
                <Grid.Row breakpoints={{ xs: 24, lg: 12 }} style={{ textAlign: (breakpoints.xs || breakpoints.sm && !breakpoints.lg) ? 'center': 'left' }}>
                    {(title || description) && (
                        <Fragment>
                            {title && (<StyledCardTitle spacing="lg" stroke={{ strokeSize: 1.5, shadowBlur: 5, shadowX: 5, shadowY: 5 }}>{title}</StyledCardTitle>)}
                            {description && (<StyledCardParagraph>{description}</StyledCardParagraph>)}
                        </Fragment>
                    )}
                </Grid.Row>
                {children && (
                    <Grid.Row breakpoints={{ xs: 24 }}>
                        {children}
                    </Grid.Row>
                )}
            </Grid>
        </StyledCard>
    )
};


export default Card;
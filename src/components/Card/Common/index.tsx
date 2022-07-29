import { ReactNode } from "react";
import { useApp } from "../../../context/App";
import Img from "../../Img";
import { IStyledCard } from "./card.types";
import { StyledCard, StyledCardParagraph, StyledCardTitle, TitleAndCardContainer } from "./styled";

interface ICard extends IStyledCard, React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    title?: string;
    description?: string;
    reverse?: boolean;
    imgAlt?: string;
    imageSrc?: string;
    imgH?: number;
    imgW?: number;
    buttonsArea?: ReactNode;
}

const Card: React.FC<ICard> = ({ children, title, description, imageSrc, imgAlt, imgH = 300, imgW = 300, buttonsArea, reverse, ...props }) => {
    const { layout: { breakpoints } } = useApp();
    const isMobile = (breakpoints.xs || breakpoints.sm && !breakpoints.lg);
    return (
        <StyledCard {...props}>
            {(imageSrc || title || description) && (
                <TitleAndCardContainer
                    direction={
                        isMobile
                            ? 'column'
                            : reverse ? 'row-reverse' : 'row'
                    }
                    style={{
                        textAlign: isMobile
                            ? 'center'
                            : reverse ? 'right' : 'left'
                    }}
                >
                    {imageSrc && (
                        <div style={{ width: (isMobile ? imgW / 1.5 : (imgW * 2)), height: (isMobile ? imgH / 1.5 : (imgH * 1.5)) }}>
                            <Img
                                imageSrc={imageSrc}
                                alt={imgAlt || ''}
                                style={{ position: 'relative', width: 'auto', height: '100%' }}
                            />
                        </div>
                    )}
                    {(title || description) && (
                        <div style={{ display: 'flex', flexFlow: 'column' }}>
                            {title && (
                                <StyledCardTitle
                                    spacing="lg"
                                    stroke={{ strokeSize: 1.5, shadowBlur: 5, shadowX: 5, shadowY: 5 }}
                                >
                                    {title}
                                </StyledCardTitle>
                            )}
                            {description && (
                                <StyledCardParagraph>
                                    {description}
                                </StyledCardParagraph>
                            )}
                            {buttonsArea && (
                                <div style={{ padding: '0.5rem 0', display: 'flex', ...isMobile ? { justifyContent: 'center' } : { justifyContent: 'start' } }}>
                                    {buttonsArea}
                                </div>
                            )}
                        </div>
                    )}
                </TitleAndCardContainer>
            )}
            {children && (
                <div>{children}</div>
            )}
        </StyledCard >
    )
};


export default Card;
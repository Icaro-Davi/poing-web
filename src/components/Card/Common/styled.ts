import styled, { css, DefaultTheme, ThemeProps } from "styled-components";
import { ThemeColorsKeys } from "../../../utils/general.types";
import { StyledTitleOne, StrokeText, StyledParagraph } from "../../Typography/styled";
import { IStyledCard } from "./card.types";

export const StyledCardParagraph = styled(StyledParagraph)``;
export const StyledCardTitle = styled(StyledTitleOne)`
    width: 100%;
`;

const Theme = (props: ThemeProps<DefaultTheme>, themeColorKey: ThemeColorsKeys) => css`
    background-color: ${props.theme.colors[themeColorKey]};

    ${StyledCardTitle} {
        ${props => StrokeText({
            strokeColor: props.theme.colors[themeColorKey]
        })}
    }
    ${StyledCardParagraph} {
        ${props => StrokeText({
            strokeColor: props.theme.colors[themeColorKey]
        })}
    }
`;

export const StyledCard = styled.div<IStyledCard>`
    width: 100%;
    padding: ${({ padding }) => (padding || 16) + 'px'};
    border: 8px solid ${props => props.theme.colors.white};
    border-radius: 35px;
    box-shadow: 0 8px 9px -5px #000;

    ${props => {
        switch (props.type) {
            case 'one':
                return Theme(props, 'primary');
            case 'two':
                return Theme(props, 'secondary');
            case 'three':
                return Theme(props, 'backgroundLighter');
            case 'four':
                return Theme(props, 'backgroundDarker');
            default:
                return '';
        }
    }}
`;

export const TitleAndCardContainer = styled.div<{ direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse' }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${props => props.direction || 'row'};
`;
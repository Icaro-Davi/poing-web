import styled, { css, DefaultTheme, ThemeProps } from "styled-components";
import { ThemeColorsKeys } from "../../utils/general.types";
import { IStyledCard } from "./card.types";

const Theme = (props: ThemeProps<DefaultTheme>, themeColorKey: ThemeColorsKeys) => css`
    background-color: ${props.theme.colors[themeColorKey]};
`;

export const StyledCard = styled.div<IStyledCard>`
    width: 100%;
    padding: ${({ padding }) => (padding || 16) + 'px'};
    border: 8px solid ${props => props.theme.colors.white};
    border-radius: 35px;
    margin-top: 16px;
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
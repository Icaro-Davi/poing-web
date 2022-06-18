import styled from "styled-components";
import { AlignType, StyledGridContainerProps, StyledGridRowProps } from "./grid.types";

const StyleFlexAlign = (cssProperty: string, alignType: AlignType) => {
    switch (alignType) {
        case 'center':
            return `${cssProperty}: center;`
        case 'left':
            return `${cssProperty}: flex-start;`
        case 'right':
            return `${cssProperty}: flex-end;`
    }
}

export const StyledGridContainer = styled.div<StyledGridContainerProps>`
    display: flex;
    flex-wrap: wrap;
    ${props => props.horizontalAlign && StyleFlexAlign('justify-content', props.horizontalAlign)}
    ${props => props.verticalAlign && StyleFlexAlign('align-items', props.verticalAlign)}
`;

export const StyledGridRow = styled.div<StyledGridRowProps>`
    display: flex;
    flex-direction: column;
    justify-content: ${({ verticalAlign }) => verticalAlign || 'flex-start'};
    align-items: ${({ horizontalAlign }) => horizontalAlign || 'flex-start'};
`;
import styled, { css } from "styled-components";
import { HorizontalAlign, StyledGridContainerProps, StyledGridRowProps, VerticalAlign } from "./grid.types";

const HorizontalAlign = (cssProperty: string, alignType: HorizontalAlign) => {
    switch (alignType) {
        case 'center':
            return `${cssProperty}: center;`
        case 'left':
            return `${cssProperty}: flex-start;`
        case 'right':
            return `${cssProperty}: flex-end;`
    }
}

const VerticalAlign = (cssProperty: string, alignType: VerticalAlign) => {
    switch (alignType) {
        case 'bottom':
            return `${cssProperty}: flex-end;`
        case 'middle':
            return `${cssProperty}: center;`
        case 'top':
            return `${cssProperty}: flex-start;`
    }

}

const Gutter = (gutter: [number, number]) => {
    const [x, y] = gutter;
    return css`
        row-gap: ${(x ?? 0)}px;
        ${StyledGridRow} {
            padding-left: ${(y ?? 0) / 2}px;
            padding-right: ${(y ?? 0) / 2}px;
        }
    `;
}

export const StyledGridContainer = styled.div<StyledGridContainerProps>`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    ${props => props.horizontalAlign && HorizontalAlign('justify-content', props.horizontalAlign)}
    ${props => props.verticalAlign && VerticalAlign('align-items', props.verticalAlign)}
    ${props => props.gutter && Gutter(props.gutter)}
`;

export const StyledGridRow = styled.div<StyledGridRowProps>`
    display: flex;
    flex-direction: column;
    ${props => props.horizontalAlign && HorizontalAlign('align-items', props.horizontalAlign)}
    ${props => props.verticalAlign && VerticalAlign('justify-content', props.verticalAlign)}
`;
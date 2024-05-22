export type HorizontalAlign = 'center' | 'left' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';

export type StyledGridContainerProps = {
    horizontalAlign?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
    gutter?: [number, number];
}

export type StyledGridRowProps = {
    horizontalAlign?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
}
export type StrokeTextType = {
    textColor?: string;
    strokeSize?: number;
    strokeColor?: string;

    shadowColor?: string;
    shadowX?: number;
    shadowY?: number;
    shadowBlur?: number;
}

export type StyledTitlePropsType = {
    stroke?: StrokeTextType | number;
    spacing?: 'sm' | 'md' | 'lg' | 'none';
    font?: 'Roboto' | 'Pattaya';
    bold?: number;
};

export type StyledParagraphType = {
    stroke?: StrokeTextType | number;
}
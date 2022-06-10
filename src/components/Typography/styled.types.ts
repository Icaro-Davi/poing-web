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
    stroke?: StrokeTextType | string;
    spacing?: 'sm' | 'md' | 'lg' | 'none';
};

export type StyledParagraphType = {
    stroke?: StrokeTextType | string;
}
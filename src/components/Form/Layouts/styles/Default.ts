export enum FORM_PADDING {
    xs = 3,
    sm = 6,
    md = 12
}

type GutterType = [number, number];
export const formGridGutter: GutterType = [FORM_PADDING.md, FORM_PADDING.md];
export const formGridVerticalGutter: GutterType = [FORM_PADDING.sm, 0];
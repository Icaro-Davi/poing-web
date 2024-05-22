import { FormEvent, RefObject } from "react";

export type MatchRef = RegexReference & { match: string; list: string[]; matchedTextAt: string; restOfText: string; selectionIndex: number; };
export type RegexReference = { name: string; trigger: RegExp; list: string[]; };
export type UseAutocompleteProps = {
    optionsBoxReference: RefObject<HTMLElement>;
    inputReference: RefObject<HTMLInputElement | HTMLTextAreaElement>;
    triggers: RegexReference[];
    offsetX?: number;
    offsetY?: number;
    rightLimit?: number;
    placeInTop?: boolean;
    filter?: (list: string[], currentMatch: string) => string[];
    onInput?: (event: FormEvent<HTMLTextAreaElement> | FormEvent<HTMLInputElement>) => void;
    onMatch?: (isMatched: MatchRef | undefined) => void;
}
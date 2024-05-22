import { KeyboardEvent, RefObject, FocusEvent } from 'react';
import { MatchRef } from '../../../../hooks/useAutocomplete';

type OptionBoxRefType = RefObject<HTMLElement | undefined>;

export function onInputKeyDown<T extends HTMLElement>(event: KeyboardEvent<T>, options: { matchRef: RefObject<MatchRef | undefined>; optionBoxRef: OptionBoxRefType; }) {
    let validEventsKey = ['ArrowUp', 'ArrowDown'];
    let isValidEventKey = validEventsKey.some(key => key === event.code);
    if (isValidEventKey && options.matchRef.current) {
        const withoutFocus = (options.optionBoxRef.current?.childNodes[0] as HTMLDivElement);
        withoutFocus.focus();
        event.preventDefault();
    }
}

export function onInputBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, options: { optionBoxRef: OptionBoxRefType; closeOptionBox: () => void; }) {
    const parentNode = event.relatedTarget?.parentNode;
    if (parentNode && options!.optionBoxRef!.current && parentNode.isEqualNode(options.optionBoxRef.current)) return;
    options.closeOptionBox();
}
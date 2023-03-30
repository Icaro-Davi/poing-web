import { FormEvent, useCallback, useEffect } from "react";
import { UseAutocompleteProps } from "./autocomplete.types";
import createPositionOptionsBox from "./createPositionOptionsBox";
import autocompleteFindMatch from "./findMatch";
import getAutocompleteCoordinates from "./getAutocompleteCoordinates";

function useAutocomplete(props: UseAutocompleteProps) {

    const hideOptionBox = useCallback(() => {
        if (props.optionsBoxReference.current) {
            props.optionsBoxReference.current.style.visibility = 'hidden';
        }
    }, [props.optionsBoxReference]);

    const showOptionBox = useCallback(({ top, left }: { top: number; left: number; }) => {
        if (props.optionsBoxReference.current) {
            props.optionsBoxReference.current.style.visibility = 'visible';
            props.optionsBoxReference.current.style.position = 'absolute';
            props.optionsBoxReference.current.style.top = `${top}px`;
            props.optionsBoxReference.current.style.left = `${left}px`;
        }
    }, [props.optionsBoxReference]);

    const verifyParentNode = useCallback((parentElement: HTMLElement) => {
        const parentStyle = getComputedStyle(parentElement);
        let positionType = parentStyle['position'];
        if (positionType !== 'relative') {
            console.warn('Create a container for your input element with relative position, and the container needs to be the same size as the input element, otherwise you might position your option box in the wrong place.', parentElement);
        }
    }, []);

    useEffect(() => {
        if (props.optionsBoxReference.current) {
            props.optionsBoxReference.current.style.visibility = 'visible';
            props.optionsBoxReference.current.parentElement && verifyParentNode(props.optionsBoxReference.current.parentElement);
        }
    }, [props.optionsBoxReference, verifyParentNode]);

    const onInput = useCallback((autocompleteElementEvent: FormEvent<HTMLTextAreaElement> | FormEvent<HTMLInputElement>) => {
        props.onInput?.(autocompleteElementEvent);
        let selectionStart = autocompleteElementEvent.currentTarget.selectionStart ?? 0;
        const text = autocompleteElementEvent.currentTarget.value.slice(0, selectionStart);
        const matchRef = autocompleteFindMatch({ text, triggers: props.triggers, currentIndex: 0, props });

        if (matchRef) {
            props.onMatch?.({
                ...matchRef,
                matchedTextAt: text,
                restOfText: autocompleteElementEvent.currentTarget.value.slice(selectionStart),
                selectionIndex: selectionStart
            });
            const coords = getAutocompleteCoordinates(autocompleteElementEvent.currentTarget);
            if (matchRef.list.length) {
                showOptionBox(createPositionOptionsBox(props)(autocompleteElementEvent.currentTarget, coords));
            } else {
                hideOptionBox();
            }
        } else {
            props.onMatch?.(undefined);
            hideOptionBox();
        }
    }, [hideOptionBox, showOptionBox, props]);

    return {
        inputElementProps: {
            onInput,
        },
        optionsBox: {
            show: showOptionBox,
            hide: hideOptionBox,
        }
    };
}

export * from './autocomplete.types';
export default useAutocomplete;
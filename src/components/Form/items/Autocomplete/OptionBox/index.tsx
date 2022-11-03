import { forwardRef, KeyboardEvent, MutableRefObject, RefObject, useCallback, FocusEvent } from 'react';
import { MatchRef } from '../../../../../hooks/useAutocomplete';
import HTMLNativeSetValue from '../../../../../utils/HTMLNativeSetValue';
import OptionBoxContainer from '../Styled';
import OptionBoxItem from './OptionBoxItem';

interface IProps {
    matchRef: MutableRefObject<MatchRef | undefined>;
    inputRef: RefObject<HTMLTextAreaElement | HTMLInputElement>;
    htmlPropertyType?: HTMLTextAreaElement | HTMLInputElement;
    onBlur?: () => void;
}

const OptionsBox = forwardRef<HTMLDivElement, IProps>(
    ({ matchRef, inputRef, onBlur: customOnBlur, ...props }, ref) => {
        const setValueOnInputElement = useCallback((value: string) => {
            HTMLNativeSetValue({
                value,
                HTMLElementPrototype: props.htmlPropertyType ?? window.HTMLTextAreaElement.prototype,
                customEventName: 'change',
                elementTarget: inputRef.current!,
            });
            HTMLNativeSetValue({
                value,
                HTMLElementPrototype: props.htmlPropertyType ?? window.HTMLTextAreaElement.prototype,
                customEventName: 'input',
                elementTarget: inputRef.current!,
            });
        }, [inputRef, props.htmlPropertyType]);

        const appendText = useCallback((value: string) => {
            let selectionIndex = matchRef.current!.selectionIndex + value.length - 1;
            const text = matchRef.current?.matchedTextAt.replace(matchRef.current.trigger, value)?.concat(matchRef.current.restOfText);
            if (text) {
                setValueOnInputElement(text);
                inputRef.current!.focus();
                inputRef.current!.setSelectionRange(selectionIndex, selectionIndex);
            }
        }, [inputRef, matchRef, setValueOnInputElement]);

        const onKeyDownOptionsBox = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
            if (matchRef.current) {
                const onEvent = (cb: (element: { next: HTMLElement, previous: HTMLElement, currentElement: HTMLElement }) => void) => {
                    const focusedElement = (document.querySelector('.options-box:not([style*="display: none"]) .item:focus') as HTMLElement);
                    if (focusedElement) {
                        const router = {
                            next: (focusedElement.nextElementSibling ?? focusedElement.parentElement?.firstChild) as HTMLElement,
                            previous: (focusedElement.previousElementSibling ?? focusedElement.parentElement?.lastChild) as HTMLElement,
                            currentElement: focusedElement
                        }
                        cb(router);
                    }
                    event.preventDefault();
                }

                switch (event.code) {
                    case 'ArrowUp':
                        onEvent(router => {
                            router.previous?.focus();
                        });
                        break;
                    case 'ArrowDown':
                        onEvent(router => {
                            router.next?.focus();
                        });
                        break;
                    case 'Enter':
                        onEvent(router => {
                            appendText(router.currentElement.dataset.value || '');
                        });
                        break;
                    default:
                        inputRef.current!.focus();
                        break;
                }
            }
        }, [inputRef, matchRef, appendText]);

        const onBlur = useCallback((event: FocusEvent<HTMLDivElement, Element>) => {
            const parentElement = event.target.parentElement as HTMLDivElement;
            const childrenNodes = parentElement.children;
            const isValidParentElement = Array.from(childrenNodes).some(childNode => childNode.isEqualNode(event.relatedTarget));
            if (!isValidParentElement) customOnBlur?.();
        }, [customOnBlur]);

        return (
            <OptionBoxContainer ref={ref} onKeyDown={onKeyDownOptionsBox} onBlur={onBlur} className='options-box'>
                {(!!matchRef.current?.list.length) && matchRef.current.list.map((listItem, i) => (
                    <OptionBoxItem
                        key={`item-key-${i}`}
                        index={i}
                        label={listItem}
                        value={listItem}
                        onClick={appendText}
                    />
                ))}
            </OptionBoxContainer>
        );
    }
);

OptionsBox.displayName = 'OptionsBox'

export default OptionsBox;
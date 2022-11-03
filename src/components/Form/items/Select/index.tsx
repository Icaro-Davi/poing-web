import { FC, useRef, useCallback, FocusEvent, KeyboardEvent } from 'react';
import Label from '../Label';
import SelectContainer from './styled';

type SelectItem = { label: string; value: string };
interface IProps {
    options: SelectItem[];
    label?: string;
    initialValue?: SelectItem;
    onSelect?: (selected: SelectItem) => void;
    onBlur?: () => void;
}

const Select: FC<IProps> = ({ onBlur, onSelect, ...props }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);

    const onChangeValue = useCallback((value: SelectItem) => {
        (document.activeElement as HTMLElement).blur();
        onBlur?.();
        (buttonRef.current as HTMLElement).innerText = value.label;
        (buttonRef.current as HTMLButtonElement).dataset.value = value.value;
        onSelect?.(value);
    }, [onBlur, onSelect]);

    const onFocusSelect = useCallback((event: FocusEvent<(HTMLButtonElement), globalThis.Element>) => {
        event.preventDefault();
        let itemValue = {
            label: buttonRef.current?.innerText,
            value: buttonRef.current?.dataset.value
        };

        const findElementInDepth = (elements: HTMLCollection, currentIndex: number): HTMLElement | undefined => {
            let element = (elements[currentIndex] as HTMLElement);
            if (element) {
                if (itemValue.label === element.innerText && itemValue.value === element.dataset.value)
                    return element;
                else
                    return elements[currentIndex + 1] ? findElementInDepth(elements, currentIndex + 1) : optionsRef.current!.firstChild as HTMLElement;;
            } else {
                return undefined;
            }
        }
        (findElementInDepth(optionsRef.current!.children, 0) as HTMLLIElement)?.focus();
    }, [buttonRef]);

    const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        const onEvent = (cb: (element: { next: HTMLElement, previous: HTMLElement, currentElement: HTMLElement }) => void) => {
            const focusedElement = (document.querySelector('.select-list:not([style*="display: none"]) .select-item:focus') as HTMLElement);
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
                    let itemValue = {
                        label: router.currentElement.innerText,
                        value: (router.currentElement.dataset.value as string),
                    }
                    onChangeValue(itemValue);
                });
                break;
        }
    }, [onChangeValue]);

    return (
        <SelectContainer onKeyDown={onKeyDown} >
            {props.label && (
                <Label onClick={e => (e.currentTarget.nextElementSibling as HTMLElement).focus()} style={{ cursor: 'pointer' }}>
                    {props.label}
                </Label>
            )}
            <button ref={buttonRef} onFocus={onFocusSelect} onClick={e => e.preventDefault()} data-value={props.initialValue?.value}>{props.initialValue?.label}</button>
            <ul className='select-list' ref={optionsRef}>
                {props.options.map((selectItem, i) => (
                    <li key={`select-item-${i}`} className='select-item' tabIndex={i} data-value={selectItem.value} onClick={() => onChangeValue(selectItem)}>{selectItem.label}</li>
                ))}
            </ul>
        </SelectContainer>
    );
}

export default Select;
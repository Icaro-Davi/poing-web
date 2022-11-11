import { forwardRef, ForwardRefRenderFunction, useEffect, useRef, KeyboardEvent, useCallback, FocusEvent, InputHTMLAttributes } from 'react';
import useAutocomplete, { MatchRef, RegexReference } from '../../../../../hooks/useAutocomplete';
import ErrorMessage from '../../ErrorMessage';
import Input from '../../Input';
import Label from '../../Label';
import { CustomFilter } from '../CustomFilter';
import OptionBox from '../OptionBox';
import { onInputBlur, onInputKeyDown } from '../SharedEvents';
import AutocompleteInputContainer from './styled';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
    triggers: RegexReference[];
    placeholder?: string;
}

const AutocompleteInput: ForwardRefRenderFunction<HTMLInputElement, IProps> = ({ label, errorMessage, ...props }, ref) => {
    const id = useRef<string>(Math.random().toString(32).slice(2));
    const inputRef = useRef<HTMLInputElement>(null);
    const optionBoxRef = useRef<HTMLDivElement>(null);
    const matchRef = useRef<MatchRef>();

    const { inputElementProps, optionsBox } = useAutocomplete({
        inputReference: inputRef,
        triggers: props.triggers,
        optionsBoxReference: optionBoxRef,
        filter: CustomFilter,
        onMatch(match) {
            matchRef.current = match;
        },
    });

    useEffect(() => {
        if (typeof ref === 'function') ref(inputRef.current);
    }, [ref]);

    return (
        <AutocompleteInputContainer>
            {label && (<Label htmlFor={id.current}>{label}</Label>)}
            <div className='autocomplete-container'>
                <Input
                    onKeyDown={e => onInputKeyDown(e, { matchRef, optionBoxRef })}
                    ref={inputRef}
                    id={id.current}
                    {...inputElementProps}
                    {...props}
                    onBlur={e => {
                        props.onBlur?.(e);
                        onInputBlur(e, { optionBoxRef: optionBoxRef, closeOptionBox: optionsBox.hide });
                    }}
                />
                <OptionBox
                    matchRef={matchRef}
                    inputRef={inputRef}
                    ref={optionBoxRef}
                    htmlPropertyType={window.HTMLInputElement.prototype}
                    onBlur={() => { optionsBox.hide() }}
                />
            </div>
            {errorMessage && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
            )}
        </AutocompleteInputContainer>
    )
}

export default forwardRef(AutocompleteInput);
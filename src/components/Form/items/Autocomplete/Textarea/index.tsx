import { ForwardRefRenderFunction, forwardRef, useRef, useEffect, TextareaHTMLAttributes } from 'react';
import useAutocomplete, { MatchRef, RegexReference } from '../../../../../hooks/useAutocomplete';
import ErrorMessage from '../../ErrorMessage';
import Label from '../../Label';
import { CustomFilter } from '../CustomFilter';
import OptionsBox from '../OptionBox';
import { onInputBlur, onInputKeyDown } from '../SharedEvents';
import { TextInputContainer } from './styled';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    triggers: RegexReference[];
    errormessage?: string;
    initialValue?: string;
    minRows?: number;
    disableAutocomplete?: boolean;
}

const AutocompleteTextarea: ForwardRefRenderFunction<HTMLTextAreaElement, IProps> = ({ initialValue, disableAutocomplete, ...props }, ref) => {
    const id = useRef<string>(Math.random().toString(32).slice(2));
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const autocompleteBoxRef = useRef<HTMLDivElement>(null);
    const matchRef = useRef<MatchRef | undefined>();

    const { inputElementProps, optionsBox } = useAutocomplete({
        inputReference: textareaRef,
        optionsBoxReference: autocompleteBoxRef,
        triggers: props.triggers,
        filter: CustomFilter,
        onInput: (event) => { (event.currentTarget.parentNode as any).dataset.replicatedValue = event.currentTarget.value },
        onMatch: (match) => { matchRef.current = match }
    });

    useEffect(() => {
        typeof ref === 'function' && ref(textareaRef.current);
    }, [ref]);

    useEffect(() => {
        let autocompleteContainer = textareaRef.current?.parentElement;
        if (textareaRef.current?.value) autocompleteContainer!.dataset.replicatedValue = textareaRef.current.value;
    }, [textareaRef]);

    return (
        <TextInputContainer>
            {props.label && (<Label htmlFor={id.current}>{props.label}</Label>)}
            <div className='autocomplete-container'>
                <textarea
                    id={id.current}
                    ref={textareaRef}
                    style={{ minHeight: 57 }}
                    onKeyDown={e => onInputKeyDown(e, { matchRef, optionBoxRef: autocompleteBoxRef })}
                    {...inputElementProps}
                    {...props}
                    onBlur={e => {
                        onInputBlur(e, { optionBoxRef: autocompleteBoxRef, closeOptionBox: optionsBox.hide });
                        props.onBlur?.(e);
                    }}
                />
                {!disableAutocomplete && <OptionsBox
                    ref={autocompleteBoxRef}
                    inputRef={textareaRef}
                    matchRef={matchRef}
                    onBlur={() => { optionsBox.hide() }}
                />}
            </div>
            {!!props.errormessage && (
                <ErrorMessage>{`${props.errormessage}`}</ErrorMessage>
            )}
        </TextInputContainer>
    );
}

export default forwardRef(AutocompleteTextarea);
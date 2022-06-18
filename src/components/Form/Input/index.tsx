import { StyledInput, StyledInputContainer, StyledInputLabel } from "./styled";

interface IInput extends React.HTMLAttributes<HTMLInputElement>{
    label: string;
}

const Input: React.FC<IInput> = ({  label, ...props }) => {
    const onInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (e.target.value === "") e.target.nextElementSibling?.classList.remove('filled');
        else e.target.nextElementSibling?.classList.add('filled');
    }

    return (
        <StyledInputContainer>
            <StyledInput
                id={label}
                onBlur={onInputBlur}
                {...props}
            />
            <StyledInputLabel htmlFor={label}>{label}</StyledInputLabel>
        </StyledInputContainer >
    );
}

export default Input;

import styled from "styled-components";
import { StrokeText } from "../../Typography/styled";

const ErrorMessage = styled.span`
    display: inline-block;
    font-size: .8rem;
    padding-left: .3rem;
    padding-top: .3rem;
    ${props => StrokeText({
        strokeColor:  props.theme.colors.error,
        textColor: props.theme.colors.black,
        shadowColor: 'transparent',
    })}
`;

export default ErrorMessage;
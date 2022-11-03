import styled from "styled-components";
import { LABEL, SPACING } from "../DefaultPropertyValues";

const LabelForm = styled.label`
    margin-bottom: ${SPACING.sm};
    font-size: ${LABEL.font_size};
    font-weight: 600;
    display: block;
    ${props => props.htmlFor && 'cursor: pointer;'}
`;

export default LabelForm;
import styled from "styled-components";
import { INPUT_FORM, SPACING } from "../../DefaultPropertyValues";

export const TextInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;

    .autocomplete-container{
        position: relative;
        display: grid;
        background-color: #FFFFFF;

        ::after {
            content: attr(data-replicated-value) " ";
            white-space: pre-wrap;
            visibility: hidden;
        }
    }

    textarea, .autocomplete-container::after {
        font-size: ${INPUT_FORM.font_size};
        font-family: ${INPUT_FORM.font_family};
        font-weight: ${INPUT_FORM.weight};
        padding: ${SPACING.lg};
        border: 0;
        outline: none;
        overflow: hidden;
        resize: none;
        grid-area: 1 / 1 / 2 / 2;
    }
`;
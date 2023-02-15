import styled from "styled-components";
import { SPACING } from "../../Form/items/DefaultPropertyValues";

const HEIGHT = 22;

export const SubItemsButtonContainer = styled.div`
    position: relative;
    border-style: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    flex-flow: row;
    min-height: ${HEIGHT}px;

    .label {
        position: relative;
        display: flex;
        justify-content: center;
    }

    .sub-items {
        display: none;
        border-radius: 5px;
        z-index: 10;
        position: absolute;
        top: ${HEIGHT}px;
        min-width: 100px;
        padding: ${SPACING.md};
        background-color: ${props => props.theme.colors.black};
        border: 2px solid ${props => props.theme.colors.secondary};
    }

    .label:hover ~ .sub-items, .sub-items:hover {
        display: block;
    }
`;

import styled from "styled-components";
import { BORDER, SPACING } from "../DefaultPropertyValues";

const OptionBoxContainer = styled.div`
    position: absolute;
    z-index: 10;
    max-height: 150px; min-width: 200px;
    overflow: auto;
    background-color: #FFFFFF;

    display: flex;
    flex-flow: column;
    overflow-x: hidden;
    box-shadow: 1px 1px 8px -3px #000000;

    .item {
        padding: ${SPACING.sm};
    }

    .item:focus, .item:hover {
        outline: none;
        border-radius: ${BORDER.radius};
        background-color: ${props => props.theme.colors.primary};
        transform: scale(1.1) translateX(8px);
        border-left: 2px solid ${props => props.theme.colors.black};
    }
`;

export default OptionBoxContainer;
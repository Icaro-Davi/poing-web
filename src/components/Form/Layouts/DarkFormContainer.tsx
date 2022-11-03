import styled from "styled-components";
import { BORDER, SPACING } from "../items/DefaultPropertyValues";

const DarkFormContainer = styled.div`
    width: 100%;
    padding: ${SPACING.sm};
    margin-top: ${SPACING.sm};
    margin-bottom: ${SPACING.sm};
    background-color: ${props => props.theme.colors.black};
    border-top-left-radius: ${BORDER.radius};
    border-bottom-right-radius: ${BORDER.radius};

    label {
        color: #FFF;
        font-weight: unset;
    }
`;

export default DarkFormContainer;
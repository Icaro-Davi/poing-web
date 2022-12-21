import styled from "styled-components"
import { HORIZONTAL_HEADER_HEIGHT } from "./Menu/styled";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: ${props => props.theme.colors.backgroundLighter};
    overflow: hidden;
`;

export const Main = styled.main<{ padding?: number }>`
    flex: 1;
    overflow: auto;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    flex-flow: column;

    ::before{
        content: '';
        display: block;
        width: 100%;
        height: ${HORIZONTAL_HEADER_HEIGHT};
        flex-shrink: 0;
    }
`;
import styled from "styled-components"

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
    padding: ${props => (props.padding || 32)}px;
    padding-top: 0;
    padding-bottom: 0;
`;
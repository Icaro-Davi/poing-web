import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
`;

export const Main = styled.main`
    background-color: ${props => props.theme.colors.black};
    padding: 1em;
    padding-bottom: 0;
    flex: 1;
    overflow: hidden;
`;
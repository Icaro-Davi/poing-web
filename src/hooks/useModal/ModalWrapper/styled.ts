import styled from "styled-components";

export const StyledModalWrapper = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: ${props => props.theme.colors.black+'b5'};
    z-index: 10;
    display: flex;
    flex-flow: column;
    justify-content: center;
`;

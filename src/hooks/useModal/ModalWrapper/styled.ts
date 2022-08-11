import styled from "styled-components";

export const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 15;
`;

export const StyledModalBackground = styled.div`
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    position: fixed;
    backdrop-filter: blur(5px);
`;

export const ModalContentWrapper = styled.div`
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    flex-flow: column;
    justify-content: center;
`;
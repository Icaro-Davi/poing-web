import React from "react";
import styled from "styled-components";
import { ModalConfigType } from "./modal.types";

const StyledModalWrapper = styled.div`

`;

function ModalWrapper<P = {}>({ Component, Config, ...props }: { Component: React.ComponentType<any>, Config: { modal: ModalConfigType<P> } }) {
    console.log('re rendered')
    return () => (
        <StyledModalWrapper>
            <Component {...{ ...props, ...Config }} />
        </StyledModalWrapper>
    );
}

export default ModalWrapper;
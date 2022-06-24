import React, { Fragment } from "react";
import styled from "styled-components";
import { ModalComponent, ModalWrapperParams } from "./modal.types";

const StyledModalWrapper = styled.div`

`;

function ModalWrapper<P extends { [key: string]: any } = {}>({ Component, Config, ...props }: ModalWrapperParams<P>): ModalComponent {
    if (!Config?.modal) return () => <Fragment />;
    return () => (
        <StyledModalWrapper>
            <Component {...{ ...props, ...Config }} />
        </StyledModalWrapper>
    );
}

export default ModalWrapper;
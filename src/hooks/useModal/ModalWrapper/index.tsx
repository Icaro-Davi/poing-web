import React, { Fragment } from "react";
import { ModalComponent, ModalWrapperParams } from "../modal.types";
import { StyledModalWrapper } from "./styled";

function ModalWrapper<P extends { [key: string]: any } = {}>({ Component, Config, ...props }: ModalWrapperParams<P>): ModalComponent {
    if (!Config?.modal || !Config.modal.isActivated) return () => <Fragment />;
    return () => (
        <StyledModalWrapper>
            <Component {...{ ...props, ...Config }} />
        </StyledModalWrapper>
    );
}

export default ModalWrapper;
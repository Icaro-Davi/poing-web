import React, { Fragment } from "react";
import { ModalComponent, ModalWrapperParams } from "../modal.types";
import { StyledModalBackground } from "./styled";

function ModalWrapper<P extends { [key: string]: any } = {}>({ Component, Config, ...props }: ModalWrapperParams<P>): ModalComponent {
    if (!Config?.modal || !Config.modal.isActivated) return () => <Fragment />;
    return () => (
        <Fragment>
            <Component {...{ ...props, ...Config }} />
            <StyledModalBackground />
        </Fragment>
    );
}

export default ModalWrapper;
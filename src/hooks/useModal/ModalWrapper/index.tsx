import React, { Fragment } from "react";
import { ModalComponent, ModalWrapperParams } from "../modal.types";
import { Modal, ModalContentWrapper, StyledModalBackground } from "./styled";

function ModalWrapper<P extends { [key: string]: any } = {}>({ Component, Config, ...props }: ModalWrapperParams<P>): ModalComponent {
    if (!Config?.modal || !Config.modal.isActivated) return () => <Fragment />;
    return () => (
        <Modal>
            <StyledModalBackground />
            <ModalContentWrapper>
                <Component {...{ ...props, ...Config }} />
            </ModalContentWrapper>
        </Modal>
    );
}

export default ModalWrapper;
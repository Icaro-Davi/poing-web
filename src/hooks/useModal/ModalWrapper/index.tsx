import React, { Fragment, FC } from "react";
import { ModalComponent, ModalWrapperParams } from "../modal.types";
import { Modal, ModalContentWrapper, StyledModalBackground } from "./styled";

function ModalWrapper<P extends { [key: string]: any } = {}>({ Component, Config, ...props }: ModalWrapperParams<P>): ModalComponent {
    if (!Config?.modal || !Config.modal.isActivated) {
        const ModalNoContent: FC = () => <Fragment />;
        return ModalNoContent;
    }
    const ModalContent: FC = () => (
        <Modal>
            <StyledModalBackground />
            <ModalContentWrapper>
                <Component {...{ ...props, ...Config }} />
            </ModalContentWrapper>
        </Modal>
    );
    return ModalContent;
}

export default ModalWrapper;
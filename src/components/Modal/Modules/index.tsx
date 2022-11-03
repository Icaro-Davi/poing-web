import { forwardRef, ForwardRefRenderFunction, Fragment, useImperativeHandle } from "react";
import { useApp } from "../../../context/App";
import useModal from "../../../hooks/useModal";
import { ModalConfigType } from "../../../hooks/useModal/modal.types";
import WelcomeMemberModule from "./welcomeMember";

export interface ModulesModalRef {
    welcomeMember: Omit<ModalConfigType<any>, 'setContent'>;
}

const ModulesModal: ForwardRefRenderFunction<ModulesModalRef> = (props, ref) => {
    const { locale: { pages: { modules } } } = useApp();
    const [WelcomeMemberModal, welcomeMember] = useModal(WelcomeMemberModule, { title: modules.welcomeMember.title });

    useImperativeHandle(ref, () => ({
        welcomeMember
    }));

    return (
        <Fragment>
            <WelcomeMemberModal />
        </Fragment>
    )
}

export default forwardRef(ModulesModal);
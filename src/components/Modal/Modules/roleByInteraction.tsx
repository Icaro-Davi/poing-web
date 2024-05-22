import { forwardRef, ForwardRefRenderFunction, Fragment, useImperativeHandle, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineFormatPainter } from 'react-icons/ai';
import { useApp } from "../../../context/App";
import useModal from "../../../hooks/useModal";
import { ModalComponentWrapper, ModalConfigType } from "../../../hooks/useModal/modal.types";
import { MessageType } from "../../../services/discord/modules/modules.types";
import { Button } from "../../Buttons";
import MessagePreview from "../../Form/Layouts/MessageForm/MessagePreview";
import RoleByInteractionForm, { RoleByInteractionFormRef } from "../../Form/RoleByInteraction";
import Grid from "../../Grid";
import { cardsBreakpoints } from "../../Screens";
import ScrollArea from "../../ScrollArea";
import { ModalWrapper } from "../styled";
import { ModuleCard, ModuleCardFooter, ModuleCardHeader, ModuleCardSection } from "./styled";

type RoleByInteraction = {
    title: string;
}

const RoleByInteractionModal: ModalComponentWrapper<RoleByInteraction> = (props) => {
    const roleByInteractionFormRef = useRef<RoleByInteractionFormRef>(null);
    const [message, setMessage] = useState<MessageType>();
    const [submitting, setSubmitLoad] = useState<boolean>(false);
    const { locale } = useApp();
    return (
        <ModalWrapper>
            <Grid horizontalAlign="center">
                <Grid.Row breakpoints={cardsBreakpoints}>
                    <ModuleCard>
                        <ModuleCardHeader title={props.title} onClose={props.modal.close}>
                            {message && <MessagePreview disableReplaceBotVars message={message} />}
                        </ModuleCardHeader>
                        <ScrollArea style={{ marginRight: '.6rem' }}>
                            <ModuleCardSection style={{ paddingRight: 0 }}>
                                <RoleByInteractionForm
                                    ref={roleByInteractionFormRef}
                                    onFieldsChange={setMessage}
                                    onSubmitStart={() => setSubmitLoad(true)}
                                    onSubmitEnd={() => setSubmitLoad(false)}
                                />
                            </ModuleCardSection>
                        </ScrollArea>
                        <ModuleCardFooter>
                            <Grid gutter={[10, 10]} horizontalAlign='right'>
                                <Grid.Row breakpoints={{ xs: 24, md: 5 }}>
                                    <Button
                                        icon={<AiOutlineFormatPainter />}
                                        onClick={roleByInteractionFormRef.current?.reset}
                                    >{locale.labels.clean}</Button>
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24, md: 5 }}>
                                    <Button
                                        disabled={submitting}
                                        icon={<AiOutlinePlus />}
                                        onClick={roleByInteractionFormRef.current?.submit}
                                    >{locale.labels.create}</Button>
                                </Grid.Row>
                            </Grid>
                        </ModuleCardFooter>
                    </ModuleCard>
                </Grid.Row>
            </Grid>
        </ModalWrapper>
    );
}

export type RoleByInteractionRef = {
    modalRef: Omit<ModalConfigType<any>, 'setContent'>;
}

const ModuleModal: ForwardRefRenderFunction<RoleByInteractionRef, { title: string; }> = (props, ref) => {
    const [Modal, modalRef] = useModal(RoleByInteractionModal, { title: props.title });
    useImperativeHandle(ref, () => ({ modalRef }));
    return (
        <Fragment>
            <Modal />
        </Fragment>
    );
}

export default forwardRef(ModuleModal);
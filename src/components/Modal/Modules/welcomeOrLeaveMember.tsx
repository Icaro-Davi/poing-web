import { forwardRef, ForwardRefRenderFunction, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IoFlaskSharp, IoSaveSharp } from 'react-icons/io5';

import { useApp } from '../../../context/App';
import useModal from '../../../hooks/useModal';
import LocalStorage from '../../../utils/localStorage';
import { Button } from '../../Buttons';
import MessagePreview from '../../Form/Layouts/MessageForm/MessagePreview';
import WelcomeOrLeaveMemberForm, { FormRefs } from '../../Form/WelcomeOrLeaveMember';
import FetchWelcomeOrLeaveMemberSettings from '../../Form/WelcomeOrLeaveMember/fetchWelcomeOrLeaveMemberSettings';
import Grid from '../../Grid';
import LoadWrapper from '../../Loading/LoadWrapper';
import { cardsBreakpoints } from '../../Screens';
import ScrollArea from '../../ScrollArea';
import { ModalWrapper } from '../styled';
import { ModuleCard, ModuleCardFooter, ModuleCardHeader, ModuleCardSection } from './styled';

import type { ModalComponentWrapper, ModalConfigType } from "../../../hooks/useModal/modal.types";
import type { WelcomeOrLeaveMemberLabelType, WelcomeOrLeaveMemberType } from '../../../services/discord/modules/modules.types';

const handleFormData = (moduleType: WelcomeOrLeaveMemberLabelType) => {
    const welcomeMemberSettings = LocalStorage.bot.getSettings()?.modules?.[moduleType]?.settings ?? {} as WelcomeOrLeaveMemberType;
    if (typeof welcomeMemberSettings === 'object') return welcomeMemberSettings;
}

type WelcomeOrLeaveMemberModuleModalProps = {
    title: string;
    moduleType: WelcomeOrLeaveMemberLabelType;
}

const WelcomeOrLeaveMemberModal: ModalComponentWrapper<WelcomeOrLeaveMemberModuleModalProps> = props => {
    const { locale } = useApp();
    const formRef = useRef<FormRefs>(null);
    const [isLoading, setLoad] = useState(false);
    const [formData, setFormData] = useState<WelcomeOrLeaveMemberType | undefined>(handleFormData(props.moduleType));

    useEffect(() => {
        const moduleConf = LocalStorage.bot.getSettings()?.modules?.[props.moduleType];
        if (typeof moduleConf?.settings === 'string') {
            setLoad(true);
            FetchWelcomeOrLeaveMemberSettings({
                moduleType: props.moduleType,
                onFetch(fetchData) {
                    typeof fetchData.settings !== 'string' && (
                        setFormData(fetchData.settings)
                    );
                    setLoad(false);
                }
            });
        }
    }, [props.moduleType]);

    return (
        <ModalWrapper>
            <Grid horizontalAlign="center">
                <Grid.Row breakpoints={cardsBreakpoints}>
                    <ModuleCard>
                        <ModuleCardHeader title={props.title} onClose={props.modal.close}>
                        {formData && <MessagePreview message={formData} />}
                        </ModuleCardHeader>
                        <ScrollArea style={{ marginRight: '.6rem' }}>
                            <ModuleCardSection style={{ paddingRight: 0 }}>
                                <LoadWrapper isLoading={!formData}>
                                    <WelcomeOrLeaveMemberForm
                                        ref={formRef}
                                        moduleType={props.moduleType}
                                        onSubmitEnd={() => { setLoad(false); }}
                                        onSubmitStart={() => { setLoad(true); }}
                                        onChangeFields={formData ? setFormData : () => { }}
                                        initialDataForm={formData}
                                    />
                                </LoadWrapper>
                            </ModuleCardSection>
                        </ScrollArea>
                        <ModuleCardFooter>
                            <Grid gutter={[10, 10]} horizontalAlign='right'>
                                <Grid.Row breakpoints={{ xs: 24, md: 5 }}>
                                    <Button
                                        icon={<IoFlaskSharp />}
                                        disabled={isLoading}
                                        onClick={async () => {
                                            setLoad(true);
                                            formRef.current?.testWelcomeMember()
                                                .finally(() => {
                                                    setLoad(false);
                                                });
                                        }}>
                                        {locale.labels.test}
                                    </Button>
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24, md: 5 }}>
                                    <Button
                                        icon={<IoSaveSharp />}
                                        disabled={isLoading}
                                        onClick={() => { formRef.current?.submit(); }}>
                                        {locale.labels.save}
                                    </Button>
                                </Grid.Row>
                            </Grid>
                        </ModuleCardFooter>
                    </ModuleCard>
                </Grid.Row>
            </Grid>
        </ModalWrapper>
    );
}

export interface WelcomeOrLeaveModalRef {
    modalRef: Omit<ModalConfigType<any>, 'setContent'>;
}

const ModulesModal: ForwardRefRenderFunction<WelcomeOrLeaveModalRef, { moduleType: WelcomeOrLeaveMemberLabelType; title: string }> = (props, ref) => {
    const [ModuleModal, modalRef] = useModal(WelcomeOrLeaveMemberModal, { title: props.title, moduleType: props.moduleType });

    useImperativeHandle(ref, () => ({
        modalRef
    }));

    return (
        <Fragment>
            <ModuleModal />
        </Fragment>
    )
}

export default forwardRef(ModulesModal);
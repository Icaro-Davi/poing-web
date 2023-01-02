import { useEffect, useRef, useState, forwardRef, ForwardRefRenderFunction, Fragment, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';
import { IoFlaskSharp, IoSaveSharp } from 'react-icons/io5';
import { cardsBreakpoints } from "../../Screens";
import Grid from "../../Grid";
import { ModalWrapper } from "../styled";
import { ModuleCard, ModuleCardFooter, ModuleCardHeader, ModuleCardSection } from "./styled";
import ScrollArea from "../../ScrollArea";
import LocalStorage from '../../../utils/localStorage';
import DiscordMarkdown from '../../DiscordEmbedMessage/Markdown';
import FetchWelcomeOrLeaveMemberSettings from '../../Form/WelcomeOrLeaveMember/fetchWelcomeOrLeaveMemberSettings';
import LoadWrapper from '../../Loading/LoadWrapper';
import { Button } from '../../Buttons';
import { useApp } from '../../../context/App';
import useModal from "../../../hooks/useModal";
import useBotInfo, { replaceBotVarsInString } from '../../../hooks/useBotInfo';
import { BOT } from '../../../locale/defaultBoTInfo';
import WelcomeOrLeaveMemberForm, { FormRefs } from '../../Form/WelcomeOrLeaveMember';

import type { ModalConfigType } from "../../../hooks/useModal/modal.types";
import type { WelcomeOrLeaveMemberType } from '../../../services/discord/modules/modules.types';
import type { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import type { ModulesType } from '../../../services/discord/bot/bot.types';

const DiscordEmbedMessage = dynamic(async () => import("../../DiscordEmbedMessage"));

const handleFormData = (moduleType: keyof ModulesType) => {
    const welcomeMemberSettings = LocalStorage.bot.getSettings()?.modules?.[moduleType]?.settings ?? {} as WelcomeOrLeaveMemberType;
    if (typeof welcomeMemberSettings === 'object') return welcomeMemberSettings;
}

type WelcomeOrLeaveMemberModuleModalProps = {
    title: string;
    moduleType: keyof ModulesType;
}

const WelcomeOrLeaveMemberModal: ModalComponentWrapper<WelcomeOrLeaveMemberModuleModalProps> = props => {
    const { locale } = useApp();
    const botInfo = useBotInfo();
    const formRef = useRef<FormRefs>(null);
    const [isLoading, setLoad] = useState(false);
    const [formData, setFormData] = useState<WelcomeOrLeaveMemberType | undefined>(handleFormData(props.moduleType));
    const botSettings = LocalStorage.bot.getSettings();

    const moduleSettingsWithVars: WelcomeOrLeaveMemberType = formData && JSON.parse(replaceBotVarsInString(JSON.stringify(formData), {
        ...botInfo,
        bot: { ...botInfo.bot, '@menton': `@${BOT.name}` },
    }));

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
                            {!formData?.isMessageText && (
                                <div style={{ width: '100%', height: '100%', maxHeight: 200, overflow: 'auto', backgroundColor: '#424549', padding: '.6rem' }}>
                                    <DiscordEmbedMessage
                                        borderSideColor={botSettings?.bot.messageEmbedHexColor}
                                        title={moduleSettingsWithVars?.messageEmbed?.title}
                                        description={moduleSettingsWithVars?.messageEmbed?.description}
                                        author={moduleSettingsWithVars?.messageEmbed?.author}
                                        thumbnail={moduleSettingsWithVars?.messageEmbed?.thumbnail}
                                        fields={moduleSettingsWithVars?.messageEmbed?.fields}
                                        footer={moduleSettingsWithVars?.messageEmbed?.footer}
                                    />
                                </div>
                            )}
                            {formData?.isMessageText && formData.messageText && (
                                <div style={{ width: '100%', height: '100%', maxHeight: 200, overflow: 'auto', backgroundColor: '#424549', padding: '.6rem' }}>
                                    <DiscordMarkdown>{moduleSettingsWithVars?.messageText || ''}</DiscordMarkdown>
                                </div>
                            )}
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
                                        {locale.forms.welcomeOrLeaveMember.btnTestModule}
                                    </Button>
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24, md: 5 }}>
                                    <Button
                                        icon={<IoSaveSharp />}
                                        disabled={isLoading}
                                        onClick={() => { formRef.current?.submit(); }}>
                                        {locale.forms.welcomeOrLeaveMember.btnSendSettings}
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

export interface ModulesModalRef {
    modalRef: Omit<ModalConfigType<any>, 'setContent'>;
}

const ModulesModal: ForwardRefRenderFunction<ModulesModalRef, { moduleType: keyof ModulesType; title: string }> = (props, ref) => {
    const { locale: { pages: { dashboard: { modules } } } } = useApp();
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
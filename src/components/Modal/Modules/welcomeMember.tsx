import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { IoFlaskSharp, IoSaveSharp } from 'react-icons/io5';
import { cardsBreakpoints } from "../../Screens/";
import Grid from "../../Grid";
import { ModalWrapper } from "../styled";
import { ModuleCard, ModuleCardFooter, ModuleCardHeader, ModuleCardSection } from "./styled";
import ScrollArea from "../../ScrollArea";
import LocalStorage from '../../../utils/localStorage';
import WelcomeMemberForm, { FormRefs } from '../../Form/WelcomeMember';
import { WelcomeModuleType } from '../../../services/discord/modules/modules.types';
import DiscordMarkdown from '../../DiscordEmbedMessage/Markdown';
import FetchWelcomeMemberSettings from '../../Form/WelcomeMember/fetchWelcomeMemberSettings';
const DiscordEmbedMessage = dynamic(async () => import("../../DiscordEmbedMessage"));
import LoadWrapper from '../../Loading/LoadWrapper';
import { Button } from '../../Buttons';
import { useApp } from '../../../context/App';
import type { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import useBotInfo, { replaceBotVarsInString } from '../../../hooks/useBotInfo';
import { BOT } from '../../../locale/defaultBoTInfo';

const handleFormData = () => {
    const welcomeMemberSettings = LocalStorage.bot.getSettings()?.modules?.welcomeMember?.settings ?? {} as WelcomeModuleType;
    if (typeof welcomeMemberSettings === 'object') return welcomeMemberSettings;
}

const WelcomeMemberModule: ModalComponentWrapper<{ title: string }> = props => {
    const { locale } = useApp();
    const botInfo = useBotInfo();
    const formRef = useRef<FormRefs>(null);
    const [isLoading, setLoad] = useState(false);
    const [formData, setFormData] = useState<WelcomeModuleType | undefined>(handleFormData());
    const botSettings = LocalStorage.bot.getSettings();

    const welcomeMemberWithVars: WelcomeModuleType = formData && JSON.parse(replaceBotVarsInString(JSON.stringify(formData), {
        ...botInfo,
        bot: { ...botInfo.bot, '@menton': `@${BOT.name}` },
    }));

    useEffect(() => {
        const welcomeModule = LocalStorage.bot.getSettings()?.modules?.welcomeMember;
        if (typeof welcomeModule?.settings === 'string') {
            setLoad(true);
            FetchWelcomeMemberSettings({
                onFetch(fetchData) {
                    setFormData(fetchData.settings);
                    setLoad(false);
                }
            });
        }
    }, []);

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
                                        title={welcomeMemberWithVars?.messageEmbed?.title}
                                        description={welcomeMemberWithVars?.messageEmbed?.description}
                                        author={welcomeMemberWithVars?.messageEmbed?.author}
                                        thumbnail={welcomeMemberWithVars?.messageEmbed?.thumbnail}
                                        fields={welcomeMemberWithVars?.messageEmbed?.fields}
                                        footer={welcomeMemberWithVars?.messageEmbed?.footer}
                                    />
                                </div>
                            )}
                            {formData?.isMessageText && formData.messageText && (
                                <div style={{ width: '100%', height: '100%', maxHeight: 200, overflow: 'auto', backgroundColor: '#424549', padding: '.6rem' }}>
                                    <DiscordMarkdown>{welcomeMemberWithVars?.messageText || ''}</DiscordMarkdown>
                                </div>
                            )}
                        </ModuleCardHeader>
                        <ScrollArea style={{ marginRight: '.6rem' }}>
                            <ModuleCardSection style={{ paddingRight: 0 }}>
                                <LoadWrapper isLoading={!formData}>
                                    <WelcomeMemberForm
                                        ref={formRef}
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
                                        {locale.forms.welcomeMember.btnTestModule}
                                    </Button>
                                </Grid.Row>
                                <Grid.Row breakpoints={{ xs: 24, md: 5 }}>
                                    <Button
                                        icon={<IoSaveSharp />}
                                        disabled={isLoading}
                                        onClick={() => { formRef.current?.submit(); }}>
                                        {locale.forms.welcomeMember.btnSendSettings}
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

export default WelcomeMemberModule;
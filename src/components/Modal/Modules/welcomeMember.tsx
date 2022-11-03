import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { cardsBreakpoints } from "../../../pages/[locale]";
import Grid from "../../Grid";
import { ModalWrapper } from "../styled";
import { ModuleCard, ModuleCardFooter, ModuleCardHeader, ModuleCardSection } from "./styled";
import ScrollArea from "../../ScrollArea";
import LocalStorage from '../../../utils/localStorage';
import { useAuth } from '../../../context/Auth';
import SubmitButton from '../../Form/items/SubmitButton';
import WelcomeMemberForm, { FormRefs } from '../../Form/WelcomeMember';
import { WelcomeModuleType } from '../../../services/discord/modules/modules.types';
import DiscordMarkdown from '../../DiscordEmbedMessage/Markdown';
import FetchWelcomeMemberSettings from '../../Form/WelcomeMember/fetchWelcomeMemberSettings';
const DiscordEmbedMessage = dynamic(async () => import("../../DiscordEmbedMessage"));

import type { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import LoadWrapper from '../../Loading/LoadWrapper';

const WelcomeMemberModule: ModalComponentWrapper<{ title: string }> = props => {
    const { user } = useAuth();
    const formRef = useRef<FormRefs>(null);
    const [isLoading, setLoad] = useState(false);
    const [formData, setFormData] = useState<WelcomeModuleType>();
    const botSettings = LocalStorage.bot.getSettings();

    useEffect(() => {
        const welcomeModule = LocalStorage.bot.getSettings()?.modules.welcomeMember;
        if (typeof welcomeModule?.settings !== 'string') {
            setFormData(welcomeModule?.settings);
        } else {
            setLoad(true);
            FetchWelcomeMemberSettings({
                onFetch(fetchData) {
                    setTimeout(() => {
                        setFormData(fetchData.settings)
                        setLoad(false);
                    }, 5000)
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
                                        title="taiada#0225 | Bem-vindo(a)!"
                                        description='Olá, seja bem-vindo(a) ao Tennos de Mallondria!'
                                        author={{
                                            name: 'Icaro Davi',
                                            picture: `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`
                                        }}
                                        thumbnail={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`}
                                        fields={[
                                            {
                                                name: '👋 Sabia que...',
                                                value: 'Você é o 154º membro aqui no clã?',
                                                inline: true
                                            },
                                            { name: '🛡 Tag do Usuário', value: '**```taiada#0225```** (860547659903008778)', inline: true },
                                            { name: '📛 Precisando de ajuda?', value: 'Caso você tenha alguma dúvida ou problema, chame a nossa equipe!', inline: true },
                                            { name: '👮 Evite punições!', value: 'Leia as nossas <#1234123123123> para evitar ser punido no servidor!', inline: false },
                                        ]}
                                        footer='Tennos de Mallondria • © Todos os direitos reservados.'
                                    />
                                </div>
                            )}
                            {formData?.isMessageText && formData.messageText && (
                                <div style={{ width: '100%', height: '100%', maxHeight: 200, overflow: 'auto', backgroundColor: '#424549', padding: '.6rem' }}>
                                    <DiscordMarkdown>{formData?.messageText || ''}</DiscordMarkdown>
                                </div>
                            )}
                        </ModuleCardHeader>
                        <ScrollArea style={{ marginRight: '.6rem' }}>
                            <ModuleCardSection style={{ paddingRight: 0 }}>
                                <LoadWrapper isLoading={!formData}>
                                    <WelcomeMemberForm
                                        ref={formRef}
                                        onSubmitEnd={() => { setLoad(false) }}
                                        onChangeFields={formData ? setFormData : () => { }}
                                        initialDataForm={formData}
                                    />
                                </LoadWrapper>
                            </ModuleCardSection>
                        </ScrollArea>
                        <ModuleCardFooter >
                            <SubmitButton onClick={() => { setLoad(true); formRef.current?.submit(); }} style={{ marginTop: 0 }} isLoading={isLoading} label="Enviar" />
                        </ModuleCardFooter>
                    </ModuleCard>
                </Grid.Row>
            </Grid>
        </ModalWrapper>
    );
}

export default WelcomeMemberModule;
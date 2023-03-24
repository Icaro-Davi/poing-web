import { useEffect, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';

import { useApp } from "../../../context/App";
import DiscordBotService from "../../../services/discord/bot";
import BaseError from "../../../utils/error/baseError";
import LocalStorage from "../../../utils/localStorage";
import Card from '../../Card';
import LoadWrapper from "../../Loading/LoadWrapper";
import Notification from "../../Notification";
import { Title } from "../../Typography";
import SubmitButton from "../items/SubmitButton";
import FormElements from "./Form";

import type { FC } from "react";
import type { GuildSettingsType } from "../../../services/discord/bot/bot.types";
import type { GetReference } from "../../../utils/general.types";
import useChannels from "../../../hooks/Discord/useChannels";

type BotFields = GetReference<GuildSettingsType, 'bot'>;

const PoingSettingsForm: FC = () => {
    const { store, locale } = useApp();
    const methods = useForm<BotFields>({
        defaultValues: LocalStorage.bot.getSettings()?.bot,
        mode: 'all'
    });
    const channels = useChannels(store.selectedGuildId);
    const discordPoingColorTheme = methods.watch('messageEmbedHexColor');
    const [isLoading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<BotFields> = async (data, event) => {
        try {
            setLoading(true);
            await DiscordBotService.updateGuildSettingsById(store.selectedGuildId, data);
            const oldSettings = LocalStorage.bot.getSettings();
            oldSettings && LocalStorage.bot.setSettings({ ...oldSettings, bot: data });
            Notification.open({
                type: 'success',
                ...locale.notifications.success.bot.updateSettings,
            });
        } catch (error) {
            new BaseError({
                origin: 'src.components.Form.PoingSettingsForm.onSubmit',
                message: 'Failed update settings',
                error, locale,
                callback({ notifications }) {
                    Notification.open({
                        type: 'error',
                        ...notifications.error.bot.updateSettings
                    });
                }
            });
        } finally {
            setLoading(false);
        }
    }

    const reset = methods.reset;
    useEffect(() => {
        reset(LocalStorage.bot.getSettings()?.bot);
    }, [reset, channels.channels]);

    return (
        <LoadWrapper isLoading={(!Object.keys(methods.getValues()).length && !channels.channels?.length) || channels.isLoading}>
            <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(onSubmit)}>
                <FormProvider {...methods}>
                    <Card style={{ borderColor: discordPoingColorTheme }}>
                        <Title level='2' stroke={{ strokeColor: discordPoingColorTheme }} style={{ paddingBottom: '1rem', textAlign: 'center' }}>{locale.forms.poingSettings.title}</Title>
                        {!!Object.keys(methods.getValues()).length && (
                            <FormElements
                                locale={locale}
                                channels={
                                    channels.channels
                                        ?.filter(channel => channel.type === 'GUILD_TEXT')
                                        ?.map(channel => ({ label: channel.name ?? `ID: ${channel.id}`, key: channel.id })) ?? []
                                }
                            />
                        )}
                        <SubmitButton label={locale.forms.poingSettings.submitButtonLabel} isLoading={isLoading} />
                    </Card>
                </FormProvider>
            </form>
        </LoadWrapper>
    );
}

export default PoingSettingsForm;
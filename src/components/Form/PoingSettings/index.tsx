import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

import { useApp } from "../../../context/App";
import LocalStorage from "../../../utils/localStorage";
import LoadWrapper from "../../Loading/LoadWrapper";
import fetchGuild from "./FetchGuild";
import FormElements from "./Form";
import SubmitButton from "../items/SubmitButton";
import Card from '../../Card';
import DiscordBotService from "../../../services/discord/bot";
import Notification from "../../Notification";
import { Title } from "../../Typography";
import BaseError from "../../../utils/error/baseError";

import type { FC } from "react";
import type { GuildSettingsType } from "../../../services/discord/bot/bot.types";
import type { GetReference } from "../../../utils/general.types";

type BotFields = GetReference<GuildSettingsType, 'bot'>;

const PoingSettingsForm: FC = () => {
    const { store, locale } = useApp();
    const { register, handleSubmit, getValues, reset, formState, watch, setValue } = useForm<BotFields>({
        defaultValues: LocalStorage.bot.getSettings()?.bot,
        mode: 'all'
    });
    const discordPoingColorTheme = watch('messageEmbedHexColor');
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

    useEffect(() => {
        fetchGuild({
            fetchSettings: true,
            guildId: store.selectedGuildId,
            dispatch: reset,
        });
    }, [store.selectedGuildId, reset]);

    return (
        <LoadWrapper isLoading={!Object.keys(getValues()).length}>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                <Card style={{ borderColor: discordPoingColorTheme }}>
                    <Title level='2' stroke={{ strokeColor: discordPoingColorTheme }} style={{ paddingBottom: '1rem', textAlign: 'center' }}>{locale.forms.poingSettings.title}</Title>
                    {!!Object.keys(getValues()).length && <FormElements {...{ register, formState, watch, setValue, locale }} />}
                    <SubmitButton label={locale.forms.poingSettings.submitButtonLabel} isLoading={isLoading} />
                </Card>
            </form>
        </LoadWrapper>
    );
}

export default PoingSettingsForm;
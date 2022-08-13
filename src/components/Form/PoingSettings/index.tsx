import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

import type { GuildSettingsType } from "../../../services/discord/bot/bot.types";
import type { GetReference } from "../../../utils/general.types";
import { useApp } from "../../../context/App";
import LocalStorage from "../../../utils/localStorage";
import LoadWrapper from "../../Loading/LoadWrapper";
import fetchGuild from "./FetchGuild";
import FormElements from "./Form";
import SubmitButton from "./SubmitButton";
import Card from '../../Card';
import DiscordBotService from "../../../services/discord/bot";
import Notification from "../../Notification";

type BotFields = GetReference<GuildSettingsType, 'bot'>;

const PoingSettingsForm: FC = () => {
    const { store } = useApp();
    const { register, handleSubmit, getValues, reset, formState, watch, setValue } = useForm<BotFields>({
        defaultValues: LocalStorage.bot.getSettings()?.bot,
        mode: 'all'
    });
    const borderColor = watch('messageEmbedHexColor');

    const onSubmit: SubmitHandler<BotFields> = async (data, event) => {
        try {
            await DiscordBotService.updateGuildSettingsById(store.selectedGuildId, data);
            Notification.open({
                title: 'Sucesso ಇ( ꈍᴗꈍ)ಇ',
                description: 'Salvei as suas novas configurações.',
                type: 'success',
            });
        } catch (error) {
            Notification.open({
                title: 'Erro ლ(ಥ益ಥლ)',
                description: 'Ocorreu um erro ao tentar atualizar as configurações do bot.',
                type: 'error',
            });
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGuild({
            fetchSettings: store.selectedGuildId !== LocalStorage.bot.getSettings()?._id,
            guildId: store.selectedGuildId,
            dispatch: reset,
        });
    }, [store.selectedGuildId]);

    return (
        <LoadWrapper isLoading={!getValues()}>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                <Card style={{ borderColor }}>
                    <FormElements {...{ register, formState, watch, setValue }} />
                    <SubmitButton />
                </Card>
            </form>
        </LoadWrapper>
    );
}

export default PoingSettingsForm;
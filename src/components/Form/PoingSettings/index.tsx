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

type BotFields = Omit<GetReference<GuildSettingsType, 'bot'>, 'roles'>;

const PoingSettingsForm: FC = () => {
    const { store } = useApp();
    const { register, handleSubmit, getValues, reset, formState, watch, setValue } = useForm<BotFields>({
        defaultValues: LocalStorage.bot.getSettings()?.bot,
        mode: 'all'
    });
    const borderColor = watch('messageEmbedHexColor');

    const onSubmit: SubmitHandler<any> = data => { console.log(data) }

    useEffect(() => {
        fetchGuild({ dispatch: reset, fetchSettings: !Object.keys(getValues()).length, guildId: store.selectedGuildId });
    }, []);

    return (
        <LoadWrapper isLoading={!getValues()} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card style={{ borderColor }}>
                    <FormElements {...{ register, formState, watch, setValue }} />
                    <SubmitButton />
                </Card>
            </form>
        </LoadWrapper>
    );
}

export default PoingSettingsForm;
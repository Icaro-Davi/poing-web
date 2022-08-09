import type { UseFormReset } from 'react-hook-form';
import type { GuildSettingsType } from "../../../services/discord/bot/bot.types";
import type { GetReference } from '../../../utils/general.types';
import DiscordBotService from "../../../services/discord/bot";
import LocalStorage from "../../../utils/localStorage";

type BotFields = GetReference<GuildSettingsType, 'bot'>;

function fetchGuild(options: { guildId: string; fetchSettings: boolean; dispatch: UseFormReset<BotFields> }) {
    options.fetchSettings && DiscordBotService
        .getGuildSettingsById(options.guildId)
        .then(guild => {
            if (guild) {
                LocalStorage.bot.setSettings(guild);
                options.dispatch(guild.bot);
            }
        })
        .catch(error => console.error(`[FORM ERROR] Error on fetch guild settings`, error));
}

export default fetchGuild;
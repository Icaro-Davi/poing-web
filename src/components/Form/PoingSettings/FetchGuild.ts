import type { UseFormReset } from 'react-hook-form';
import type { GuildSettingsType } from "../../../services/discord/bot/bot.types";
import type { GetReference } from '../../../utils/general.types';
import DiscordBotService from "../../../services/discord/bot";
import LocalStorage from "../../../utils/localStorage";
import BaseError from '../../../utils/error/baseError';
import Notification from '../../Notification';

type BotFields = GetReference<GuildSettingsType, 'bot'>;

function fetchGuild(options: { guildId: string; fetchSettings: boolean; dispatch: UseFormReset<BotFields> }) {
    const botSettings = LocalStorage.bot.getSettings();
    if ((botSettings && (!botSettings?.nextFetch || botSettings.nextFetch < Date.now())) || !botSettings)
        options.fetchSettings && DiscordBotService
            .getGuildSettingsById(options.guildId)
            .then(guild => {
                if (guild) {
                    LocalStorage.bot.setSettings(guild, { updateFetchDate: true });
                    options.dispatch(guild.bot);
                }
            })
            .catch(error => {
                new BaseError({
                    origin: 'components.Form.PoingSettings.fetchGuild',
                    message: 'Error on fetch guild settings',
                    error,
                    callback({ notifications }) {
                        Notification.open({
                            type: 'error',
                            ...notifications.error.bot.getSettings
                        });
                    }
                })
            });
}

export default fetchGuild;
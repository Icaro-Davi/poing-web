import DiscordBotService from "../../services/discord/bot";
import BaseError from '../../utils/error/baseError';
import Notification from '../../components/Notification';

async function fetchGuild(options: { guildId: string; fetchSettings: boolean }) {
    await DiscordBotService
        .getGuildSettingsById(options.guildId)
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
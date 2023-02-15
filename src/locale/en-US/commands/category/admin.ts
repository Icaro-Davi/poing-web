import { BOT } from "../../../defaultBoTInfo";
import COMMAND_CATEGORY from "../categories";
import STATIC_ARGUMENT from "../staticArguments";

import LocaleCommandType from "../../../types/command";

const ADMIN_COMMANDS: LocaleCommandType[] = [
    {
        name: 'anonymous-direct-message',
        category: COMMAND_CATEGORY.admin,
        description: 'Send a message anonymously to a member of the server through me.',
        usage: [
            `${BOT.prefix}anonymous-direct-message ${STATIC_ARGUMENT.member.name}* ${STATIC_ARGUMENT.message.name}*`
        ],
        aliases: [`${BOT.prefix}adm`],
        args: [STATIC_ARGUMENT.member.description, STATIC_ARGUMENT.message.description],
        examples: [
            [
                `${BOT.prefix}anonymous-direct-message @${BOT.name} Hi, how are you?`,
                `Send a private message to the member ${BOT.name}.`,
            ],
        ]
    }
]

export default ADMIN_COMMANDS;
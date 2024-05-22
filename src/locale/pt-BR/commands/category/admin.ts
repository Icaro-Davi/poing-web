import { BOT } from "../../../defaultBoTInfo";
import COMMAND_CATEGORY from "../categories";
import STATIC_ARGUMENT from "../staticArguments";

import LocaleCommandType from "../../../types/command";

const ADMIN_COMMANDS: LocaleCommandType[] = [
    {
        name: 'anonymous-direct-message',
        category: COMMAND_CATEGORY.admin,
        description: 'Envia uma mensagem anonimamente para um membro do server através de mim.',
        usage: [
            `${BOT.prefix}anonymous-direct-message ${STATIC_ARGUMENT.member.name}* ${STATIC_ARGUMENT.message.name}*`
        ],
        aliases: [`${BOT.prefix}adm`],
        args: [STATIC_ARGUMENT.member.description, STATIC_ARGUMENT.message.description],
        examples: [
            [
                `${BOT.prefix}anonymous-direct-message @${BOT.name} Oi você quer pular pelo meu servidor?`,
                `Envia uma mensagem privada para o membro ${BOT.name}.`,
            ],
        ]
    }
]

export default ADMIN_COMMANDS;
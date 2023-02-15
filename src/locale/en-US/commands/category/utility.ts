import Argument from "../../../argument";
import { BOT } from "../../../defaultBoTInfo";
import MDHelper from "../../../markdown";
import LocaleCommandType from "../../../types/command";
import COMMAND_CATEGORY from "../categories";
import STATIC_ARGUMENT from "../staticArguments";

const UTILITY_COMMANDS: LocaleCommandType[] = [
    {
        name: 'info',
        category: COMMAND_CATEGORY.utility,
        description: 'Member information.',
        usage: [`${BOT.prefix}info ${new MDHelper('<member>').codeLineB().get()}* ${STATIC_ARGUMENT.member.name}*`],
        args: [
            [Argument.staticArgSymbol, '<member>', 'Static argument to indicate that the next argument is a member.'],
            STATIC_ARGUMENT.member.description,
        ],
        examples: [
            [`${BOT.prefix}info member @${BOT.name}`, `I will return information about the member @${BOT.name}.`]
        ]
    },
    {
        name: 'get-members-status',
        category: COMMAND_CATEGORY.utility,
        description: 'Will return the amount of online, away, do not disturb and offline players.',
        usage: [`${BOT.prefix}get-members-status`],
        aliases: [`${BOT.prefix}gms`, `${BOT.prefix}guildMembers`],
        examples: [
            [`${BOT.prefix}get-members-status`, 'Returns a message with information regarding the number of members per guild status.']
        ]
    },
    {
        name: 'help',
        category: COMMAND_CATEGORY.utility,
        description: 'Show the list of commands.',
        usage: [`${BOT.prefix}help ${STATIC_ARGUMENT.command.name}*`, `${BOT.prefix}help ${new MDHelper('<list>').codeLineB().get()}`],
        aliases: [`${BOT.prefix}h`],
        args: [
            STATIC_ARGUMENT.command.description,
            [Argument.staticArgSymbol, '<list>', 'List all available commands.'],
        ],
        examples: [
            [`${BOT.prefix}help help`, 'Get detailed information about the command help.'],
            [`${BOT.prefix}h list`, `List all available commands.`]
        ]
    },
    {
        name: 'ping',
        category: COMMAND_CATEGORY.utility,
        description: 'Server response time in milliseconds.',
        usage: [`${BOT.prefix}ping`],
        aliases: [`${BOT.prefix}p`],
        examples: [
            [`${BOT.prefix}ping`, 'Return the server response time.']
        ]
    }
]

export default UTILITY_COMMANDS;
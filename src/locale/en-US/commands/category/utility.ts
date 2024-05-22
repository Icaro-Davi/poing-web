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
    },
    {
        name: 'embed',
        category: COMMAND_CATEGORY.utility,
        description: 'Creates an embed message.',
        usage: [`${BOT.prefix}embed ${new MDHelper('(--title|--desc|--thumb|--field_title|--field_value|--field_title_inline|--field_value_inline|--footer)').codeLineB().get()}`],
        args: [
            Argument.create('FLAG', 'title', 'Message title.'),
            Argument.create('FLAG', 'desc', 'Message description.'),
            Argument.create('FLAG', 'thumb', 'Thumbnail must be a valid URL.', '--thumb|-tb'),
            Argument.create('FLAG', 'field_title', 'Title of a field in a sigle line (For each "field_title" you will need a "field_value")', '--field_title|-fv'),
            Argument.create('FLAG', 'field_value', 'Description of a field in a single line (For each "field_value" you will need a "field_title")', '--field_title|-fv'),
            Argument.create('FLAG', 'field_title_inline', 'Title of a field split in a line with other fields (For each "field_title_inline" you will need a "field_value_inline")', '--field_title_inline|-fti'),
            Argument.create('FLAG', 'field_value_inline', 'Description of a field split in a line with other fields (For each "field_value_inline" you will need a "field_title_inline")', '--field_value_inline|-fvi'),
            Argument.create('FLAG', 'footer', 'Message footer'),
        ],
        examples: [
            [`${BOT.prefix}embed -t "Hello" -d "I'm ${BOT.name}" -tb "https://media.tenor.com/NBDZyvHqv9wAAAAC/poring-ragnarok.gif" -ft "Do you like me UwU ?" -fv "Then why didn't you invite me to your server ? :c"`, "Creates an embed message with a title, a description, a footer and 2 fields in the same line."],
            [`${BOT.prefix}embed -t "Hello" -d "World" -f "Message footer" -fti "Title 1" -fvi "Description 1" -ft "Title 2" -fv "Description 2"`, "Creates an embed message with a title, a description, a footer and 2 fields in the same line."],
        ]
    }
]

export default UTILITY_COMMANDS;
import Argument from "../../../argument";
import MDHelper from "../../../markdown";
import COMMAND_CATEGORY from "../categories";
import STATIC_ARGUMENT from "../staticArguments";
import { BOT } from "../../../defaultBoTInfo";

import LocaleCommandType from "../../../types/command";

const MODERATION_COMMANDS: LocaleCommandType[] = [
    {
        name: 'ban',
        category: COMMAND_CATEGORY.moderation,
        description: 'Ban a member and they cannot come back until removed from the banned list.',
        usage: [
            `${BOT.prefix}ban ${STATIC_ARGUMENT.member.name}* ${new MDHelper('(--days "Number")').codeLineB().get()} ${new MDHelper('(--reason "Text")').codeLineB().get()}`,
            `${BOT.prefix}ban ${new MDHelper('<list>').codeLineB().get()}`
        ],
        args: [
            STATIC_ARGUMENT.member.description,
            [Argument.staticArgSymbol, '<list>', 'This is a static argument and list banned members.'],
            [Argument.flagSymbol, '(--days "Number"|-d "Number")', 'Numbers of days between "1 and 7" representing messages that will be deleted, default value is 0.'],
            [Argument.flagSymbol, '(--reason "Text"|-r "Text")', 'The reason for the ban.']
        ],
        examples: [
            [`${BOT.prefix}ban list`, 'List banned members.'],
            [`${BOT.prefix}ban @${BOT.name} --days "7"`, `The "days" flag can be used ${new MDHelper('(--days|-d)').codeLineB().get()} after the value in double quotes.`],
            [`${BOT.prefix}ban @${BOT.name} --reason "${BOT.name} ban reason example."`, `Member ${BOT.name} was banned for a reason.`],
        ]
    },
    {
        name: 'kick',
        category: COMMAND_CATEGORY.moderation,
        description: 'Kick a member.',
        usage: [
            `${BOT.prefix}kick ${STATIC_ARGUMENT.member.name}* ${new MDHelper('[Reason]').codeLineB().get()}`
        ],
        args: [
            STATIC_ARGUMENT.member.description,
            [Argument.argSymbol, '[Reason]', `Saves the reason the member was kicked.`]
        ],
        examples: [
            [`${BOT.prefix}kick @${BOT.name}`, `Remove member ${BOT.name}.`],
            [`${BOT.prefix}kick @${BOT.name} Bye bye`, `Member ${BOT.name} removed with a reason.`],
        ]
    },
    {
        name: 'mute',
        category: COMMAND_CATEGORY.moderation,
        description: 'Mute a member.',
        usage: [
            `${BOT.prefix}mute ${STATIC_ARGUMENT.member.name}* ${new MDHelper('[Time<M|H|D>]').codeLineB().get()} ${new MDHelper('[Reason]').codeLineB().get()}`,
            `${BOT.prefix}mute addrole ${new MDHelper('[@Role|RoleId]').codeLineB().get()}* `,
            `${BOT.prefix}mute list`,
        ],
        args: [
            STATIC_ARGUMENT.member.description,
            [Argument.argSymbol, '[addrole]', `Add the argument ${new MDHelper('[addrole]').codeLineB().get()}, second argument is ${new MDHelper('[mention a member "@Role" or memberId "123456789" ]').codeLineB().get()}.`],
            [Argument.argSymbol, '[list]', 'List the 50 members closest to ending the punishment.'],
            [Argument.argSymbol, '[Time]', 'Duration can be used by entering a number and then M for minutes, H for hours and D for days.'],
            [Argument.argSymbol, '[Reason]', 'Reason for muting a member.']
        ],
        examples: [
            [`${BOT.prefix}mute @${BOT.name}`, `Member @${BOT.name} mutated.`],
            [`${BOT.prefix}mute addrole [@Role|RoleId]`, 'Necessary to be able to mute a member.'],
            [`${BOT.prefix}mute list`, 'List muted members.'],
            [`${BOT.prefix}mute @${BOT.name} 10M`, `Member @${BOT.name} muted for 10 minutes.`],
            [`${BOT.prefix}mute @${BOT.name} Reason for mute.`, `Member ${BOT.name} muted indefinitely with a reason.`],
        ]
    },
    {
        name: 'remove-messages',
        category: COMMAND_CATEGORY.moderation,
        description: 'Delete messages up to 2 weeks old.',
        usage: [
            `${BOT.prefix}remove-messages ${STATIC_ARGUMENT.quantity.name}*`
        ],
        aliases: [
            `${BOT.prefix}rm`
        ],
        args: [STATIC_ARGUMENT.quantity.description],
        examples: [
            [`${BOT.prefix}remove-messages 10`, 'Removes the first 10 most recent messages sent within a 2 week period.']
        ]
    },
    {
        name: 'unban',
        category: COMMAND_CATEGORY.moderation,
        description: 'Unban a member.',
        usage: [`${BOT.prefix}unban ${new MDHelper('[MemberId]').codeLineB().get()}* ${new MDHelper('[Reason]').codeLineB().get()}`],
        args: [
            [Argument.argSymbol, '[MemberId]', 'MemberId that will be removed from the banned list.'],
            [Argument.argSymbol, '[Reason]', 'Reason removing member from banned list.']
        ],
        examples: [
            [`${BOT.prefix}unban 123456789`, 'MemberId 123456789 has been unbanned.'],
            [`${BOT.prefix}unban 123456789 Reason for unbanning`, 'Remove member from banned list with reason for action.']
        ]
    }
]

export default MODERATION_COMMANDS;
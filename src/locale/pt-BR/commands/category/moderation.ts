import Argument from "../../../argument";
import MDHelper from "../../../markdown";
import COMMAND_CATEGORY from "../categories";
import STATIC_ARGUMENT from "../staticArguments";
import { BOT } from "../../../defaultBoTInfo";

import type{ BotCommandType } from "../../../index.type";

const MODERATION_COMMANDS: BotCommandType[] = [
    {
        name: 'ban',
        category: COMMAND_CATEGORY.moderation,
        description: 'Bane um membro e ele não poderá voltar até ser removido da lista de banidos.',
        usage: [
            `${BOT.prefix}ban ${STATIC_ARGUMENT.member.name}* ${new MDHelper('(--days "Number")').codeLineB().get()} ${new MDHelper('(--reason "Text")').codeLineB().get()}`,
            `${BOT.prefix}ban ${new MDHelper('<list>').codeLineB().get()}`
        ],
        args: [
            STATIC_ARGUMENT.member.description,
            `${Argument.staticArgSymbol} ${new MDHelper('<list>').codeLineB().get()} - Este é um argumento estático e lista os membros banidos.`,
            `${Argument.flagSymbol} ${new MDHelper('(--days "Número"|-d "Número")').codeLineB().get()} - Número de dias entre "1 e 7" que representa as mensagens que serão deletadas, valor padrão é 0.`,
            `${Argument.flagSymbol} ${new MDHelper('(--reason "Texto"|-r "Texto")').codeLineB().get()} - A razão do banimento.`
        ],
        examples: [
            `${new MDHelper(`${BOT.prefix}ban list`).codeLineB().get()} - Lista com todos os banidos.`,
            `${new MDHelper(`${BOT.prefix}ban @${BOT.name} --days "7"`).codeLineB().get()} - A flag de days pode ser utilizada ${new MDHelper('(--days|-d)').codeLineB().get()} em seguida o valor entre aspas duplas.`,
            `${new MDHelper(`${BOT.prefix}ban @${BOT.name} --reason "${BOT.name} está distraindo os membros do servidor."`).codeLineB().get()} - O membro ${BOT.name} foi banido com um motivo.`,
        ]
    },
    {
        name: 'kick',
        category: COMMAND_CATEGORY.moderation,
        description: 'Remove um membro.',
        usage: [
            `${BOT.prefix}kick ${STATIC_ARGUMENT.member.name}* ${new MDHelper('[Motivo]').codeLineB().get()}`
        ],
        args: [
            STATIC_ARGUMENT.member.description,
            `${Argument.argSymbol} ${new MDHelper('[Motivo]').codeLineB().get()} - Salva o motivo pela qual o membro foi kickado.`
        ],
        examples: [
            `${new MDHelper(`${BOT.prefix}kick @${BOT.name}`).codeLineB().get()} - O membro ${BOT.name} for removido.`,
            `${new MDHelper(`${BOT.prefix}kick @${BOT.name} Ele está pulando pelo servidor!`).codeLineB().get()} - O membro ${BOT.name} for removido e foi adicionado um motivo para isso.`,
        ]
    },
    {
        name: 'mute',
        category: COMMAND_CATEGORY.moderation,
        description: 'Muta um membro do servidor.',
        usage: [
            `${BOT.prefix}mute ${STATIC_ARGUMENT.member.name}* ${new MDHelper('[Tempo<M|H|D>]').codeLineB().get()} ${new MDHelper('[Motivo]').codeLineB().get()}`,
            `${BOT.prefix}mute addrole ${new MDHelper('[@Cargo|CargoID]').codeLineB().get()}* `,
            `${BOT.prefix}mute list`,
        ],
        args: [
            STATIC_ARGUMENT.member.description,
            `${Argument.argSymbol} ${new MDHelper('[addrole]').codeLineB().get()} - Adicione o argumento ${new MDHelper('[addrole]').codeLineB().get()} em seguida o cargo que deseja adicionar podendo ser ${new MDHelper('[Mencionar um cargo "@Cargo" ou usar o ID do cargo "123456789"]').codeLineB().get()}.`,
            `${Argument.argSymbol} ${new MDHelper('[list]').codeLineB().get()} - Lista os 50 membros mais próximos de acabar a punição.`,
            `${Argument.argSymbol} ${new MDHelper('[Tempo]').codeLineB().get()} - A duração pode ser usado informando um número e em seguida com M para minutos, H para horas e D para dias.`,
            `${Argument.argSymbol} ${new MDHelper('[Motivo]').codeLineB().get()} - Motivo para mutar o membro.`
        ],
        examples: [
            `${new MDHelper(`${BOT.prefix}mute @${BOT.name}`).codeLineB().get()} - Muta o membro @${BOT.name}.`,
            `${new MDHelper(`${BOT.prefix}mute addrole [@Cargo|CargoID]`).codeLineB().get()} - Necessário para poder mutar um membro, o membro ao ser mutado será adicionado esse cargo como punição.`,
            `${new MDHelper(`${BOT.prefix}mute list`).codeLineB().get()} -  Lista os membros mutados.`,
            `${new MDHelper(`${BOT.prefix}mute @${BOT.name} 10M`).codeLineB().get()} - O membro @Poing foi mutado por 10 Minutos`,
            `${new MDHelper(`${BOT.prefix}mute @${BOT.name} Não para de pular na frente dos membros.`).codeLineB().get()} - Vai mutar o Poing por tempo indeterminado, com um motivo/razão.`
        ]
    },
    {
        name: 'remove-messages',
        category: COMMAND_CATEGORY.moderation,
        description: 'Deleto mensagens que foram enviadas em até 2 semanas.',
        usage: [
            `${BOT.prefix}remove-messages ${STATIC_ARGUMENT.quantity.name}*`
        ],
        aliases: [
            `${BOT.prefix}rm`
        ],
        args: [STATIC_ARGUMENT.quantity.description],
        examples: [
            `${new MDHelper(`${BOT.prefix}remove-messages 10`).codeLineB().get()} - Remove as 10 primeiras mensagens mais recentes que foram enviadas em até 2 semanas.`
        ]
    },
    {
        name: 'unban',
        category: COMMAND_CATEGORY.moderation,
        description: 'Retira o banimento de um membro.',
        usage: [`${BOT.prefix}unban ${new MDHelper('[MembroID]').codeLineB().get()}* ${new MDHelper('[Motivo]').codeLineB().get()}`],
        args: [
            `${Argument.argSymbol} ${new MDHelper('[MembroID]').codeLineB().get()} - ID do membro que será removido da lista de banidos.`,
            `${Argument.argSymbol} ${new MDHelper('[Motivo]').codeLineB().get()} - Motivo que está removendo membro da lista de banidos.`,
        ],
        examples: [
            `${new MDHelper(`${BOT.prefix}unban 123456789`).codeLineB().get()} - Agora o membro de ID 123456789 pode ser convidado novamente.`,
            `${new MDHelper(`${BOT.prefix}unban 123456789 Pagou propina para o admin`).codeLineB().get()} - Remove membro da lista de banidos com o motivo da ação.`,
        ]
    }
]

export default MODERATION_COMMANDS;
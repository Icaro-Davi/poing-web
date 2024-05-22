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
        description: 'Bane um membro e ele não poderá voltar até ser removido da lista de banidos.',
        usage: [
            `${BOT.prefix}ban ${STATIC_ARGUMENT.member.name}* ${new MDHelper('(--days "Number")').codeLineB().get()} ${new MDHelper('(--reason "Text")').codeLineB().get()}`,
            `${BOT.prefix}ban ${new MDHelper('<list>').codeLineB().get()}`
        ],
        args: [
            STATIC_ARGUMENT.member.description,
            [Argument.staticArgSymbol, '<list>', 'Este é um argumento estático e lista os membros banidos.'],
            [Argument.flagSymbol, '(--days "Número"|-d "Número")', 'Número de dias entre "1 e 7" que representa as mensagens que serão deletadas, valor padrão é 0.'],
            [Argument.flagSymbol, '(--reason "Texto"|-r "Texto")', 'A razão do banimento.']
        ],
        examples: [
            [`${BOT.prefix}ban list`, 'Lista com todos os banidos.'],
            [`${BOT.prefix}ban @${BOT.name} --days "7"`, `A flag de days pode ser utilizada ${new MDHelper('(--days|-d)').codeLineB().get()} em seguida o valor entre aspas duplas.`],
            [`${BOT.prefix}ban @${BOT.name} --reason "${BOT.name} está distraindo os membros do servidor."`, `O membro ${BOT.name} foi banido com um motivo.`],
        ]
    },
    {
        name: 'kick',
        category: COMMAND_CATEGORY.moderation,
        description: 'Remove um membro.',
        usage: [
            `${BOT.prefix}kick ${STATIC_ARGUMENT.member.name}* ${new MDHelper('[Motivo]').codeLineB().get()}`,
            `${BOT.prefix}kick mass`
        ],
        args: [
            STATIC_ARGUMENT.member.description,
            [Argument.argSymbol, '[Motivo]', `Salva o motivo pela qual o membro foi kickado.`],
            Argument.create('STATIC', 'mass', 'Irá remover vários membros de uma só vez, cria uma mensagem interativa para preencher as informações necessárias.')
        ],
        examples: [
            [`${BOT.prefix}kick @${BOT.name}`, `O membro ${BOT.name} for removido.`],
            [`${BOT.prefix}kick @${BOT.name} Ele está pulando pelo servidor!`, `O membro ${BOT.name} for removido e foi adicionado um motivo para isso.`],
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
            [Argument.staticArgSymbol, '<addrole>', `Adicione o argumento ${new MDHelper('[addrole]').codeLineB().get()} em seguida o cargo que deseja adicionar podendo ser ${new MDHelper('[Mencionar um cargo "@Cargo" ou usar o ID do cargo "123456789"]').codeLineB().get()}.`],
            [Argument.staticArgSymbol, '<list>', 'Lista os 50 membros mais próximos de acabar a punição.'],
            [Argument.argSymbol, '[Tempo]', 'A duração pode ser usado informando um número e em seguida com M para minutos, H para horas e D para dias.'],
            [Argument.argSymbol, '[Motivo]', 'Motivo para mutar o membro.']
        ],
        examples: [
            [`${BOT.prefix}mute @${BOT.name}`, `Muta o membro @${BOT.name}.`],
            [`${BOT.prefix}mute addrole [@Cargo|CargoID]`, 'Necessário para poder mutar um membro, o membro ao ser mutado será adicionado esse cargo como punição.'],
            [`${BOT.prefix}mute list`, 'Lista os membros mutados.'],
            [`${BOT.prefix}mute @${BOT.name} 10M`, `O membro @${BOT.name} foi mutado por 10 Minutos`],
            [`${BOT.prefix}mute @${BOT.name} Não para de pular na frente dos membros.`, `Vai mutar o ${BOT.name} por tempo indeterminado, com um motivo/razão.`],
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
            [`${BOT.prefix}remove-messages 10`, 'Remove as 10 primeiras mensagens mais recentes que foram enviadas em até 2 semanas.']
        ]
    },
    {
        name: 'unban',
        category: COMMAND_CATEGORY.moderation,
        description: 'Retira o banimento de um membro.',
        usage: [`${BOT.prefix}unban ${new MDHelper('[MembroID]').codeLineB().get()}* ${new MDHelper('[Motivo]').codeLineB().get()}`],
        args: [
            [Argument.argSymbol, '[MembroID]', 'ID do membro que será removido da lista de banidos.'],
            [Argument.argSymbol, '[Motivo]', 'Motivo que está removendo membro da lista de banidos.']
        ],
        examples: [
            [`${BOT.prefix}unban 123456789`, 'Agora o membro de ID 123456789 pode ser convidado novamente.'],
            [`${BOT.prefix}unban 123456789 Pagou propina para o admin`, 'Remove membro da lista de banidos com o motivo da ação.']
        ]
    },
    {
        name: 'warn',
        category: COMMAND_CATEGORY.moderation,
        description: 'Envia um aviso para um membro.',
        usage: [`${BOT.prefix}warn ${new MDHelper('[@Menção de Membro|MembroId]').codeLineB().get()} ${new MDHelper('<message|embed>').codeLineB().get()} ${new MDHelper('[mensagem]|(embed flags)').codeLineB().get()}`],
        args: [
            Argument.create('STATIC', 'message', 'Indicar que em seguida vai ser enviado uma mensagem de texto normal.'),
            Argument.create('STATIC', 'embed', 'Indica que em seguida será enviada uma mensagem incorporada, o comando com essa flag é idêntico ao comando embed, consulte o comando embed caso tenha duvidas.'),
            STATIC_ARGUMENT.member.description
        ],
        examples: [
            [`${BOT.prefix}warn message @${BOT.name} Xingou um membro, que não se repita!`, "Envia um aviso por mensagem."],
            [`${BOT.prefix}warn embed @${BOT.name} -t "Servidor ${BOT.name}" -d "Você cometeu sérios crimes contra a sociedade dos slimes" -fti "Infração 1" -fvi "Pisou em um slime" -fti "Infração 2" -fvi "Usou um slime para derreter roupas" -f "Seras banido caso cometa novamente essas atrocidades!"`, "Envia um aviso usando mensagem incorporada."]
        ]
    },
]

export default MODERATION_COMMANDS;
import { BOT } from "../defaultBoTInfo";
import Argument from "../argument";
import MDHelper from "../markdown";
import { BotCommandType } from "../index.type";

enum COMMAND_CATEGORY {
    admin = 'Admin',
    moderation = 'Moderação',
    utility = 'Utilitários'
}

// Arguments between [] are [changeable content], between () are (flags) and between <> are <static arguments>

const ARGUMENT = {
    member: new Argument(
        new MDHelper('[@Membro|IDMembro]').codeLineB().get(),
        `A referência de algum membro do servidor, pode ser ${new MDHelper('[Mencionar um membro "@Membro" ou usar o ID do membro "1234567890"]').codeLineB().get()}.`
    ),
    message: new Argument(
        new MDHelper('[Mensagem]').codeLineB().get(),
        'Escreva um texto.'
    ),
    quantity: new Argument(
        new MDHelper('[Quantidade]').codeLineB().get(),
        'Representa a quantidade desejada.'
    ),
    command: new Argument(
        new MDHelper('[Commando]').codeLineB().get(),
        `Refere a um comando utilizado pelo ${BOT.name}.`
    )
}

const adminCommands: BotCommandType[] = [
    {
        name: 'anonymous-direct-message',
        category: COMMAND_CATEGORY.admin,
        description: 'Envia uma mensagem anonimamente para um membro do server através de mim.',
        usage: [
            `${BOT.prefix}anonymous-direct-message ${ARGUMENT.member.name}* ${ARGUMENT.message.name}*`
        ],
        aliases: [`${BOT.prefix}adm`],
        args: [ARGUMENT.member.description, ARGUMENT.message.description],
        examples: [
            `${new MDHelper(`${BOT.prefix}anonymous-direct-message @${BOT.name} Oi você quer pular pelo meu servidor?`).codeLineB().get()} Envia uma mensagem privada para o membro ${BOT.name}.`,
        ]
    },
]

const moderationCommands: BotCommandType[] = [
    {
        name: 'ban',
        category: COMMAND_CATEGORY.moderation,
        description: 'Bane um membro e ele não poderá voltar até ser removido da lista de banidos.',
        usage: [
            `${BOT.prefix}ban ${ARGUMENT.member.name}* ${new MDHelper('(--days "Number")').codeLineB().get()} ${new MDHelper('(--reason "Text")').codeLineB().get()}`,
            `${BOT.prefix}ban ${new MDHelper('<list>')}`
        ],
        args: [
            ARGUMENT.member.description,
            `${Argument.staticArgSymbol} ${new MDHelper('<list>').codeLineB().get()} - Este é um argumento estático e lista os membros banidos.`,
            `${Argument.flagSymbol} ${new MDHelper('(--days "Número"|-d "Número")').codeLineB().get()} - Número de dias entre "1 e 7" que representa as mensagens que serão deletadas, valor padrão é 0.`,
            `${Argument.flagSymbol} ${new MDHelper('(--reason "Texto"|-r "Texto")').codeLineB().get()} - A razão do banimento.`
        ],
        examples: [
            `${new MDHelper(`${BOT.prefix}ban list`).codeLineB().get()} - Lista com todos os banidos.`,
            `${new MDHelper(`${BOT.prefix}ban @${BOT.name} --days "7"`).codeLineB().get()} - A flag de days pode ser utilizada ${new MDHelper('(--days|-d)').codeLineB().get()} em seguida o valor entre aspas duplas`,
            `${new MDHelper(`${BOT.prefix}ban @${BOT.name} --reason "${BOT.name} está distraindo os membros do servidor."`).codeLineB().get()} - O membro ${BOT.name} foi banido com um motivo.`,
        ]
    },
    {
        name: 'kick',
        category: COMMAND_CATEGORY.moderation,
        description: 'Remove um membro.',
        usage: [
            `${BOT.prefix}kick ${ARGUMENT.member.name}* ${new MDHelper('[Motivo]').codeLineB().get()}`
        ],
        args: [
            ARGUMENT.member.description,
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
            `${BOT.prefix}mute ${ARGUMENT.member.name}* ${new MDHelper('[Tempo<M|H|D>]').codeLineB().get()} ${new MDHelper('[Motivo]').codeLineB().get()}`,
            `${BOT.prefix}mute addrole ${new MDHelper('[@Cargo|CargoID]').codeLineB().get()}* `,
            `${BOT.prefix}mute list`,
        ],
        args: [
            ARGUMENT.member.description,
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
            `${BOT.prefix}remove-messages ${ARGUMENT.quantity.name}*`
        ],
        aliases: [
            `${BOT.prefix}rm`
        ],
        args: [ARGUMENT.quantity.description],
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

const utilityCommands: BotCommandType[] = [
    {
        name: 'info',
        category: COMMAND_CATEGORY.utility,
        description: 'Buscarei informações sobre algum membro da guild.',
        usage: [`${BOT.prefix}info ${new MDHelper('<member>').codeLineB().get()}* ${ARGUMENT.member.name}*`],
        args: [
            `${Argument.staticArgSymbol} ${new MDHelper('<member>').codeLineB().get()} - Argumento estático para indicar que o próximo argumento é um membro.`,
            ARGUMENT.member.description,
        ],
        examples: [
            `${new MDHelper(`${BOT.prefix}info member @${BOT.name}`).codeLineB().get()} - Retornarei informações sobre o membro @${BOT.name}.`
        ]
    },
    {
        name: 'get-members-status',
        category: COMMAND_CATEGORY.utility,
        description: 'Irá retornar a quantidade de players online, ausente, não perturbe e offline.',
        usage: [`${BOT.prefix}get-members-status`],
        aliases: [`${BOT.prefix}gms`, `${BOT.prefix}guildMembers`],
        examples: [
            `${new MDHelper(`${BOT.prefix}get-members-status`).codeLineB().get()} - Retorna uma mensagem com informações referente a quantidade de membros por status da guild.`
        ]
    },
    {
        name: 'help',
        category: COMMAND_CATEGORY.utility,
        description: 'Te trago para essa documentação de commandos e ensino as minhas mais poderosas magias, sou o canalizador de todo o poder da sua guild.',
        usage: [`${BOT.prefix}help ${ARGUMENT.command.name}*`, `${BOT.prefix}help ${new MDHelper('<list>').codeLineB().get()}`],
        aliases: [`${BOT.prefix}h`],
        args: [
            ARGUMENT.command.description,
            `${Argument.staticArgSymbol} ${new MDHelper('<list>').codeLineB().get()} - Esse é um argumento estático e retorna a lista de todos os meus comandos.`
        ],
        examples: [
            `${new MDHelper(`${BOT.prefix}help help`).codeLineB().get()} - Com essa carta você entra em uma inception onde você pede ajuda para a ajuda.`,
            `${new MDHelper(`${BOT.prefix}h list`).codeLineB().get()} - Recebe o codex o livro da sabedoria divina do ${BOT.name} que contem todos os seus comandos.`
        ]
    },
    {
        name: 'ping',
        category: COMMAND_CATEGORY.utility,
        description: 'O tempo de resposta em milissegundos(ms) dos servidores.',
        usage: [`${BOT.prefix}ping`],
        aliases: [`${BOT.prefix}p`],
        examples: [`${new MDHelper(`${BOT.prefix}ping`).codeLineB().get()} - Retorna ping dos serviços disponíveis.`]
    }
]

const BotCommands: BotCommandType[] = [...adminCommands, ...moderationCommands, ...utilityCommands];

export default BotCommands;
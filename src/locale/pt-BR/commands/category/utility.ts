import Argument from "../../../argument";
import { BOT } from "../../../defaultBoTInfo";
import { BotCommandType } from "../../../index.type";
import MDHelper from "../../../markdown";
import COMMAND_CATEGORY from "../categories";
import STATIC_ARGUMENT from "../staticArguments";

const UTILITY_COMMANDS: BotCommandType[] = [
    {
        name: 'info',
        category: COMMAND_CATEGORY.utility,
        description: 'Buscarei informações sobre algum membro da guild.',
        usage: [`${BOT.prefix}info ${new MDHelper('<member>').codeLineB().get()}* ${STATIC_ARGUMENT.member.name}*`],
        args: [
            [Argument.staticArgSymbol, '<member>', 'Argumento estático para indicar que o próximo argumento é um membro.'],
            STATIC_ARGUMENT.member.description,
        ],
        examples: [
            [`${BOT.prefix}info member @${BOT.name}`, `Retornarei informações sobre o membro @${BOT.name}.`]
        ]
    },
    {
        name: 'get-members-status',
        category: COMMAND_CATEGORY.utility,
        description: 'Irá retornar a quantidade de players online, ausente, não perturbe e offline.',
        usage: [`${BOT.prefix}get-members-status`],
        aliases: [`${BOT.prefix}gms`, `${BOT.prefix}guildMembers`],
        examples: [
            [`${BOT.prefix}get-members-status`, 'Retorna uma mensagem com informações referente a quantidade de membros por status da guild.']
        ]
    },
    {
        name: 'help',
        category: COMMAND_CATEGORY.utility,
        description: 'Te trago para essa documentação de commandos e ensino as minhas mais poderosas magias, sou o canalizador de todo o poder da sua guild.',
        usage: [`${BOT.prefix}help ${STATIC_ARGUMENT.command.name}*`, `${BOT.prefix}help ${new MDHelper('<list>').codeLineB().get()}`],
        aliases: [`${BOT.prefix}h`],
        args: [
            STATIC_ARGUMENT.command.description,
            [Argument.staticArgSymbol, '<list>', 'Esse é um argumento estático e retorna a lista de todos os meus comandos.'],
        ],
        examples: [
            [`${BOT.prefix}help help`, 'Com essa carta você entra em uma inception onde você pede ajuda para a ajuda.'],
            [`${BOT.prefix}h list`, `Recebe o codex o livro da sabedoria divina do ${BOT.name} que contem todos os seus comandos.`]
        ]
    },
    {
        name: 'ping',
        category: COMMAND_CATEGORY.utility,
        description: 'O tempo de resposta em milissegundos(ms) dos servidores.',
        usage: [`${BOT.prefix}ping`],
        aliases: [`${BOT.prefix}p`],
        examples: [
            [`${BOT.prefix}ping`, 'Retorna ping dos serviços disponíveis.']
        ]
    }
]

export default UTILITY_COMMANDS;
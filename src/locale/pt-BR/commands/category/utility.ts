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
    },
    {
        name: 'embed',
        category: COMMAND_CATEGORY.utility,
        description: 'Cria uma mensagem incorporada.',
        usage: [`${BOT.prefix}embed ${new MDHelper('(--title|--desc|--thumb|--field_title|--field_value|--field_title_inline|--field_value_inline|--footer)').codeLineB().get()}`],
        args: [
            Argument.create('FLAG', 'title', 'Titulo da mensagem'),
            Argument.create('FLAG', 'desc', 'Descrição da mensagem'),
            Argument.create('FLAG', 'thumb', 'Thumbnail precisa ser uma URL valida.', '--thumb|-tb'),
            Argument.create('FLAG', 'field_title', 'Titulo do campo em linha única (Para cada field_title irá precisar de um field_value)', '--field_title|-fv'),
            Argument.create('FLAG', 'field_value', 'Descrição do campo em linha única (Para cada field_value irá precisar de um field_title)', '--field_title|-fv'),
            Argument.create('FLAG', 'field_title_inline', 'Titulo do campo em linha dividida com outros campos (Para cada field_title_inline irá precisar de um field_value_inline)', '--field_title_inline|-fti'),
            Argument.create('FLAG', 'field_value_inline', 'Descrição do campo em linha dividida com outros campos (Para cada field_value_inline irá precisar de um field_title_inline)', '--field_value_inline|-fvi'),
            Argument.create('FLAG', 'footer', 'Rodapé da mensagem'),
        ],
        examples: [
            [`${BOT.prefix}embed -t "Hello" -d "Eu sou ${BOT.name}" -tb "https://media.tenor.com/NBDZyvHqv9wAAAAC/poring-ragnarok.gif" -ft "Gosta de mim UwU ?" -fv "Então porque não me chamou para seu servidor ? :c"`, "Cria mensagem incorporada com titulo, descrição, thumbnail 1 campo."],
            [`${BOT.prefix}embed -t "Hello" -d "World" -f "Rodapé da mensagem" -fti "Titulo 1" -fvi "Descrição 1" -ft "Titulo 2" -fv "Descrição 2"`, "Cria mensagem incorporada com um titulo, descrição, rodapé e 2 campos na mesma linha."],
        ]
    }
]

export default UTILITY_COMMANDS;
import Argument from "../../argument";
import { BOT } from "../../defaultBoTInfo";
import MDHelper from "../../markdown";
import { LocaleCommandStaticArguments } from "../../types/command";

// Arguments between [] are [changeable content], between () are (flags) and between <> are <static arguments>
const STATIC_ARGUMENT: LocaleCommandStaticArguments = {
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

export default STATIC_ARGUMENT
import Argument from "../../argument";
import { BOT } from "../../defaultBoTInfo";
import MDHelper from "../../markdown";
import { LocaleCommandStaticArguments } from "../../types/command";

// Arguments between [] are [changeable content], between () are (flags) and between <> are <static arguments>
const STATIC_ARGUMENT: LocaleCommandStaticArguments = {
    member: new Argument(
        new MDHelper('[@Member|MemberId]').codeLineB().get(),
        `The reference of some member of the server, can be ${new MDHelper('[Mention a member "@Member" or use  member ID "1234567890"]').codeLineB().get()}.`
    ),
    message: new Argument(
        new MDHelper('[Message]').codeLineB().get(),
        'Write a text.'
    ),
    quantity: new Argument(
        new MDHelper('[Quantity]').codeLineB().get(),
        'Represents the desired quantity.'
    ),
    command: new Argument(
        new MDHelper('[Command]').codeLineB().get(),
        `Refers to a command used by ${BOT.name}.`
    )
}

export default STATIC_ARGUMENT
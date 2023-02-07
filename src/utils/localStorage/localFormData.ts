import { MessageWithComponentsType } from "../../services/discord/modules/modules.types"
import LocalStorageKeys from "./keys"

type LocalFormData = {
    form?: {
        roleByInteraction?: MessageWithComponentsType;
    }
}

const get = () => {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.LOCAL_FORM_DATA) ?? "{}") as LocalFormData;
}

const set = (data: LocalFormData) => {
    localStorage.setItem(LocalStorageKeys.LOCAL_FORM_DATA, JSON.stringify(data));
}

export default {
    get,
    set
}
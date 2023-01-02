import { BOT } from "../../../defaultBoTInfo";
import welcomeMember from "../../modules/welcomeMember";
import memberLeave from "../../modules/memberLeave";

const modules = {
    label: {
        active: 'Módulos Ativos',
        inactive: 'Módulos Inativos'
    },
    head: {
        title: `${BOT.name} | Módulos`
    },
    welcomeMember,
    memberLeave
}

export default modules;
import { BOT } from "../../../defaultBoTInfo";
import welcomeMember from "../../modules/welcomeMember";

const modules = {
    label: {
        active: 'Módulos Ativos',
        inactive: 'Módulos Inativos'
    },
    welcomeMember: {
        ...welcomeMember,
        head: {
            title: `${BOT.name} | Módulos`
        }
    }
}

export default modules;
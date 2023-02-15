import { BOT } from "../../../defaultBoTInfo";
import welcomeMember from "../../modules/welcomeMember";
import memberLeave from "../../modules/memberLeave";
import roleByInteraction from "../../modules/roleByInteraction";

const modules = {
    label: {
        active: 'Active modules',
        inactive: 'Inactive modules'
    },
    head: {
        title: `${BOT.name} | modules`
    },
    welcomeMember,
    memberLeave,
    roleByInteraction
}

export default modules;
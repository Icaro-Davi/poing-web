import ADMIN_COMMANDS from "./category/admin";
import MODERATION_COMMANDS from "./category/moderation";
import UTILITY_COMMANDS from "./category/utility";

import type { BotCommandType } from "../../index.type";

const BotCommands: BotCommandType[] = [
    ...ADMIN_COMMANDS,
    ...MODERATION_COMMANDS,
    ...UTILITY_COMMANDS
];

export default BotCommands;
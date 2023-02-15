import poingSettings from "./poingSettings";
import message from "./layouts/message";
import messageComponents from "./layouts/messageComponents";
import LocaleForm from "../../types/forms";

const forms: LocaleForm = {
    poingSettings,
    layouts: {
        message,
        messageComponents
    }
}

export default forms;
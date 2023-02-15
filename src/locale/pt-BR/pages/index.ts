import help from "./root/help";
import home from "./root/home";
import commands from "./root/commands";
import poing from './dashboard/poing';
import modules from './dashboard/modules';
import LocalePages from "../../types/pages";

const Pages: LocalePages = {
    root: {
        home, help, commands
    },
    dashboard: {
        modules,
        poing
    }
}

export default Pages;
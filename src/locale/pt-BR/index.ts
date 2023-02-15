import { Locale } from "../index.type";
import commands from "./commands";
import forms from "./forms";
import labels from './labels';
import layouts from "./layout";
import notifications from './notifications';
import pages from "./pages";

const pt_BR: Locale = {
    lang: 'pt-BR',
    layouts, commands,
    labels,
    pages, notifications,
    forms
}

export default pt_BR;
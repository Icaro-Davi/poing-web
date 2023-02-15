import { Locale } from "../index.type";
import layouts from './layout';
import commands from './commands';
import forms from './forms';
import labels from './labels';
import notifications from './notifications';
import pages from './pages';

const en_US: Locale = {
    lang: 'en-US',
    layouts, commands,
    forms, labels,
    notifications, pages
}

export default en_US;
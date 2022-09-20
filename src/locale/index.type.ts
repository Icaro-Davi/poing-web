import pt_BR from "./pt-BR";

export type LocaleLang = 'pt-BR';
export type Locale = typeof pt_BR;

export type BotCommandType = {
    name: string;
    category: string;
    description: string;
    aliases?: string[];
    usage: string[];
    args?: (string | string[])[];
    examples: (string | string[])[];
}
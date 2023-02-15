export type LocaleCommandCategory = {
    admin: string;
    moderation: string;
    utility: string;
}

export type LocaleArgument = {
    name: string;
    description: string;
}

// Arguments between [] are [changeable content], between () are (flags) and between <> are <static arguments>
export type LocaleCommandStaticArguments = {
    member: LocaleArgument;
    message: LocaleArgument;
    quantity: LocaleArgument;
    command: LocaleArgument;
}

type LocaleCommandType = {
    name: string;
    category: string; // Create object as type LocaleCommandCategory or enum as same keys.
    description: string;
    aliases?: string[];
    usage: string[];
    args?: (string | string[])[]; // Crete static arguments using LocaleCommandStaticArguments.
    examples: (string | string[])[];
}

export default LocaleCommandType;
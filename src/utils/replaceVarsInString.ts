import { get } from 'object-path';

export function replaceVarsInString<T extends { [key: string]: any }>(text: string, vars: T, object?: { regex?: RegExp; replaceVarsInLocale?: boolean }): string {
    let replaceRegex = /({|})/g;
    if (object?.replaceVarsInLocale) {
        object.regex = /({%[\w_]+%})/;
        replaceRegex = /({%|%})/g;
    }
    const regex = new RegExp(object?.regex ?? '({[\\w\.@]+})');
    const textParts = text.split(regex);

    const textWithVars = textParts.reduce((prev, current) => {
        current.match(regex) ? prev.push(get(vars, current.replaceAll(replaceRegex, '')) ?? current) : prev.push(current);
        return prev;
    }, [] as string[]).join('');

    return textWithVars;
}

export default replaceVarsInString;
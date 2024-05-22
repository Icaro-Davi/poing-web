import type { FunctionComponent } from "react";

type VarKeyType = `%${string}%` | `{%${string}%}`;

type VarsType = {
    default?: FunctionComponent<any> | boolean;
    [key: VarKeyType]: FunctionComponent<any> | string;
};

/**
* Find vars in string and substitute for react elements
* use %any_word% for elements or %{any_text}% for substitute for a text value.
*/
function findStringVarsAndSubstitute(text: string, vars: VarsType, options?: { regex: RegExp }) {
    const regex =  options?.regex ?? /(%[\w_]+?%|{%[\w_]+%})/g;
    const splitText = text.split(regex);

    const elements = splitText.map((word: string | VarKeyType, index) => {
        if (regex.test(word)) {
            if (vars[word as VarKeyType]) {
                let Node = vars[word as VarKeyType];
                return typeof Node === 'string' ? Node : <Node key={'item-' + index} />;
            }
        } else {
            switch (typeof vars.default) {
                case 'undefined':
                    return <p key={'item-' + index}>{word}</p>;
                case 'boolean':
                    return vars.default ? <p key={'item-' + index}>{word}</p> : word;
                default:
                    return <vars.default key={'item-' + index}>{word}</vars.default>
            }
        }
    });
    return elements;
}

export default findStringVarsAndSubstitute;
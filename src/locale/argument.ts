const flagEmoji = '🚩'; // (--example|-e)
const argumentEmoji = '💬'; // [example]
const staticArgumentEmoji = '🐢'; // <example>

class Argument {
    public name: string;
    public description: string;
    static flagSymbol = flagEmoji;
    static argSymbol = argumentEmoji;
    static staticArgSymbol = staticArgumentEmoji;
    static type: 'FLAG' | 'ARGUMENT' | 'STATIC' = 'ARGUMENT';
    constructor(name: string, description: string, isFlag?: boolean) {
        this.name = name;
        this.description = `${isFlag ? flagEmoji : argumentEmoji} ${name} - ${description}`;
    }
    static create(type: typeof this.type, argumentName: string, commandDescription: string, customArgWrap?: string) {
        switch (type) {
            case 'ARGUMENT':
                return [argumentEmoji, customArgWrap ? customArgWrap : `[${argumentName}]`, commandDescription];
            case 'FLAG':
                return [flagEmoji, customArgWrap ? `${customArgWrap}` : `(--${argumentName}|-${argumentName[0]})`, commandDescription];
            case 'STATIC':
                return [staticArgumentEmoji, customArgWrap ? customArgWrap : `<${argumentName}>`, commandDescription];
            default:
                return ['', '', ''];
        }
    }
}

export default Argument;
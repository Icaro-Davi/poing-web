const flagEmoji = '🚩';
const argumentEmoji = '💬';
const staticArgumentEmoji = '🐢';

class Argument {
    public name: string;
    public description: string;
    static flagSymbol = flagEmoji;
    static argSymbol = argumentEmoji;
    static staticArgSymbol = staticArgumentEmoji;
    constructor (name: string, description: string, isFlag?: boolean){
        this.name = name;
        this.description = `${isFlag ? flagEmoji : argumentEmoji} ${name} - ${description}`;
    }
}

export default Argument;
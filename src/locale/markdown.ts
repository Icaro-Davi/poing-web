class MDHelper {
    private text;

    constructor(text: string) {
        this.text = text;
    }

    get(){
        return this.text;
    }

    codeLine() {
        this.text = `\`\`\`${this.text}\`\`\``;
        return this;
    }

    B() {
        this.text = `**${this.text}**`;
        return this;
    }

    codeLineB(){
        this.codeLine().B();
        return this;
    }
}

export default MDHelper;
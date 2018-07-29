export class Command {
    static CLEAR_ALL= "CLEAR_ALL";
    static CLEAR_ENTRY = "CLEAR_ENTRY";
    static BACKSPACE = "BACKSPACE";
    static EVALUATE = "EVALUATE";
    static NEGATE = "NEGATE";

    static operandSet = new Set([..."0123456789.", Command.NEGATE]);
    static operatorSet = new Set("+-*/");
    static specialKeys = new Set([
        Command.CLEAR_ALL, Command.CLEAR_ENTRY, Command.BACKSPACE, Command.EVALUATE
    ])

    static mapKeyCodeToCommand(keyCode) {
        switch(keyCode) {
            case 67:
                return this.CLEAR_ALL;
            case 8:
                return this.BACKSPACE;
            case 13:
                return this.EVALUATE;
            default:
                return null;
        }
    }

    static mapInputDataToCommand(data) {
        const commands = new Set([
            ...this.operandSet, ...this.operatorSet
        ]);
        if (data === "~") {
            return this.NEGATE;
        } else if (data === "=") {
            return this.EVALUATE;
        } else if (commands.has(data)) {
            return data;
        } else {
            return null;
        }
    }

    constructor(value) {
        this.value= value;
    }

    execute(a, b) {
        switch (this.value) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
            default:
                return null;
        }
    }
}
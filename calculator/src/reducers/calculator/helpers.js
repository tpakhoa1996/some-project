import { Command } from "../../helpers/command";

export const getInitialState = () => ({
    answer: null,
    currentEntry: "",
    currentOperator: null,
    operatorSymbol: null,
    availableCommands: new Set([...Command.operandSet].filter(x => x !== Command.NEGATE))
});
import { Command } from "../../helpers/command";
import { getInitialState } from "./helpers";


export const processCommand = (state, command) => {
    const newState = { ...state };
    if (!state.availableCommands.has(command)) {
        return { ...state };
    }

    // Process command
    if (Command.operatorSet.has(command) || command === Command.EVALUATE) {
        if (state.answer == null) {
            const currentEntry = parseFloat(state.currentEntry);
            newState.answer = currentEntry;
        } else {
            if (state.currentEntry) {
                const currentEntry = parseFloat(state.currentEntry);
                newState.answer = state.currentOperator(state.answer, currentEntry);
            }
        }
        newState.currentEntry = "";
        newState.currentOperator = mapCommandToOperator(command);
        if (Command.operatorSet.has(command)) {
            newState.operatorSymbol = command;
        } else {
            newState.operatorSymbol = null;
        }
    } else if (Command.operandSet.has(command)) {
        if (command === Command.NEGATE) {
            if (state.currentEntry[0] === '-') {
                newState.currentEntry = state.currentEntry.slice(1);
            } else {
                newState.currentEntry = "-" + state.currentEntry;
            }
        } else {
            newState.currentEntry += command;
            let i = 0;
            while (i < newState.currentEntry.length - 1) {
                if (newState.currentEntry[i] !== '0') {
                    break;
                }
                i++;
            }
            newState.currentEntry = newState.currentEntry.slice(i);
        }
    } else if (command === Command.BACKSPACE) {
        newState.currentEntry = state.currentEntry.slice(0, -1);
    } else if (command === Command.CLEAR_ALL) {
        Object.assign(newState, getInitialState());
    } else if (command === Command.CLEAR_ENTRY) {
        newState.currentEntry = "";
    } 

    // Update available command set
    newState.availableCommands = new Set([ ...Command.operandSet, ...Command.operatorSet, ...Command.specialKeys ]);

    if (!newState.currentEntry) {
        newState.availableCommands.delete(Command.BACKSPACE);
        newState.availableCommands.delete(Command.CLEAR_ENTRY);
        newState.availableCommands.delete(Command.EVALUATE);
        newState.availableCommands.delete(Command.NEGATE);
        if (newState.answer == null) {
            Command.operatorSet.forEach(
                command => newState.availableCommands.delete(command)
            );
            newState.availableCommands.delete(Command.CLEAR_ALL);
        }
    }

    if (!newState.currentOperator) {
        if (newState.answer != null) {
            Command.operandSet.forEach(
                command => newState.availableCommands.delete(command)
            );
        }
    }
    if (newState.currentEntry.indexOf('.') >= 0) {
        newState.availableCommands.delete('.');
    }
    if (newState.currentOperator && newState.currentEntry && newState.answer != null) {
        const currentEntry = parseFloat(newState.currentEntry);
        if (!isFinite(newState.currentOperator(newState.answer, currentEntry))) {
            Command.operatorSet.forEach(
                command => newState.availableCommands.delete(command)
            );
            newState.availableCommands.delete(Command.EVALUATE);
        }
    }

    console.log("Debug processcommand", newState);
    return newState;
}

const mapCommandToOperator = command => {
    switch (command) {
        case "+":
            return (x, y) => (x + y);
        case "-":
            return (x, y) => (x - y);
        case "*":
            return (x, y) => (x * y);
        case "/":
            return (x, y) => (x / y);
        default:
            return null;
    }
}
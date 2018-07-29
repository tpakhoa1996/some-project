export const type = {
    PROCESS_COMMAND: "PROCESS_COMMAND",
}

export const processCommand = command => dispatch =>
    dispatch({
        type: type.PROCESS_COMMAND,
        payload: command
    })
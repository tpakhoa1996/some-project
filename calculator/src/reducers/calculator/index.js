import { type } from "../../actions/calculator";


import { processCommand } from "./processCommand";

import { getInitialState } from "./helpers"


export default (state = getInitialState(), action) => {
    console.log("reducers", action.type);
    switch (action.type) {
        case type.PROCESS_COMMAND:
            console.log(action.payload);
            return processCommand(state, action.payload);
        default:
            return { ...state };
    }
}
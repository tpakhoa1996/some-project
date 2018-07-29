import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { processCommand } from "../../actions/calculator"

import "./style.css";
import { Command } from "../../helpers/command";
import Key from "../Key";


class Calculator extends Component {
    static propTypes = {
        processCommand: PropTypes.func.isRequired,
        availableCommands: PropTypes.instanceOf(Set).isRequired,
        currentEntry: PropTypes.string.isRequired,
        operatorSymbol: PropTypes.string,
        answer: PropTypes.number,
    }
    constructor(props) {
        super(props);
        this.state = {
            expression: "",
            answer: null,
            currentEntry: "",
        }
        this.onDirectInput = this.onDirectInput.bind(this);
        this.onSpecialKeyInput = this.onSpecialKeyInput.bind(this);
    }


    onDirectInput(event) {
        event.preventDefault();
        const inputData = event.target.value.slice(-1);
        const command = Command.mapInputDataToCommand(inputData);
        this.props.processCommand(command);
    }

    onSpecialKeyInput(event) {
        const code = event.keyCode;
        const command = Command.mapKeyCodeToCommand(code);
        if (
            (code < 48) || 
            (code > 90 && code < 96) ||
            (code > 111 && code < 187) ||
            (code > 187 && code < 189) ||
            (code > 190)
        ) {
            event.preventDefault();
        }
        this.props.processCommand(command);
    }

    render() {
        const keyList = [
            {symbol: "1", command: "1"},
            {symbol: "2", command: "2"},
            {symbol: "3", command: "3"},
            {symbol: "+", command: "+"},
            {symbol: {
                type: "image",
                info: "/backspace1.png"
            }, command: Command.BACKSPACE},
            {symbol: "4", command: "4"},
            {symbol: "5", command: "5"},
            {symbol: "6", command: "6"},
            {symbol: "-", command: "-"},
            {symbol: "CLEAR ALL", command: Command.CLEAR_ALL},
            {symbol: "7", command: "7"},
            {symbol: "8", command: "8"},
            {symbol: "9", command: "9"},
            {symbol: "*", command: "*"},
            {symbol: "CLEAR ENTRY", command: Command.CLEAR_ENTRY},
            {symbol: ".", command: "."},
            {symbol: "0", command: "0"},
            {symbol: "~", command: Command.NEGATE},
            {symbol: "/", command: "/"},
            {symbol: {
                type: "image",
                info: "/equal.png"
            }, command: Command.EVALUATE},
        ]

        return (
            <div id="calculator">
                <div id="display">
                    <div id="answer">Answer</div>
                    <div>{this.props.answer}</div>
                    <div id="operator-label"> Operator </div>
                    <div id="operator-symbol">{this.props.operatorSymbol}</div>
                    <div id="current-entry">Entry </div>
                    {/* <div id="entry">{this.props.currentEntry}</div> */}
                    <input 
                        type="text" value={this.props.currentEntry}
                        onKeyDown={this.onSpecialKeyInput}
                        onInput={this.onDirectInput}
                    />
                </div>
                <div id="key-pad">
                    {
                        keyList.map(key => (
                            // <div className="key-container">
                                <Key command={key.command} symbol={key.symbol} />
                            // </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    answer: state.calculator.answer,
    currentEntry: state.calculator.currentEntry,
    availableCommands: state.calculator.availableCommands,
    operatorSymbol: state.calculator.operatorSymbol
})

export default connect(mapStateToProps, {processCommand})(Calculator);
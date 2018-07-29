import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { processCommand } from "../../actions/calculator";
import "./style.css";

class Key extends Component {
    static propTypes = {
        command: PropTypes.string.isRequired,
        symbol: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                info: PropTypes.string.isRequired
            })
        ]).isRequired,
        availableCommands: PropTypes.instanceOf(Set).isRequired,
        processCommand: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.getDisableClass = this.getDisableClass.bind(this);
    }

    onClick(event) {
        this.props.processCommand(this.props.command);
    }

    getDisableClass() {
        if (this.props.availableCommands.has(this.props.command)) {
            return "";
        } else {
            return "disabled";
        }
    }

    render() {
        return (
            <div className={`key ${this.getDisableClass()}`} onClick={this.onClick}>
                {
                    (() => {
                        const symbol = this.props.symbol;
                        if (typeof(symbol) === "string") {
                            console.log(symbol);
                            return symbol;
                        } else if (symbol.type === "image") {
                            return (<img src={symbol.info} className="key-img" alt="key"/>);
                        } else {
                            return symbol;
                        }
                    })()
                }
            </div>
        )
    }
}

const mapStateToProps = ({ calculator }) => ({
    availableCommands: calculator.availableCommands
})

export default connect(mapStateToProps, {processCommand})(Key);
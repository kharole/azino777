import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { ServerMessage } from '../constants/messageTypes';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bet: {
                alternative: 'head',
                amount: 0,
            },
            isFlippable: false,
        };
    }

    componentWillMount() {
        this.props.onInit();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.bet && nextProps.bet && nextProps.alternative) {
            this.setState({
                bet: {
                    amount: nextProps.bet,
                    alternative: nextProps.alternative,
                },
            });
        }
        if (nextProps.command === ServerMessage.NEW_ROUND_STARTED) {
            this.state({
                isFlippable: true,
            });
        }
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    handleClickOnBet(alternative) {
        if (this.state.bet.alternative === alternative || this.state.bet.amount === 0) {
            this.setState({
                bet: {
                    alternative,
                    amount: this.state.bet.amount < 5 ? this.state.bet.amount + 1 : 0,
                },
            });
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-result-row">
                    <div />
                    <div>{this.props.result}</div>
                    <div />
                </div>
                <div className="App-bet-row">
                    <div
                        className="App-bet-head"
                        onClick={() => this.handleClickOnBet('head')}
                    >
                        <div>Head</div>
                        <div>{this.state.bet.alternative === 'head' ? this.state.bet.amount : 0}</div>
                    </div>
                    <div
                        className="App-bet-tail"
                        onClick={() => this.handleClickOnBet('tail')}
                    >
                        <div>Tail</div>
                        <div>{this.state.bet.alternative === 'tail' ? this.state.bet.amount : 0}</div>
                    </div>
                </div>
                <div className="App-control-row">
                    <div className="App-status">
                        <div>Status</div>
                        <div>{this.props.status}</div>
                    </div>
                    <div className="App-balance">
                        <div>Balance</div>
                        <div>{this.props.balance}</div>
                    </div>
                    <div className="App-flip">
                        <button
                            disabled={!this.state.isFlippable}
                            onClick={() => this.props.onFlip(this.state.bet.amount, this.state.bet.alternative)}
                        >
                            Flip!
                        </button>
                    </div>
                    <div className="App-win">
                        <div>Win</div>
                        <div>{this.props.win}</div>
                    </div>
                    <div className="App-round">
                        <div>Round</div>
                        <div>{this.props.round}</div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    alternative: PropTypes.string,
    balance: PropTypes.number,
    bet: PropTypes.number,
    command: PropTypes.string,
    result: PropTypes.string,
    round: PropTypes.number,
    outcome: PropTypes.string,
    win: PropTypes.number,
    onInit: PropTypes.func.isRequired,
    onFlip: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default App;

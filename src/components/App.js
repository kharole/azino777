import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            bet: {
                alternative: 'head',
                amount: 0,
            },
        };
    }

    componentWillMount () {
        this.props.onInit();
    }

    componentWillUnmount () {
        this.props.onInit();
    }

    handleClickOnBet (bet) {
        if (this.state.bet.alternative === bet || this.state.bet.amount === 0) {
            this.setState({
                bet: {
                    alternative: bet,
                    amount: this.state.bet.amount < 5 ? this.state.bet.amount + 1 : 0
                },
            });
        }
    }

    render () {
        console.log(this.props);
        return (
            <div className="App">
                <div className="App-result-row">
                    <div/>
                    <div>{this.props.outcome}</div>
                    <div/>
                </div>
                <div className="App-bet-row">
                    <div className="App-bet-head"
                         onClick={() => this.handleClickOnBet('head')}>
                        <div>Head</div>
                        <div>{this.state.bet.alternative === 'head' ? this.state.bet.amount : 0}</div>
                    </div>
                    <div className="App-bet-tail"
                         onClick={() => this.handleClickOnBet('tail')}>
                        <div>Tail</div>
                        <div>{this.state.bet.alternative === 'tail' ? this.state.bet.amount : 0}</div>
                    </div>
                </div>
                <div className="App-control-row">
                    <div className="App-balance">
                        <div>Balance</div>
                        <div>{this.props.balance}</div>
                    </div>
                    <div className="App-flip">
                        <button onClick={() => this.props.onFlip(this.state.bet.amount, this.state.bet.alternative)}>Flip!</button>
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
    bet: PropTypes.object,
    round: PropTypes.number,
    win: PropTypes.number,
    balance: PropTypes.number,
    outcome: PropTypes.string,
    onInit: PropTypes.func.isRequired,
    onFlip: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default App;

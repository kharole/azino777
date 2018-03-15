import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Popup from './popup/Popup';

class App extends Component {

    componentWillMount() {
        this.props.onInit();
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    render() {
        return (
            <div className="App">
                {false && <Popup title="Continue" message="Please click OK to continue" handlePopupClick={this.props.onNewRound} />}
                <div className="App-result-row">
                    <div />
                    <div>{this.props.result}</div>
                    <div />
                </div>
                <div className="App-bet-row">
                    <div
                        className="App-bet-head"
                        onClick={() => !this.props.isLocked ? this.props.onAlternativeClick('head', this.props.bet) : null}
                    >
                        <div>Head</div>
                        <div>{this.props.alternative === 'head' ? this.props.bet : 0}</div>
                    </div>
                    <div
                        className="App-bet-tail"
                        onClick={() => !this.props.isLocked ? this.props.onAlternativeClick('tail', this.props.bet) : null}
                    >
                        <div>Tail</div>
                        <div>{this.props.alternative === 'tail' ? this.props.bet : 0}</div>
                    </div>
                </div>
                <div>
                    <div style={{ visibility: this.props.showClickToContinue ? null : 'hidden' }}>
                        <a className="App-continue-link" onClick={this.props.onNewRound}>Click to continue</a>
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
                            disabled={this.props.isLocked}
                            onClick={() => this.props.onFlip(this.props.bet, this.props.alternative)}
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
    status: PropTypes.string,
    win: PropTypes.number,
    isLocked: PropTypes.bool,
    showClickToContinue: PropTypes.bool,
    onInit: PropTypes.func.isRequired,
    onFlip: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onNewRound: PropTypes.func.isRequired,
    onAlternativeClick: PropTypes.func.isRequired,
};

export default App;

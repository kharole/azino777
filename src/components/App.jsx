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
                {(this.props.message.isVisible) &&
                <Popup
                    isBlocking={this.props.message.isBlocking}
                    message={this.props.message.text}
                    handleMessageConfirm={this.props.onMessageConfirm}
                />
                }
                <div className="App-result-row">
                    <div />
                    <div className={`App-outcome-${this.props.outcome}`}>{this.props.result}</div>
                    <div />
                </div>
                <div className="App-bet-row">
                    <div>
                        <div />
                        <div
                            className={`App-bet ${this.props.alternative === 'head' && this.props.outcome}`}
                            onClick={() => (!this.props.isLocked ? this.props.onAlternativeClick('head', this.props.bet) : null)}
                        >
                            <div>Head</div>
                            <div>{this.props.alternative === 'head' ? this.props.bet : 0}</div>
                        </div>
                        <div />
                    </div>
                    <div>
                        <div />
                        <div
                            className={`App-bet ${this.props.alternative === 'tail' && this.props.outcome}`}
                            onClick={() => (!this.props.isLocked ? this.props.onAlternativeClick('tail', this.props.bet) : null)}
                        >
                            <div>Tail</div>
                            <div>{this.props.alternative === 'tail' ? this.props.bet : 0}</div>
                        </div>
                        <div />
                    </div>
                </div>
                <div className="App-continue-link-row">
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
                            disabled={this.props.isLocked || this.props.bet === 0}
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
    balance: PropTypes.number.isRequired,
    bet: PropTypes.number.isRequired,
    result: PropTypes.string,
    round: PropTypes.number.isRequired,
    outcome: PropTypes.string,
    status: PropTypes.string.isRequired,
    win: PropTypes.number.isRequired,
    isLocked: PropTypes.bool,
    showClickToContinue: PropTypes.bool,
    message: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        isBlocking: PropTypes.bool,
        text: PropTypes.string,
    }),
    onInit: PropTypes.func.isRequired,
    onFlip: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onNewRound: PropTypes.func.isRequired,
    onAlternativeClick: PropTypes.func.isRequired,
    onMessageConfirm: PropTypes.func.isRequired,
};

export default App;

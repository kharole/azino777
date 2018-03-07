import React, { Component } from 'react'
import './App.css'

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            result: 'H',
            head: 2,
            tail: 0,
            balance: 30,
            win: 1,
            round: 2,
        }
    }

    handleClickOnBet(bet){
        this.setState({
            [bet]: this.state[bet] < 5 ? this.state[bet] + 1 : 0,
        })
    }

    render () {
        return (
            <div className="App">
                <div className="App-result-row">
                    <div/>
                    <div>{this.state.result}</div>
                    <div/>
                </div>
                <div className="App-bet-row">
                    <div className="App-bet-head" onClick={() => this.state.tail === 0 && this.handleClickOnBet('head')}>
                        <div>Head</div>
                        <div>{this.state.head}</div>
                    </div>
                    <div className="App-bet-tail" onClick={() => this.state.head === 0 &&this.handleClickOnBet('tail')}>
                        <div>Tail</div>
                        <div>{this.state.tail}</div>
                    </div>
                </div>
                <div className="App-control-row">
                    <div className="App-balance">
                        <div>Balance</div>
                        <div>{this.state.balance}</div>
                    </div>
                    <div className="App-flip">
                        <button>Flip!</button>
                    </div>
                    <div className="App-win">
                        <div>Win</div>
                        <div>{this.state.win}</div>
                    </div>
                    <div className="App-round">
                        <div>Round</div>
                        <div>{this.state.round}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App

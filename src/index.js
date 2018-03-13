import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Observable } from 'rxjs';
import { ServerMessage } from './constants/messageTypes';
// import { mockServer } from './utils/mockServer';

//mockServer;

//const socket$ = Observable.webSocket('ws://localhost:9004');
const socket$ = Observable.webSocket('ws://localhost:9000/ws');

//TODO: highlight result alternative
//TODO: updated status bar
//TODO: show/hide message
//TODO: lock/unlock flip button on start-new-round

const onInit = () => socket$.next(JSON.stringify({name: 'attach', session: 'AAA'}));

const onClose = () => socket$.next(JSON.stringify({name: 'detach'}));

const onFlip = (amount, alternative) => {
    socket$.next(JSON.stringify({name: 'start-new-round'}));    //TODO: implement as a popup
    socket$.next(JSON.stringify({name: 'flip-coin', bet: amount, alternative}));
};

socket$
    .startWith({})
    .scan((acc, curr) => ({...acc, ...curr}), {})
    .do(e => console.log(e))
    .subscribe(
        ({balance, bet, round, result, outcome, win, alternative}) =>
            ReactDOM.render(
                <App balance={balance} bet={bet} alternative={alternative} result={result} outcome={outcome} round={round} win={win} onInit={onInit} onClose={onClose} onFlip={onFlip}/>,
                document.getElementById('root')
            ),
    );

registerServiceWorker();

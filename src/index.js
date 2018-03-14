import React from 'react';
import ReactDOM from 'react-dom';
import { Observable } from 'rxjs';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';


const socket$ = Observable.webSocket('wss://scalaua2018.herokuapp.com/ws');

// TODO: highlight result alternative
// TODO: updated status bar
// TODO: show/hide message
// TODO: lock/unlock flip button on start-new-round

const onInit = () => socket$.next(JSON.stringify({ name: 'attach', session: 'CCC' }));

const onClose = () => socket$.next(JSON.stringify({ name: 'detach' }));

const onNewRound = () => {
    socket$.next(JSON.stringify({ name: 'start-new-round' }));
};

const onFlip = (amount, alternative) => {
    socket$.next(JSON.stringify({ name: 'flip-coin', bet: amount, alternative }));
};

socket$
    .startWith({})
    .scan((acc, curr) => ({ ...acc, ...curr }), {})
    .do(e => console.log(e))
    .subscribe(({
        balance, bet, round, result, outcome, win, alternative, status, name
    }) =>
        ReactDOM.render(
            <App
                alternative={alternative}
                balance={balance}
                bet={bet}
                command={name}
                outcome={outcome}
                result={result}
                round={round}
                status={status}
                win={win}
                onInit={onInit}
                onClose={onClose}
                onFlip={onFlip}
                onNewRound={onNewRound}
            />,
            document.getElementById('root'),
        ));

registerServiceWorker();

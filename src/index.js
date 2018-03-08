import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Observable } from 'rxjs';
import { ServerMessage } from './constants/messageTypes';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { mockServer } from './utils/mockServer';

mockServer;

const socket$ = Observable.webSocket('ws://localhost:9004');

const attached$ = socket$.filter(e => e.name === ServerMessage.ATTACHED).startWith({});

const detached$ = socket$.filter(e => e.name === ServerMessage.DETACHED).startWith({});

const flipped$ = socket$.filter(e => e.name === ServerMessage.FLIPPED).startWith({});

const newRoundStarted$ = socket$.filter(e => e.name === ServerMessage.NEW_ROUND_STARTED).startWith({});

// -----

const balance$ = socket$.filter(e => e.name === ServerMessage.BALANCE_UPDATED).map(e => e.value).startWith(0);

const bet$ = Observable.merge(attached$, flipped$)
    .map(e => e.bet);

const round$ = Observable.merge(attached$, newRoundStarted$)
    .map(e => e.roundId);

const outcome$ = Observable.merge(attached$, flipped$)
    .map(e => e.outcome);

const win$ = Observable.merge(attached$, flipped$)
    .map(e => e.win);

const onInit = () => socket$.next(JSON.stringify({name: 'attach', session: 'AAA'}));

const onClose = () => socket$.next(JSON.stringify({name: 'detach'}));

const onFlip = (amount, alternative) => socket$.next(JSON.stringify({name: 'flip', bet: {amount, alternative}}));

combineLatest(balance$, bet$, round$, outcome$, win$)
    .subscribe(
        ([balance, bet, round, outcome, win]) =>
            ReactDOM.render(
                <App balance={balance} bet={bet} outcome={outcome} round={round} win={win} onInit={onInit} onClose={onClose} onFlip={onFlip}/>,
                document.getElementById('root')
            ),
    );



registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { Observable, Subject } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import { catchError } from 'rxjs/operators';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { ServerMessage } from './constants/messageTypes';

//const socket$ = Observable.webSocket('wss://scalaua2018.herokuapp.com/ws');
const socket$ = Observable.webSocket('ws://localhost:9000/ws');

const internal$ = new Subject();

const session = new URLSearchParams(window.location.search).get('sessionId');

const onInit = () => socket$.next(JSON.stringify({ name: 'attach', session }));

const onClose = () => socket$.next(JSON.stringify({ name: 'detach' }));

const onNewRound = () => {
    socket$.next(JSON.stringify({ name: 'start-new-round' }));
};

const onFlip = (amount, alternative) => {
    socket$.next(JSON.stringify({ name: 'flip-coin', bet: amount, alternative }));
};

const onAlternativeClick = (alternative, bet) =>
    internal$.next({ name: 'alternative-clicked', alternative, bet: bet < 5 ? bet + 1 : 0 });

const onMessageConfirm = () =>
    internal$.next({ name: 'message-confirmed', message: { isVisible: false } });

const state$ = merge(socket$, internal$)
    .pipe(catchError(err =>
        Observable.of({
            name: 'blocked',
            message: {
                isVisible: true,
                isBlocking: true,
                text: `Connectivity issue: (code: ${err.code}, type: ${err.type}, reason: ${err.reason})`,
            },
        })))
    .startWith({
        balance: 0, bet: 0, win: 0, round: 0, status: '', message: { isVisible: false },
    })
    .map(e => e)
    .scan((acc, curr) => {
        switch (curr.name) {
            case ServerMessage.NEW_ROUND_STARTED:
                return {
                    ...acc,
                    ...curr,
                    alternative: null,
                    bet: 0,
                    result: null,
                    isLocked: false,
                    outcome: null,
                    win: 0,
                    showClickToContinue: false,
                };
            case ServerMessage.FLIPPED:
                return {
                    ...acc, ...curr, showClickToContinue: true,
                };
            case ServerMessage.BET_ACCEPTED:
                return { ...acc, ...curr, isLocked: true };
            case ServerMessage.SHOW_DISPOSABLE_MESSAGE:
                return { ...acc, message: { isVisible: true, isBlocking: false, text: curr.message } };
            case ServerMessage.SHOW_BLOCKING_MESSAGE:
                return { ...acc, message: { isVisible: true, isBlocking: true, text: curr.message } };
            case ServerMessage.HIDE_BLOCKING_MESSAGE:
                return { ...acc, message: { isVisible: false } };
            default:
                return { ...acc, ...curr };
        }
    }, {});

state$
    .do(e => console.log(e))
    .subscribe(({
        balance, bet, round, result, outcome, win, alternative,
        status, name, isLocked, showClickToContinue, message,
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
                isLocked={isLocked}
                message={message}
                showClickToContinue={showClickToContinue}
                onInit={onInit}
                onClose={onClose}
                onFlip={onFlip}
                onNewRound={onNewRound}
                onAlternativeClick={onAlternativeClick}
                onMessageConfirm={onMessageConfirm}
            />,
            document.getElementById('root'),
        ));

registerServiceWorker();

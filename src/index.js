import React from 'react';
import ReactDOM from 'react-dom';
import { Observable, Subject } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { ServerMessage } from './constants/messageTypes';

const socket$ = Observable.webSocket('wss://scalaua2018.herokuapp.com/ws');

const internal$ = new Subject();

// TODO: highlight result alternative
// TODO: updated status bar
// TODO: show/hide message

const onInit = () => socket$.next(JSON.stringify({ name: 'attach', session: 'CCC' }));

const onClose = () => socket$.next(JSON.stringify({ name: 'detach' }));

const onNewRound = () => {
    socket$.next(JSON.stringify({ name: 'start-new-round' }));
};

const onFlip = (amount, alternative) => {
    socket$.next(JSON.stringify({ name: 'flip-coin', bet: amount, alternative }));
};

const onAlternativeClick = (alternative, bet) =>
    internal$.next({ name: 'alternative-clicked', alternative, bet: bet < 5 ? bet + 1 : 0 });

const state$ = merge(socket$, internal$)
    .startWith({ bet: 0 })
    .map(e => e)
    .scan((acc, curr) => {
        switch (curr.name) {
            case ServerMessage.NEW_ROUND_STARTED:
                return {
                    ...acc,
                    ...curr,
                    alternative: null,
                    amount: 0,
                    result: null,
                    isLocked: false,
                    showClickToContinue: false,
                };
            case ServerMessage.FLIPPED: // Higlight win
                return {
                    ...acc, ...curr, showClickToContinue: true, outcome: curr.result === acc.alternative ? 'win' : 'lose',
                };
            case ServerMessage.BET_ACCEPTED:
                return { ...acc, ...curr, isLocked: true };
            default:
                return { ...acc, ...curr };
        }
    }, {});

state$
    .do(e => console.log(e))
    .subscribe(({
        balance, bet, round, result, outcome, win, alternative, status, name, isLocked, showClickToContinue,
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
                showClickToContinue={showClickToContinue}
                onInit={onInit}
                onClose={onClose}
                onFlip={onFlip}
                onNewRound={onNewRound}
                onAlternativeClick={onAlternativeClick}
            />,
            document.getElementById('root'),
        ));

registerServiceWorker();

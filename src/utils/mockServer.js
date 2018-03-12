import { Server } from 'mock-socket'
import { ClientMessage } from '../constants/messageTypes';

export const mockServer = new Server('ws://localhost:9004');

mockServer.on('message', server => {
    const response = JSON.parse(server);
    console.log(`SERVER received action: ${response.name}`);
    switch (response.name) {
        case ClientMessage.ATTACH:
            mockServer.send(JSON.stringify(
                {
                    'name': 'attached',
                }
            ));
            break;
        case ClientMessage.FLIP:
            console.log(`SERVER received action: ${response.name} ${response.bet.amount} ${response.bet.alternative}`);
            mockServer.send(JSON.stringify(
                {
                    'name': 'flipped',
                    'result': 'head',
                    'outcome': 'win',
                    'win': 6
                }
            ));
            mockServer.send(JSON.stringify(
                {
                    'name': 'bet-accepted',
                    'bet': {
                        'amount': 3,
                        'alternative': 'head'
                    }
                }
            ));
            mockServer.send(JSON.stringify(
                {
                    'name': 'balance-updated',
                    'value': 29

                }
            ));
            mockServer.send(JSON.stringify(
                {
                    'name': 'status-updated',
                    'value': 'finished'

                }
            ));
            break;
        case ClientMessage.START_NEW_ROUND:
            mockServer.send(JSON.stringify(
                {
                    'name': 'new-round-started',
                    'round': 3
                }
            ));
            break;
        case ClientMessage.DETACH:
            mockServer.send(JSON.stringify(
                {
                    'name': 'detached'
                }
            ));
            break;
        default:
            mockServer.send(JSON.stringify({error: 'unknown message type'}));
    }
});


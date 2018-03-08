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
                    'bet': {  //initial state
                        'amount': 3,
                        'alternative': 'head'
                    },
                    'roundId': 1,
                    'outcome': 'head',
                    'win': 6
                }
            ));
            break;
        case ClientMessage.FLIP:
            console.log(`SERVER received action: ${response.name} ${response.bet.amount} ${response.bet.alternative}`);
            mockServer.send(JSON.stringify(
                {
                    'name': 'flipped',
                    'outcome': 'head',
                    'win': 6
                }
            ));
            mockServer.send(JSON.stringify(
                {
                    'name': 'balance-updated',
                    'value': 29

                }
            ));
            break;
        case ClientMessage.START_NEW_ROUND:
            mockServer.send(JSON.stringify(
                {
                    'name': 'new-round-started',
                    'roundId': 3
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


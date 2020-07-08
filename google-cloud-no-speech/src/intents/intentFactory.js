'use strict';

const DefaultIntentHandler = require('./handlers/DefaultIntentHandler');
const NoInputIntentHandler = require('./handlers/NoInputIntentHandler');

// TODO:  Add additional Intent Handlers here.
const intentHandlers = [
    new NoInputIntentHandler()
];
const defaultIntentHandler = new DefaultIntentHandler();

function getIntentHandler(request) {
    for (let index = 0; index < intentHandlers.length; index++) {
        let intentHandler = intentHandlers[index];

        if (intentHandler.canHandle(request)) {
            return intentHandler;
        }
    }

    return defaultIntentHandler;
}

module.exports = {
    getIntentHandler
};
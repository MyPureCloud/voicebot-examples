'use strict';

const { NO_INPUT_EVENT_NAMES } = require('../GenesysNoInputEventNames');
const { NO_INPUT_COUNT, NO_INPUT_LIMIT } = require('../GenesysParameterNames');

class NoInputIntentHandler {
    constructor() {
    }

    canHandle(request) {
        let retVal = false;

        // Allow this handler to run if the queryText on the queryResult matches any of the
        // Genesys-defined no input event names.
        if (request.body && request.body.queryResult && request.body.queryResult.queryText) {
            retVal = NO_INPUT_EVENT_NAMES.includes(request.body.queryResult.queryText);
        }

        return retVal;
    }

    handle(request, response) {
        if (request.body && request.body.originalDetectIntentRequest && request.body.originalDetectIntentRequest.payload) {
            const originalDetectIntentRequestPayload = request.body.originalDetectIntentRequest.payload;
            const noInputCount = originalDetectIntentRequestPayload[NO_INPUT_COUNT];
            const noInputLimit = originalDetectIntentRequestPayload[NO_INPUT_LIMIT];
            let newFulfillmentText = request.body.queryResult
                ? request.body.queryResult.fulfillmentText || ''
                : '';

            /*
                Additional Notes:
                Genesys-No-Input-Count is 1-based, so the first invocation will have a value of 1.
                    The final invocation will have a value of Genesys-No-Input-Limit + 1.
                You can set endInteraction: true on the return object to end the call sooner.
                    For example, you could end the call when noInputCount == noInputLimit, circumventing
                    one of the no input invocations.
                You can use the outputContexts property of the queryResult to further
                    customize the messages.
            */

            if (noInputCount > noInputLimit) {
                // This will be the final message before the conversation is ended.
                newFulfillmentText = "We seem to be having technical difficulties, please try again later.  Goodbye.";
            }
            else if (noInputCount == noInputLimit) {
                // This is last message before the final message/disconnect.
                newFulfillmentText = "I still didn't get that, please say that again.";
            }
            else if (noInputCount == 1) {
                // This is the initial message.
                newFulfillmentText = "I'm sorry but I didn't get that, could you repeat that?";
            }
            else {
                // This is the second message.
                newFulfillmentText = "I'm sorry but I still didn't get that, could you repeat that again?";
            }

            const newFulfillmentMessages = [
                {
                    text: {
                        text: [
                            newFulfillmentText
                        ]
                    }
                }
            ];

            // Return the new fulfillment text and messages.
            return {
                fulfillmentText: newFulfillmentText,
                fulfillmentMessages: newFulfillmentMessages
            };
        }

        // By returning an empty object, Dialogflow will just use the original unmodified response.
        // Alternatively, you could throw an error, which would cause the calling code to send
        // a 500 error response back to Dialogflow.  In that case, Dialogflow would still use the
        // original unmodified response.
        return {};
    }
}

module.exports = NoInputIntentHandler;
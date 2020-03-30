'use strict';

const { dialogflowFulfillment } = require('../src/dialogflow-fulfillment');

/**
 * AWS Lambda handler (NodeJs Runtime)
 *
 * Reference to Webhook Request Object.
 * https://cloud.google.com/dialogflow/docs/fulfillment-webhook#webhook_request
 *
 * Example:
 *     {
 *       responseId: '56b95ccb-7574-48dc-b27b-74813a9d831a-2e39b744',
 *       queryResult: {
 *         queryText: 'the conversation in jail',
 *         parameters: {},
 *         allRequiredParamsPresent: true,
 *         fulfillmentMessages: [ [Object] ],
 *         outputContexts: [ [Object] ],
 *         intent: {
 *           name: 'projects/fulfillment-ohdkqu/agent/intents/4ab52fdf-b008-40a4-b578-748cf1c310ec',
 *           displayName: 'ANI',
 *           endInteraction: true
 *         },
 *         intentDetectionConfidence: 0.6805271,
 *         languageCode: 'en'
 *       },
 *       originalDetectIntentRequest: {
 *         payload: {
 *           'Genesys-Conversation-Id': '236f876d-0f7c-45de-afd9-309cdd8f6dc7'
 *         }
 *       },
 *       session: 'projects/fulfillment-ohdkqu/agent/sessions/17061485-7c6b-489d-a914-8f431d6bb528'
 *     }
 *
 * @param webHookRequest
 * @returns {Promise<{fulfillmentText: string}|{fulfillmentText: *}>}
 */

/**
 *  Test Code.
 */

const event_weather = {
    responseId: '97b91b20-d221-4672-abdc-2b11c0fca704-19db3199',
    queryResult: {
        queryText: '46074',
        action: 'weather.zipcode',
        parameters: { zipcode: '46074' },
        allRequiredParamsPresent: true,
        fulfillmentMessages: [ [Object] ],
        outputContexts: [ [Object] ],
        intent: {
            name: 'projects/fulfillment-ohdkqu/agent/intents/03185cb9-cc37-4b85-b65a-4476affd5d3a',
            displayName: 'Weather',
            endInteraction: true
        },
        intentDetectionConfidence: 1,
        languageCode: 'en'
    },
    originalDetectIntentRequest: {
        payload: {
            'Genesys-Conversation-Id': '47d3e184-bc39-475d-92a7-e9c3b736e21e'
        }
    },
    session: 'projects/fulfillment-ohdkqu/agent/sessions/b52134e3-ed88-4635-934a-a984e08bd076'
}

const event_converstaion = {
    responseId: '1aeb8cca-af80-4a6b-bcbf-977fceb35c43-19db3199',
    queryResult: {
        queryText: 'conversation',
        parameters: {},
        allRequiredParamsPresent: true,
        fulfillmentMessages: [ [Object] ],
        outputContexts: [ [Object] ],
        intent: {
            name: 'projects/fulfillment-ohdkqu/agent/intents/4ab52fdf-b008-40a4-b578-748cf1c310ec',
            displayName: 'ANI',
            endInteraction: true
        },
        intentDetectionConfidence: 1,
        languageCode: 'en'
    },
    originalDetectIntentRequest: {
        payload: {
            'Genesys-Conversation-Id': '204dde4c-1074-42dd-af28-5f45de557439'
        }
    },
    session: 'projects/fulfillment-ohdkqu/agent/sessions/99c1e3f7-dc9e-480f-a9d7-344bfaec5716'
};

const event_participants = {
    responseId: '1aeb8cca-af80-4a6b-bcbf-977fceb35c43-19db3199',
    queryResult: {
        queryText: 'conversation',
        parameters: {},
        allRequiredParamsPresent: true,
        fulfillmentMessages: [ [Object] ],
        outputContexts: [ [Object] ],
        intent: {
            name: 'projects/fulfillment-ohdkqu/agent/intents/4ab52fdf-b008-40a4-b578-748cf1c310ec',
            displayName: 'Participants',
            endInteraction: true
        },
        intentDetectionConfidence: 1,
        languageCode: 'en'
    },
    originalDetectIntentRequest: {
        payload: {
            'Genesys-Conversation-Id': '204dde4c-1074-42dd-af28-5f45de557439'
        }
    },
    session: 'projects/fulfillment-ohdkqu/agent/sessions/99c1e3f7-dc9e-480f-a9d7-344bfaec5716'
};

(async function() {
    let response;
    try {
        response = await dialogflowFulfillment(event_participants);
        console.log('Webhook Response Object:', response);
        response = await dialogflowFulfillment(event_converstaion);
        console.log('Webhook Response Object:', response);
        response = await dialogflowFulfillment(event_weather);
        console.log('Webhook Response Object:', response);
    } catch (err) {
        console.error('Test failed', err);
    } finally {
        console.log('dialogflowFulfillment is done successfully.');
    }
})();

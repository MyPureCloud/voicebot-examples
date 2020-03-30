'use strict';

const { dialogflowFulfillment } = require('./src/dialogflow-fulfillment');

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

exports.handler = async (webHookRequest) => {
    try {
        const fulfillmentText = await dialogflowFulfillment(webHookRequest);
        const response = {
            fulfillmentText
        };
        console.log('Webhook Response Object', response);
        return response;
    } catch(err) {
        console.error(err);
        return {
            fulfillmentText: `Something went wrong while processing dialogFlow fulfillment. - ${err.message}`
        };
    }
};

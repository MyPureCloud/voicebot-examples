'use strict';

const {
    filter,
    isEqual,
    isEmpty
} = require('lodash');
const {
    requestANI,
    requestParticipants,
    requestPatchAttributes,
    requestFullNameByUserId
} = require('./public-api-v2/public-api-v2-requests');
const {
    requestWeatherByZipcode
} = require('./third-party-api/third-party-api-requests');

const CONVERSATION_ID_KEY = 'Genesys-Conversation-Id';

/**
 *
 * Main Webhook Request/Response Handler.
 *
 *  Parse event input as Webhook Request Object and dispatch it to an associated handler.
 *  Eventually, the handler will return Webhook Response Object.
 *
 *  It uses "queryResult.intent.displayName" from event input to choose a right handler.
 *
 *     For more details on Webhook Request Object, follow the URL below.
 *         https://cloud.google.com/dialogflow/docs/fulfillment-webhook#webhook_request
 *
 *     For more details on Webhook Response object, follow the URL below.
 *         https://cloud.google.com/dialogflow/docs/fulfillment-webhook#webhook_response
 *
 * @param event
 * @returns {Promise<string>}
 */
async function dialogflowFulfillment(event) {
    console.log('Webhook Request Object:', event);

    const intentDisplayName = getIntentDisplayName(event);
    if(isEmpty(intentDisplayName)) {
        const message = 'No intent displayName';
        throw new Error(message);
    }
    switch (intentDisplayName) {
        case "ANI" :
            return await handleANIAsync(event);
        case "Participants" :
            return await handleParticipantsAsync(event);
        case "Weather" :
            return await handleWeatherAsync(event);
        case "MemberInfo" :
            return await handleUserInfoAsync(event);
        default:
            throw new Error(`Not supported for Intent: ${intentDisplayName}`);
    }
}

/**
 * Helper function to get a display name from a Webhook Request input.
 *
 * @param event
 * @returns {undefined|string}
 */
function getIntentDisplayName(event) {
    if(event && event.queryResult && event.queryResult.intent){
        return event.queryResult.intent.displayName;
    }
    return undefined;
}

/**
 * Helper function to get a conversation id from a Webhook Request input.
 *
 * @param event
 * @returns {undefined|*}
 */
function getConversationId(event) {
    if(event && event.originalDetectIntentRequest && event.originalDetectIntentRequest.payload) {
        return event.originalDetectIntentRequest.payload[CONVERSATION_ID_KEY];
    }
    return undefined;
}

/**
 * Handler for ANI intent.
 *
 * @param event
 * @returns {Promise<string>}
 */
async function handleANIAsync(event) {
    const conversationId = getConversationId(event);
    if(isEmpty(conversationId)) {
        throw new Error('Missing conversation ID');
    }

    // Fetch ANI value given the conversationId via Public API V2.
    const result = await requestANI(conversationId);

    // Build Webhook Response object and return it.
    return `Your ANI is ${result.ani}.`;
}

/**
 *
 * Handler for Participants intent.
 *
 * @param event
 * @returns {Promise<string>}
 */
async function handleParticipantsAsync(event) {
    const conversationId = getConversationId(event);
    if(isEmpty(conversationId)) {
        throw new Error('Missing conversation ID');
    }

    // Step 1:
    // Fetch all participants given the conversationId via Public API V2.
    let result;
    try {
        result = await requestParticipants(conversationId);
    } catch(err) {
        throw new Error('Unable to get participants.');
    }

    // Step 2:
    // Filter out the internal participant among all participants given the conversation id.
    let internalParticipant;
    try {
        internalParticipant = filter(
            result.participants, item => item.participantType === 'Internal'
        )[0];
    } catch (err) {
        throw new Error('Unable to find internal type participant.');
    }

    // Step 3:
    // Writing custom attributes for the internal participant.
    const exampleAttributes = {
        attributes: {
            favoriteColor: 'Green',
            favoriteSports: 'Soccer'
        }
    };

    let participantPatched;
    try {
        participantPatched = await requestPatchAttributes(
            conversationId,
            internalParticipant.id,
            exampleAttributes);
    } catch(err) {
        throw new Error('Unable to patch attributes.');
    }

    // Step 4:
    // Compare the previous exampleAttributes with the return value of requestPatchAttributes invocation
    // to see if reading/writing operations were successful.
    let fulfillmentText = 'Reading writing participant information failed.';
    if (isEqual(participantPatched.attributes, exampleAttributes.attributes)) {
       fulfillmentText =  'Reading writing participant information went successful.';
    }

    // Build Webhook Response object and return it.
    return fulfillmentText;
}

/**
 * Helper function to get a zipcode from Webhook Request input.
 *
 * @param event
 * @returns {string|string|*|undefined}
 */
function getZipCode(event) {
    if(event && event.queryResult && event.queryResult.parameters) {
        return event.queryResult.parameters["zipcode"];
    }
    return undefined;
}

/**
 * Handler for Weather intent.
 *
 * @param event
 * @returns {Promise<string>}
 */
async function handleWeatherAsync(event) {
    const zipCode = getZipCode(event);
    if(isEmpty(zipCode)) {
        throw new Error('Missing zip code');
    }

    // Fetch current weather given the zipcode via 3rd-party weather service called openweathermap.org.
    const result = await requestWeatherByZipcode(zipCode);

    // Build Webhook Response object and return it.
    return `Today's weather is ${result.weather}`;
}

/**
 * Helper function to get a user id from a Webhook Request input.
 *
 * @param event
 * @returns {undefined|*}
 */
function getUserId(event) {
    if(event && event.queryResult && event.queryResult.parameters) {
        return event.queryResult.parameters["userId"];
    }
    return undefined;
}

/**
 * Handler for MemberInfo intent.
 *
 * @param event
 * @returns {Promise<string>}
 */
async function handleUserInfoAsync(event) {
    const userId = getUserId(event);
    if(!userId) {
        throw new Error('Missing User ID');
    }

    const result = await requestFullNameByUserId(userId);
    return `Your name is ${result.fullName}.`;
}

/**
 * @type {{dialogflowFulfillment: dialogflowFulfillment}}
 */
module.exports = {
    dialogflowFulfillment
};

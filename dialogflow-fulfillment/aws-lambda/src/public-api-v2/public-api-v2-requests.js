'use strict';

const {
    usersApi,
    conversationsApi,
    authClientCredentialsGrant,
    clearAuthData
} = require('./auth/authorization');

/**
 *
 * Get ANI given conversation id.
 *
 * @param conversationId
 * @returns {Promise<{ani: *}>}
 *
 * Required Permissions:
 *   analytics:conversationDetail:view
 */
async function requestANI(conversationId) {
    try {
        await authClientCredentialsGrant();
        const response = await conversationsApi.getAnalyticsConversationDetails(conversationId);

        return {
            ani: response.participants[0].sessions[0].ani
        };
    } catch(err) {
        clearAuthData();
        throw new Error(err);
    }
}

/**
 *
 * Get all participants given conversation id.
 *
 * @param conversationId
 * @returns {Promise<{participants: *}>}
 *
 * Required Permissions:
 *   conversation:communication:view
 */
async function requestParticipants(conversationId) {
    try {
        await authClientCredentialsGrant();
        const response = await conversationsApi.getConversation(conversationId);

        const participants = response.participants;
        return {
            participants
        };
    } catch(err) {
        clearAuthData();
        throw new Error(err);
    }
}

/**
 *
 * Make a Patch request for adding attributes (Map<key:value>)
 *
 * @param conversationId
 * @param participantId
 * @param attributes
 *  {
 *      "attributes": {
 *           "": ""
 *      }
 *  }
 * @returns {Promise<*>}
 */
async function requestPatchAttributes(conversationId, participantId, attributes) {
    try {
        await authClientCredentialsGrant();
        return await conversationsApi.patchConversationParticipantAttributes(
            conversationId,
            participantId,
            attributes);
    } catch(err) {
        clearAuthData();
        throw new Error(err);
    }
}

/**
 * Request Full Name by userId.
 *
 * @param userId
 * @returns {Promise<{fullName: *}>}
 *
 * Required Permissions:
 *   No permissions required.
 */
async function requestFullNameByUserId(userId) {
    try {
        await authClientCredentialsGrant();
        const response = await usersApi.getUser(userId);

        return {
            fullName: response.name
        };
    } catch(err) {
        clearAuthData();
        throw new Error(err);
    }
}

/**
 * @type {{requestParticipants: requestParticipants, requestANI: requestANI, requestFullNameByUserId: requestFullNameByUserId, requestPatchAttributes: requestPatchAttributes}}
 */
module.exports = {
    requestANI,
    requestParticipants,
    requestPatchAttributes,
    requestFullNameByUserId
};

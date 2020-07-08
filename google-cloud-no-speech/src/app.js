'use strict';

const { getIntentHandler } = require('./intents/intentFactory');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} request Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} response Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.handleRequest = (request, response) => {
    try {
        const contentObject = handleRequestImpl(request, response);

        response.status(200).json(contentObject);
    } catch (ex) {
        const errorObject = {
            error: {
                message: ex
            }
        };

        response.status(500).json(errorObject);
    }
};

function handleRequestImpl(request, response) {
    return getIntentHandler(request).handle(request, response);
}
'use strict';

const { isEmpty } = require('lodash');

/**
 * Import PureCloud-Platform-Client-SDK for Javascript.
 *
 * URL of the repository:
 *    https://github.com/MyPureCloud/platform-client-sdk-javascript
 */
const {
    ApiClient,
    UsersApi,
    ConversationsApi,
    PureCloudRegionHosts
} = require('purecloud-platform-client-v2');

/**
 * Get CLIENT_ID, CLIENT_SECRET, ENVIRONMENT from Nodejs Environment Variables.
 *
 * You can get the both values after creating an Oauth client following the instruction below.
 *   Genesys Cloud Oauth Client Credentials grant type:
 *   https://help.mypurecloud.com/articles/create-an-oauth-client/
 */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ENVIRONMENT = process.env.ENVIRONMENT;
console.log(`CLIENT_ID : ${CLIENT_ID}`);
console.log(`CLIENT_SECRET: ${CLIENT_SECRET}`);
console.log(`ENVIRONMENT: ${ENVIRONMENT}`);

/**
 * Supported Regions of PureCloudRegionHosts for ENVIRONMENT.
 *
 * us_east_1 --> Default to mypurecloud.com
 * eu_west_1
 * ap_southeast_2
 * ap_northeast_1
 * eu_central_1
 * us_west_2
 * ca_central_1
 * ap_northeast_2
 * eu_west_2
 */

/**
 * Get the instance of ApiClient.
 * @type {ApiClient}
 */
const client = ApiClient.instance;

/**
 * Set current environment of the ApiClient
 * depending on the value of ENVIRONMENT variable.
 */
((env) => {
    try {
        client.setEnvironment(PureCloudRegionHosts[env]);
    } catch(err) {
        client.setEnvironment(PureCloudRegionHosts.us_east_1);
    }
})(ENVIRONMENT);

/**
 * Cache for Oauth Client Credentials Grant.
 */
let authData;

/**
 * Authenticate Oauth Client Credentials Grant Type.
 * Get AuthData including Access Token (JWT).
 *
 * @returns {Promise<*>}
 */
async function authClientCredentialsGrant() {
    if (isEmpty(authData)) {
        authData = await client.loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET);
    }
    return authData;
}

/**
 * Clear AuthData cache.
 */
function clearAuthData() {
    authData = null;
}

/**
 * @type {{authClientCredentialsGrant: (function(): *), conversationsApi: ConversationsApi, clearAuthData: clearAuthData, usersApi: UsersApi}}
 */
module.exports = {
    clearAuthData,
    authClientCredentialsGrant,
    usersApi: new UsersApi(),
    conversationsApi: new ConversationsApi()
};

'use strict';

const request = require('request');
const { promisify } = require('util');

const requestAsync = promisify(request).bind(request);

/**
 * ToDo:
 * The default value of OPEN_WEATHER_APP_ID here belongs to PureConnect AtomicTangerine Team.
 * Please go to the following URL to create your own AppId and revise the default value.
 * https://openweathermap.org/appid
*/
const OPEN_WEATHER_APP_ID = process.env.OPEN_WEATHER_APP_ID || 'b4dbd673830bc2e4614790d08e405eb8';
console.log(`OPEN_WEATHER_APP_ID: ${OPEN_WEATHER_APP_ID}`);

/**
 * Get Weather Information by Zip code.
 *
 * Use third party APIs service. Refer to the following URL for more details.
 * https://openweathermap.org/current
 *
 * @returns {Promise<string>}
 */
async function requestWeatherByZipcode(zipCode) {
    const countryCode = 'us';

    const appId = OPEN_WEATHER_APP_ID;

    // Request Endpoint.
    const requestEndpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${appId}`;

    // GET HTTP Headers.
    const getOptions = {
        method: 'GET',
        url: requestEndpoint
    };

    // Make a request.
    let response = await requestAsync(getOptions);
    if (response.statusCode !== 200) {
        throw new Error(`requestWeatherByZipcode failed for zipCode:${zipCode}`);
    }

    // Return a response.
    return {
        weather: JSON.parse(response.body).weather[0].description
    };
}

/**
 * @type {{requestWeatherByZipcode: requestWeatherByZipcode}}
 */
module.exports = {
    requestWeatherByZipcode
};

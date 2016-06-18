/**
 * @module utils/request
 */

import got from 'got';
import xml2js from 'xml2js-es6-promise';
import cleanApiData from './clean-api-data';

const debug = require('debug')('node-anime-list:request');

/**
 * @function requestRaw
 * @description Request a raw response.body from a MAL webpage
 *
 * @param  {authToken} authToken
 * @param  {string} url = '/' - Pathname
 * @param  {object} query = {} - Query object
 * @return {Promise} - A Promise that resolves to the raw request body
 */
export function requestRaw(authToken, url = '/', query = {}) {
	debug('Requesting %s with query', url, query);
	debug('Using auth:', `Basic ${authToken}`);
	return got(`http://myanimelist.net${url}`, {
		query,
		headers: {
			Authorization: `Basic ${authToken}`,
		},
	});
}

// TODO: function requestHtml()

/**
 * @function requestApi
 * @description Request MAL's API XML, then parses as JSON and clean it
 * @see module:utils/cleanApiData
 * @see module:utils/flattenObject
 *
 * @param  {authToken} authToken
 * @param  {string} url = '/' - Pathname
 * @param  {object} query = {} - Query object
 * @return {Promise} - A Promise that resolves to a parsed as JSON and
 * cleaned version of MAL's API response
 */
export function requestApi(authToken, url = '/', query = {}) {
	if (!authToken) {
		debug('Not authenticated');
		throw new Error('Must have username and password set to access the API');
	}

	return requestRaw(authToken, `/api${url}`, query)
		.then(res => xml2js(res.body))
		.then(parsedXml => Promise.resolve(cleanApiData(parsedXml)));
}

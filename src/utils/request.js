import got from 'got';
import xml2js from 'xml2js-es6-promise';
import cleanApiData from './clean-api-data';

const debug = require('debug')('popura:request');

/**
 * Request a raw response.body from a MAL webpage
 *
 * @param  {string} - Basic Authentication token
 * @param  {string} url = '/'
 * @param  {object} query = {}
 * @return {Promise} - Resolves to the raw request body
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
 * Request MAL's API XML, then parses as JSON and clean it
 *
 * @param  {string} - Basic Authentication token
 * @param  {string} url = '/'
 * @param  {object} query = {}
 * @return {Promise} - Resolves to a parsed as JSON and
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

import got from 'got';
import xml2js from 'xml2js-es6-promise';
import cleanApiData from './clean-api-data';

const debug = require('debug')('node-anime-list:request');

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

export function requestApi(authToken, url = '/', query = {}) {
	if (!authToken) {
		debug('Not authenticated');
		throw new Error('Must have username and password set to access the API');
	}

	return requestRaw(authToken, `/api${url}`, query)
		.then(res => xml2js(res.body))
		.then(parsedXml => Promise.resolve(cleanApiData(parsedXml)));
}

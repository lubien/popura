import xml2js from 'xml2js-es6-promise';
import request from '../utils/request';
import cleanApiData from '../utils/clean-api-data';

const debug = require('debug')('node-anime-list:requester');

export default function requester(state) {
	return {
		_requestHtml(url = '/', query = {}) {
			return request(state.authToken, url, query);
		},

		_requestApi(url, query = {}) {
			debug('API request');

			if (!state.username || !state.authToken) {
				debug('Not authenticated');
				throw new Error('Must have username and password set to access the API');
			}

			return request(state.authToken, `/api${url}`, query)
				.then(res => xml2js(res.body))
				.then(parsedXml => Promise.resolve(cleanApiData(parsedXml)));
		}
	};
}

import got from 'got';
import {
	xmlParser,
	xmlBuilder,
	cleanApiData,
	cleanListData,
} from './';

const debug = require('debug')('popura:request');
const pkg = require('../../package.json');

const userAgent = `popura/${pkg.version} (https://github.com/lubien/popura)`;

/**
 * HTTP Request a page from MAL
 *
 * @param  {string} - Basic Authentication token
 * @param  {string} url = '/'
 * @param  {object} opts = {} - Request options
 * @return {Promise} - Resolves to the raw request body
 */
export function requestRaw(authToken, url = '/', opts = {}) {
	debug(
		`Requesting ${url} with. Use auth: ${Boolean(authToken)}. Query`,
		opts.query
	);
	return got(`http://myanimelist.net${url}`, Object.assign(opts, {
		headers: {
			Authorization: `Basic ${authToken}`,
			'User-Agent': userAgent,
		},
	}));
}

/**
 * Request MAL's API XML, then parses as JSON and clean it
 *
 * @param  {string} - Basic Authentication token
 * @param  {string} url = '/'
 * @param  {object} opts = {} - Request options
 * @return {Promise} - Resolves to a parsed as JSON and
 * cleaned version of MAL's API response
 */
export function requestApi(authToken, url = '/', opts = {}) {
	if (!authToken) {
		debug('Not authenticated');
		throw new Error('Must have username and password set to access the API');
	}

	return requestRaw(authToken, `/api${url}`, opts)
		.then(res => xmlParser(res.body))
		.then(parsedXml => Promise.resolve(cleanApiData(parsedXml)));
}

/**
 * Request an user anime/manga list
 *
 * @param  {string} authToken - Basic Authentication token
 * @param  {string} type - List type: 'anime' or 'manga'
 * @param  {string} username - MAL username
 * @return {Promise} - Resolves to {myinfo: {...}, list: [...]}
 * where myinfo constains info about the user and the list.
 */
export function requestList(authToken, type, username) {
	debug(`Requesting ${type}list of ${username}`);
	return requestRaw(authToken, '/malappinfo.php', {
		query: {
			u: username,
			type,
		},
	})
		.then(res => xmlParser(res.body))
		.then(parsedXml => {
			if (parsedXml.error) {
				throw new Error(parsedXml.error);
			}
			return Promise.resolve(parsedXml);
		})
		.then(parsedXml => Promise.resolve(cleanListData(parsedXml)));
}

/**
 * Sends XML to the MAL API
 *
 * @param  {string} - Basic Authentication token
 * @param  {string} url = '/'
 * @param  {object} opts = {} - Request options
 * @return {Promise} - Resolves to the raw request.body
 */
export function postXml(authToken, url = '/', {values = false, expects = false}) {
	debug(`Posting in MAL's API at ${url}`);

	let checkerFunction;
	if (expects) {
		if (typeof expects === 'string') {
			checkerFunction = body => body.includes(expects);
		} else {
			checkerFunction = expects;
		}
	}

	return got(`http://myanimelist.net/api${url}`, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${authToken}`,
			'User-Agent': userAgent,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: values ? {data: xmlBuilder(values)} : false,
	})
		.then(res => {
			const body = res.body || '';
			if (expects && !checkerFunction(body)) {
				debug(`Post was expecting ${expects} instead got`, body);
				throw new Error(`Unespected return from MAL server posting at ${url}`);
			}
			Promise.resolve(body);
		});
}

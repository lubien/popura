import got from 'got';
import {
	xmlParser,
	xmlBuilder,
	cleanApiData,
	cleanListData,
} from './';

const debug = require('debug')('popura:request');
const {version} = require('../../package.json');

const userAgent = `popura/${version} (https://github.com/lubien/popura)`;

/**
 * HTTP Request a page from MAL
 *
 * @param  {string} - Basic Authentication token
 * @param  {string} url = '/'
 * @param  {object} opts = {} - Request options
 * @return {Promise} - Resolves to the raw request body
 */
export function request(authToken, url = '/', opts = {}) {
	debug(
		`Requesting ${url} with. Use auth: ${Boolean(authToken)}. Query`,
		opts.query
	);
	return got(`http://myanimelist.net${url}`, Object.assign(opts, {
		headers: {
			Authorization: `Basic ${authToken}`,
			'User-Agent': userAgent,
			'Content-Type': opts.method === 'POST' ? 'application/x-www-form-urlencoded' : false,
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
export function get(authToken, url = '/', opts = {}) {
	if (!authToken) {
		debug('Not authenticated');
		throw new Error('Must have username and password set to access the API');
	}

	return request(authToken, `/api${url}`, opts)
		.then(({body}) => xmlParser(body))
		.then(cleanApiData);
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
export function list(authToken, type, username) {
	debug(`Requesting ${type}list of ${username}`);
	return request(authToken, '/malappinfo.php', {
		query: {
			u: username,
			type,
		},
	})
		.then(({body}) => xmlParser(body))
		.then(parsed => {
			if (parsed.error) {
				throw new Error(parsed.error);
			}
			return parsed;
		})
		.then(cleanListData);
}

/**
 * Sends XML to the MAL API
 *
 * @param  {string} - Basic Authentication token
 * @param  {string} url = '/'
 * @param  {object} opts = {} - Request options
 * @return {Promise} - Resolves to the raw request.body
 */
export function post(authToken, url = '/', {values = false, expects = false}) {
	debug(`Posting in MAL's API at ${url}`);

	return request(authToken, `/api${url}`, {
		method: 'POST',
		body: values ? {data: xmlBuilder(values)} : false,
	})
		.then(({body = ''}) => {
			if (expects && !expects(body)) {
				debug(`Body did not match test function`, body);
				throw new Error(`Unespected return from MAL server posting at ${url}`);
			}
			return body;
		});
}

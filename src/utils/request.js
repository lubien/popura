import got from 'got';

const debug = require('debug')('popura:request');
const {version} = require('../../package.json');

const userAgent = `popura/${version} (https://github.com/lubien/popura)`;

/**
 * HTTP Request a page from MAL
 *
 * @param  {string} authToken - Basic Authentication token
 * @param  {string} url = '/'
 * @param  {object} opts = {} - Request options
 * @return {Promise} - Resolves to the raw request body
 */
export default function request(authToken, url = '/', opts = {}) {
	debug(
		`Requesting ${url} with. Use auth: ${Boolean(authToken)}. Query`,
		opts.query
	);
	return got(`https://myanimelist.net${url}`, Object.assign(opts, {
		headers: {
			Authorization: `Basic ${authToken}`,
			'User-Agent': userAgent,
			'Content-Type': opts.method === 'POST' ? 'application/x-www-form-urlencoded' : false,
		},
	}));
}


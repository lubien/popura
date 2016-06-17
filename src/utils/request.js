import got from 'got';

const debug = require('debug')('node-anime-list:request');

export default function request(authToken, url = '/', query = {}) {
	debug('Requesting %s with query', url, query);
	debug('Using auth:', `Basic ${authToken}`);
	return got(`http://myanimelist.net${url}`, {
		query,
		headers: {
			Authorization: `Basic ${authToken}`,
		},
	});
}

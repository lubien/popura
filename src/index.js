import authenticable from './composers/authenticable';
import searchable from './composers/searchable';

const debug = require('debug')('node-anime-list:mal');

/**
 * Factory function that composes an instance of node-anime-list
 *
 * @param  {string} username = ''
 * @param  {string} password = ''
 * @return {object} - node-anime-list instance
 */
export default function malFactory(username = '', password = '') {
	debug(
		`New mal client user '${username}'. Use password = ${Boolean(password)}`
	);

	const state = {
		username,
		password,
		authToken: '',
	};

	return Object.assign({},
		authenticable(state),
		searchable(state)
	);
}

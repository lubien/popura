import authenticable from './composers/authenticable';
import searchable from './composers/searchable';

const debug = require('debug')('popura:mal');

/**
 * Factory function that composes an instance of popura
 *
 * @param  {string} username = ''
 * @param  {string} password = ''
 * @return {object} - popura instance
 */
export default function popuraFactory(username = '', password = '') {
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

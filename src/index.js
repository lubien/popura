import authenticable from './composers/authenticable';
import searchable from './composers/searchable';
import listable from './composers/listable';

const debug = require('debug')('popura:factory');

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
		searchable(state),
		listable(state)
	);
}

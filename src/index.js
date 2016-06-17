import authenticable from './composers/authenticable';
import searchable from './composers/searchable';

const debug = require('debug')('node-anime-list:mal');

export default function mal(username = '', password = '') {
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

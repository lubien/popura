import authenticable from './composers/authenticable';
import searchable from './composers/searchable';
import requester from './composers/requester';

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
		requester(state),
		authenticable(state),
		searchable(state)
	);
}

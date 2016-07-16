import Popura from './popura';

const debug = require('debug')('popura:factory');

/**
 * Factory function that returns an instance of popura
 *
 * @param  {string} username = ''
 * @param  {string} password = ''
 * @return {object} - popura instance
 */
export default function popuraFactory(username = '', password = '') {
	debug(
		`New mal client user '${username}'. Use password = ${Boolean(password)}`
	);

	return new Popura(username, password);
}

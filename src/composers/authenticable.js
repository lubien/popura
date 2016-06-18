import generateAuthToken from '../utils/generate-auth-token';
import {requestApi} from '../utils/request';

const debug = require('debug')('node-anime-list:authenticable');

/**
 * Composes an authenticable object
 *
 * @param  {object} state
 * @return {object} - An object that can authenticate to MAL
 */
export default function authenticable(state) {
	state.authToken = generateAuthToken(state.username, state.password);
	return {
		/**
		 * Return the current user's username
		 *
		 * @return {string}
		 */
		getUser() {
			return state.username;
		},

		/**
		 * Change the current user in this client instance
		 *
		 * @param  {string} username
		 * @param  {string} password
		 * @return {this}
		 */
		setUser(username, password) {
			debug(`Setting '${username}' as user. Use pass = ${Boolean(password)}`);
			state.username = username;
			state.password = password;
			state.authToken = generateAuthToken(username, password);

			return this;
		},

		/**
		 * Check if this user is valid
		 *
		 * @return {Promise} - Resolve to this user's username and ID
		 * or throws.
		 */
		verifyCredentials() {
			if (!state.username || !state.authToken) {
				debug('Tried to verify a null user');
				throw new Error(`Can't verify a null user`);
			}

			debug(`Verifying credentials for '${state.username}'`);
			return requestApi(state.authToken, '/account/verify_credentials.xml');
		},
	};
}

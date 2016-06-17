import generateAuthToken from '../utils/generate-auth-token';

const debug = require('debug')('node-anime-list:authenticable');

export default function authenticable(state) {
	state.authToken = generateAuthToken(state.username, state.password);
	return {
		getUser() {
			return state.username;
		},

		setUser(username, password) {
			debug(`Setting '${username}' as user. Use pass = ${Boolean(password)}`);
			state.username = username;
			state.password = password;
			state.authToken = generateAuthToken(username, password);

			return this;
		},

		verifyCredentials() {
			if (!state.username || !state.authToken) {
				debug('Tried to verify a null user');
				throw new Error(`Can't verify a null user`);
			}

			debug(`Verifying credentials for '${state.username}'`);
			return this._requestApi('/account/verify_credentials.xml');
		}
	};
}

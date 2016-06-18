/**
 * @typedef {string} authToken
 * @description Base64 encoded `${user}:${pass}` string for Basic Authentication
 */

/**
 * @module utils/generateAuthToken
 * @description Generates an {@link authToken}
 *
 * @param  {string} username - MAL username
 * @param  {string} password - MAL password
 * @return {authToken}
 */
export default function generateAuthToken(username, password) {
	return new Buffer(`${username}:${password}`).toString('base64');
}

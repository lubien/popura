/**
 * @param  {string} username - MAL username
 * @param  {string} password - MAL password
 * @return {string} - Basic Authentication token
 */
export default function generateAuthToken(username, password) {
	return new Buffer(`${username}:${password}`).toString('base64');
}

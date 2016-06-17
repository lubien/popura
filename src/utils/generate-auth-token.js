export default function generateAuthToken(username, password) {
	return new Buffer(`${username}:${password}`).toString('base64');
}

import test from 'ava';
import {requestRaw, requestApi} from '../../src/utils/request';
import generateAuthToken from '../../src/utils/generate-auth-token';
// There's a trick in this import below
// In instance we setup dotenv, so here
// we are just "importing" it.
import '../instance';

const authToken = generateAuthToken(
	process.env.MAL_USER,
	process.env.MAL_PASS
);

test('Can request homepage', t => {
	t.notThrows(requestRaw(authToken, '/'));
});

test('Requesting a non-existant page throws', t => {
	t.throws(requestRaw(authToken, '/foo/bar/madoka'));
});

test('Requesting API should work if loggedin', t => {
	t.notThrows(requestApi(authToken, '/account/verify_credentials.xml'));
});

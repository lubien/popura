import test from 'ava';
import {requestRaw, requestApi} from '../../src/utils/request';
import {authToken} from '../mock';

test('Can request homepage', t => {
	t.notThrows(requestRaw(authToken, '/'));
});

test('Requesting a non-existant page throws', t => {
	t.throws(requestRaw(authToken, '/foo/bar/madoka'));
});

test('Requesting API should work if loggedin', t => {
	t.notThrows(requestApi(authToken, '/account/verify_credentials.xml'));
});

import test from 'ava';
import {requestRaw, get, requestList} from '../../src/utils/request';
import {authToken} from '../mock';

test('Can request homepage', t => {
	t.notThrows(requestRaw(authToken, '/'));
});

test('Requesting a non-existant page throws', t => {
	t.throws(requestRaw(authToken, '/foo/bar/madoka'));
});

test('Requesting API should work if loggedin', t => {
	t.notThrows(get(authToken, '/account/verify_credentials.xml'));
});

test(`Can request an user's anime and manga lists`, t => {
	t.notThrows(requestList(authToken, 'anime', 'lubien'));
	t.notThrows(requestList(authToken, 'anime', 'lubien'));
});

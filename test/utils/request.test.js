import test from 'ava';
import {request, get, list} from '../../src/utils/request';
import {authToken} from '../mock';

test('Can request homepage', t => {
	t.notThrows(request(authToken, '/'));
});

test('Requesting a non-existant page throws', t => {
	t.throws(request(authToken, '/foo/bar/madoka'));
});

test('Requesting API should work if loggedin', t => {
	t.notThrows(get(authToken, '/account/verify_credentials.xml'));
});

test(`Can request an user's anime and manga lists`, t => {
	t.notThrows(list(authToken, 'anime', 'lubien'));
	t.notThrows(list(authToken, 'anime', 'lubien'));
});

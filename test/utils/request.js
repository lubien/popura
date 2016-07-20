import test from 'ava';
import request from '../../src/utils/request';
import {authToken} from '../helpers';

test('Can request homepage', t => {
	t.notThrows(request(authToken, '/'));
});

test('Requesting a non-existant page throws', t => {
	t.throws(request(authToken, '/foo/bar/madoka'));
});

test('Requesting API should work if loggedin', t => {
	t.notThrows(request(authToken, '/api/account/verify_credentials.xml'));
});


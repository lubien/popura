import test from 'ava';
import generateAuthToken from '../../src/utils/generate-auth-token';

test('Given an username and a password, return a base64-encoded token', t => {
	t.is(generateAuthToken('foo', 'bar'), 'Zm9vOmJhcg==');
});

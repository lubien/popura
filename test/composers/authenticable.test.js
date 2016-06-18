import test from 'ava';
import popura from '../../src';
import {instance} from '../mock';
import authenticable from '../../src/composers/authenticable';

test('Authenticable displays your username from state', t => {
	const state = {username: 'lubien'};
	t.is(authenticable(state).getUser(), 'lubien');
});

test('You can reset the username and password', t => {
	const obj = authenticable({
		username: 'lubien',
		password: '',
	});

	obj.setUser('newuser', 'newpass');
	t.is(obj.getUser(), 'newuser');
});

test('You can verify your auth', async t => {
	const credentials = await instance.verifyCredentials();
	t.is(credentials.username, instance.getUser());
});

test('Verifying an dummy user will throw', t => {
	t.throws(popura('dummy', 'dummy').verifyCredentials());
});

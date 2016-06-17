import test from 'ava';
import mal from '../../src';
import instance from '../instance';

test('Can request HTML from site', async t => {
	const homepage = await instance._requestHtml('/');
	t.truthy(homepage);
});

test('Can request XML from API', async t => {
	const search = await instance._requestApi('/anime/search.xml', {
		q: 'Full metal',
	});
	t.truthy(search);
});

test(`Can't request API without being authenticated`, async t => {
	try {
		const instanceWithoutAuth = mal();

		await instanceWithoutAuth._requestApi('/anime/search.xml');
	} catch (err) {
		t.pass();
	}
});

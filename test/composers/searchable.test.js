import test from 'ava';
import instance from '../instance';

test('Can search for animes', async t => {
	const results = await instance.searchAnimes('Full Metal');
	t.truthy(results);
});

test('Can search for mangas', async t => {
	const results = await instance.searchMangas('Full Metal');
	t.truthy(results);
});

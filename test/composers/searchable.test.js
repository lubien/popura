import test from 'ava';
import {instance} from '../mock';

test('Can search for animes', async () => {
	await instance.searchAnimes('Full Metal');
});

test('Can search for mangas', async () => {
	await instance.searchMangas('Full Metal');
});

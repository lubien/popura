import test from 'ava';
import Popura from '../src/popura';
import {instance, TEST_ANIME_ID, TEST_MANGA_ID} from './mock';

test('Can get your username', t => {
	const me = new Popura('lubien', '');
	t.is(me.getUser(), 'lubien');
});

test('You can reset the username and password', t => {
	const me = new Popura('lubien', '');

	me.setUser('newuser', 'newpass');
	t.is(me.getUser(), 'newuser');
});

test('You can verify your auth', async t => {
	const credentials = await instance.verifyCredentials();
	t.is(credentials.username, instance.getUser());
});

test('Verifying an dummy user will throw', t => {
	const dummy = new Popura('dummy', 'dummy');
	t.throws(dummy.verifyCredentials());
});

test('Can search for animes', async () => {
	await instance.searchAnimes('Full Metal');
});

test('Can search for mangas', async () => {
	await instance.searchMangas('Full Metal');
});

test(`Can get user's anime and manga lists`, async () => {
	await instance.getAnimeList();
	await instance.getMangaList();
});

test(`Can get other user's anime and manga lists`, async () => {
	await instance.getAnimeList('xinil');
	await instance.getMangaList('xinil');
});

test.serial('Can add animes and mangas to lists', async () => {
	await instance.addAnime(TEST_ANIME_ID);
	await instance.addManga(TEST_MANGA_ID);
});

test.serial('Can modify animes and mangas in lists', async () => {
	await instance.updateAnime(TEST_ANIME_ID, {score: 10});
	await instance.updateManga(TEST_MANGA_ID, {score: 10});
});

test.serial('Can delete animes and mangas from lists', async () => {
	await instance.deleteAnime(TEST_ANIME_ID);
	await instance.deleteManga(TEST_MANGA_ID);
});


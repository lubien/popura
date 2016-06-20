import test from 'ava';
import listable from '../../src/composers/listable';
import {state, TEST_ANIME_ID, TEST_MANGA_ID} from '../mock';

const instance = listable(state);

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

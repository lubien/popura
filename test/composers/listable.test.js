import test from 'ava';
import listable from '../../src/composers/listable';
import {state, TEST_ANIME_ID, TEST_MANGA_ID} from '../mock';

const instance = listable(state);

test(`Can get user's anime and manga lists`, t => {
	t.notThrows(instance.getAnimeList());
	t.notThrows(instance.getMangaList());
});

test(`Can get other user's anime and manga lists`, t => {
	t.notThrows(instance.getAnimeList('xinil'));
	t.notThrows(instance.getMangaList('xinil'));
});

test.serial('Can add animes and mangas to lists', t => {
	t.notThrows(instance.addAnime(TEST_ANIME_ID));
	t.notThrows(instance.addManga(TEST_MANGA_ID));
});

test.serial('Can modify animes and mangas in lists', t => {
	t.notThrows(instance.updateAnime(TEST_ANIME_ID, {score: 10}));
	t.notThrows(instance.updateManga(TEST_MANGA_ID, {score: 10}));
});

test.serial('Can delete animes and mangas from lists', t => {
	t.notThrows(instance.deleteAnime(TEST_ANIME_ID));
	t.notThrows(instance.deleteManga(TEST_MANGA_ID));
});

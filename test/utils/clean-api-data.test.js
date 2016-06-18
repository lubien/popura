import test from 'ava';
import cleanApiData from '../../src/utils/clean-api-data';

test(`cleanApiData should remove MAL's API data boilerplate`, t => {
	const exampleAnime = {
		anime: {
			entry: [
				{
					foo: 'bar',
				},
			],
		},
	};

	const exampleManga = {
		manga: {
			entry: [
				{
					foo: 'bar',
				},
			],
		},
	};

	const exampleUser = {
		user: {
			foo: ['bar'],
		},
	};

	t.deepEqual(cleanApiData(exampleAnime), [
		{foo: 'bar'},
	]);

	t.deepEqual(cleanApiData(exampleManga), [
		{foo: 'bar'},
	]);

	t.deepEqual(cleanApiData(exampleUser), {foo: 'bar'});
});

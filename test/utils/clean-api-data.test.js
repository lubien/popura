import test from 'ava';
import cleanApiData from '../../src/utils/clean-api-data';

test(`cleanApiData should remove MAL's API data boilerplate`, t => {
	const exampleAnime = {
		entry: [
			{
				foo: 'bar',
			},
		],
	};

	const exampleManga = {
		entry: [
			{
				foo: 'bar',
			},
		],
	};

	const exampleUser = {
		foo: 'bar',
	};

	t.deepEqual(cleanApiData(exampleAnime), [
		{foo: 'bar'},
	]);

	t.deepEqual(cleanApiData(exampleManga), [
		{foo: 'bar'},
	]);

	t.deepEqual(cleanApiData(exampleUser), {foo: 'bar'});
});

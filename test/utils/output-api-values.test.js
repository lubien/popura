import test from 'ava';
import {
	outputAnimeValues,
	outputMangaValues,
} from '../../src/utils/output-api-values';

test('Generate only accepted values', t => {
	t.true(
		outputAnimeValues({episode: 1})
			.indexOf('episode') !== -1
	);

	t.false(
		outputAnimeValues({bar: 1})
			.indexOf('bar') !== -1
	);

	t.true(
		outputMangaValues({chapter: 1})
			.indexOf('chapter') !== -1
	);

	t.false(
		outputMangaValues({bar: 1})
			.indexOf('bar') !== -1
	);
});

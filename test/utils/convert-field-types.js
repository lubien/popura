import test from 'ava';
import convertFieldTypes from '../../src/utils/convert-field-types';

test(`Convert MAL API fields to it's proper values`, t => {
	t.deepEqual(convertFieldTypes({synonyms: 'foo; bar'}), {synonyms: ['foo', 'bar']});
	t.deepEqual(convertFieldTypes({tags: 'foo, bar'}), {tags: ['foo', 'bar']});
	t.deepEqual(convertFieldTypes({my_last_updated: 1415463675}), {my_last_updated: '2014-10-08'});
});


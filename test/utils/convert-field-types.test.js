import test from 'ava';
import convertFieldTypes from '../../src/utils/convert-field-types';

test(`Convert MAL API fields to it's proper values`, t => {
	t.deepEqual(convertFieldTypes({id: '1'}), {id: 1});
	t.deepEqual(convertFieldTypes({tags: 'foo, bar'}), {tags: ['foo', 'bar']});

	// Convert empty dates to `false`.
	t.deepEqual(convertFieldTypes({'end_date': '0000-00-00'}), {end_date: false});
});


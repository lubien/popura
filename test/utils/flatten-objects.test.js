import test from 'ava';
import flattenObject from '../../src/utils/flatten-object';

test('flattenObject should remove one element array form object keys', t => {
	const obj = {
		foo: [1],
		bar: [2],
	};

	t.deepEqual(flattenObject(obj), {
		foo: 1,
		bar: 2,
	});
});

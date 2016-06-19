import test from 'ava';
import cleanListData from '../../src/utils/clean-list-data';

test('Can clean anime lists', t => {
	const example = {
		myanimelist: {
			myinfo: [{foo: ['bar']}],
			anime: [
				{foo: ['bar']},
			],
		},
	};

	t.deepEqual(cleanListData(example), {
		myinfo: {foo: 'bar'},
		list: [
			{foo: 'bar'},
		],
	});
});

test('Can clean manga lists', t => {
	const example = {
		myanimelist: {
			myinfo: [{foo: ['bar']}],
			manga: [
				{foo: ['bar']},
			],
		},
	};

	t.deepEqual(cleanListData(example), {
		myinfo: {foo: 'bar'},
		list: [
			{foo: 'bar'},
		],
	});
});

test('Can clean empty lists', t => {
	const example = {
		myanimelist: {
			myinfo: [{foo: ['bar']}],
		},
	};

	t.deepEqual(cleanListData(example), {
		myinfo: {foo: 'bar'},
		list: [],
	});
});

test(`Throws if there is no 'myinfo' field in 'data.myanimelist'`, t => {
	const example = {};
	t.throws(() => cleanListData(example));
});

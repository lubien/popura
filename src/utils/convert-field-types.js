import {splitBy, showTwoDigit} from './';

const commaSeparatedArrayFields = ['tags', 'my_tags'];
const semicolonSeparatedArrayFields = ['synonyms', 'series_synonyms'];

/**
 * Convert MAL's API fields to proper types
 *
 * @param {obj} obj
 * @return {obj}
 */
export default function convertFieldTypes(obj) {
	const result = {};

	for (const key of Object.keys(obj)) {
		const value = obj[key];

		if (key === 'my_last_updated') {
			// Sometimes it use timesptamp! Fuck U MAL API
			const date = new Date(Number(value * 1000));
			result[key] =
				`${date.getUTCFullYear()}-${showTwoDigit(date.getUTCMonth())}-${showTwoDigit(date.getUTCDate())}`;
		} else if (commaSeparatedArrayFields.indexOf(key) !== -1) {
			result[key] = splitBy(',', value);
		} else if (semicolonSeparatedArrayFields.indexOf(key) !== -1) {
			result[key] = splitBy(';', value);
		} else {
			result[key] = value;
		}
	}

	return result;
}


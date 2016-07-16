import {splitBy, showTwoDigit} from './';

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

		switch (key) {
			case 'my_last_updated': {
				// Sometimes it use timesptamp! Fuck U MAL API
				const date = new Date(Number(value * 1000));
				result[key] =
					`${date.getUTCFullYear()}-${showTwoDigit(date.getUTCMonth())}-${showTwoDigit(date.getUTCDate())}`;
				break;
			}

			case 'my_rereadingg': {
				// Notice tha this field have double 'g' at the end of the name -.-"
				result['my_rereading'] = value;
				break;
			}

			case 'tags':
			case 'my_tags': {
				result[key] = splitBy(',', value);
				break;
			}

			case 'synonyms':
			case 'series_synonyms': {
				result[key] = splitBy(';', value);
				break;
			}

			default: {
				result[key] = value;
			}
		}
	}

	return result;
}


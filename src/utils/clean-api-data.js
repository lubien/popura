import flattenObject from './flatten-object';
import convertFieldTypes from './convert-field-types';

/**
 * Cleans XML parsed JSON from MAL.
 *
 * @example
 * cleanApiData({ anime: { entry: [ { key: ['value'] } ] } })
 * [ { key: 'value' } ]
 *
 * cleanApiData({ manga: { entry: [ { key: ['value'] } ] } })
 * [ { key: 'value' } ]
 *
 * cleanApiData({ user: { key: ['value'] } })
 * { key: 'value' }
 *
 * @param  {object} data - MyAnimeList's API parsed XML
 * @return {object} - Good looking object
 */
export default function cleanApiData(data) {
	if (data === null) {
		return data;
	}

	let newData = data.anime || data.manga || data.user || data;

	if (Array.isArray(newData.entry)) {
		newData = newData.entry.map(flattenObject).map(convertFieldTypes);
	} else if (typeof newData === 'object') {
		newData = convertFieldTypes(flattenObject(newData));
	}

	return newData;
}

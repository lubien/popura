import flattenObject from './flatten-object';

/**
 * @module utils/cleanApiData
 * @description Cleans XML parsed JSON from MAL.
 * @requires utils/flattenObject
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
		newData.entry.map(flattenObject);
		newData = newData.entry;
	} else if (typeof newData === 'object') {
		newData = flattenObject(newData);
	}

	return newData;
}

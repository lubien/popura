import {convertFieldTypes} from './';

/**
 * Cleans XML parsed JSON from MAL.
 *
 * @example
 * cleanApiData({ entry: [ { key: value } ] })
 * [ { key: value } ]
 *
 * @param  {object} data - MyAnimeList's API parsed XML
 * @return {object} - Good looking object
 */
export default function cleanApiData(data) {
	if (data === null) {
		return data;
	}

	let cleanData = data.entry || data;

	if (Array.isArray(cleanData)) {
		cleanData = cleanData.map(convertFieldTypes);
	} else if (typeof cleanData === 'object') {
		cleanData = convertFieldTypes(cleanData);
	}

	return cleanData;
}

const numericFields = [
	'id', 'episodes', 'chapters', 'score', 'user_id', 'user_watching', 'user_completed',
	'user_onhold', 'user_dropped', 'user_plantowatch', 'user_days_spent_watching',
	'series_animedb_id', 'series_type', 'series_episodes', 'series_status', 'my_id',
	'my_status', 'my_rewatching', 'my_rewatching_ep', 'my_last_update', 'series_mangadb_id',
	'series_chapters', 'series_volumes', 'my_read_chapters', 'my_read_volumes', 'my_score',
	'my_rereadingg', // Notice that the double 'g' at the end is not a typo, it's MAL return!
	'my_rereading_chap', 'user_reading', 'user_plantoread',
];
const dateFields = [
	'start_date', 'end_date', 'series_start', 'series_end', 'my_last_updated', 'my_start_date', 'my_finish_date',
];
const arrayFields = ['tags', 'my_tags'];

const showTwoDigit = n => n < 10 ? `0${n}` : n;

/**
 * Convert MAL's API fields to proper types
 *
 * @example
 * convertFieldTypes({id: '1'});
 * {id: 1}
 *
 * @param {obj} obj
 * @return {obj}
 */
export default function convertFieldTypes(obj) {
	const result = {};

	for (const key of Object.keys(obj)) {
		if (numericFields.indexOf(key) !== -1) {
			result[key] = Number(obj[key]);
		} else if (dateFields.indexOf(key) !== -1) {
			// Sometimes it use timesptamp! Fuck U MAL API
			if (key === 'my_last_updated') {
				const date = new Date(Number(obj[key] * 1000));
				result[key] =
					`${date.getUTCFullYear()}-${showTwoDigit(date.getUTCMonth())}-${showTwoDigit(date.getUTCDate())}`;
			} else if (obj[key] === '0000-00-00') {
				result[key] = false;
			} else {
				result[key] = obj[key];
			}
		} else if (arrayFields.indexOf(key) !== -1) {
			result[key] = obj[key] ? obj[key].split(',').map(value => value.trim()) : [];
		} else {
			result[key] = obj[key];
		}
	}

	return result;
}


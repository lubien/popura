/**
 * Factory function that returns a XML generator function
 * It's useful to merge the common values with the anime/manga
 * specific values
 *
 * @param  {array} fields = [] - List of allowed fields to output
 * @return {function} - Function that outputs XML values
 */
function outputValuesFactory(fields = []) {
	/**
	 * Concatenate with common fields
	 */
	const fieldsToOutput = fields.concat([
		'status', 'score', 'date_start', 'date_finish', 'priority',
		'enable_discussion', 'comments', 'tags',
	]);

	/**
	 * Takes an object and render only the keys inside our fieldsToGenerate
	 * const inside this closure
	 *
	 * @param  {object} values - Key-Value pair of fields allowed from MAL API
	 * @return {string} - XML ready to post in the API
	 */
	return function (values) {
		const outputFields = Object.keys(values)
			.filter(key => fieldsToOutput.indexOf(key) !== -1)
			.map(key => `<${key}>${values[key]}</${key}>`)
			.join('');
		return `<?xml version="1.0" encoding="UTF-8"?><entry>${outputFields}</entry>`;
	};
}

export const outputAnimeValues = outputValuesFactory([
	'episode', 'storage_type', 'storage_value', 'times_rewatched',
	'rewatch_value', 'enable_rewatching', 'fansub_group',
]);

export const outputMangaValues = outputValuesFactory([
	'chapter', 'volume', 'times_reread', 'reread_value',
	'enable_rereading', 'scan_group', 'retail_volumes',
]);

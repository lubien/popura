import {get} from '../utils/request';

const debug = require('debug')('popura:searchable');

/**
 * Composes searchable mixin
 *
 * @param  {object} state
 * @return {object} - An object that can search for MAL titles
 */
export default function searchable(state) {
	return {
		/**
		 * Search for an anime title
		 *
		 * @param  {string} name - Anime title
		 * @return {Promise} - Resolves to a list of matched titles or empty
		 */
		searchAnimes(name) {
			debug(`Searching for the anime '${name}'`);
			return get(state.authToken, `/anime/search.xml`, {
				query: {q: name},
			});
		},

		/**
		 * Search for a manga title
		 *
		 * @param  {string} name - Manga title
		 * @return {Promise} - Resolves to a list of matched titles or empty
		 */
		searchMangas(name) {
			debug(`Searching for the manga '${name}'`);
			return get(state.authToken, `/manga/search.xml`, {
				query: {q: name},
			});
		},
	};
}

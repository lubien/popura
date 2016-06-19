import {requestApi} from '../utils/request';

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
			return requestApi(state.authToken, `/anime/search.xml`, {
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
			return requestApi(state.authToken, `/manga/search.xml`, {
				query: {q: name},
			});
		},
	};
}

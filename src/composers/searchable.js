import {requestApi} from '../utils/request';

export default function searchable(state) {
	return {
		searchAnimes(name) {
			return requestApi(state.authToken, `/anime/search.xml`, {q: name});
		},

		searchMangas(name) {
			return requestApi(state.authToken, `/manga/search.xml`, {q: name});
		},
	};
}

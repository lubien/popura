function searchable() {
	return {
		searchAnimes(name) {
			return this._requestApi(`/anime/search.xml`, {q: name});
		},

		searchMangas(name) {
			return this._requestApi(`/manga/search.xml`, {q: name});
		},
	};
}

module.exports = searchable;

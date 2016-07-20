import {
	request,
	cleanApiData,
	cleanListData,
	xmlParser,
	xmlBuilder,
	generateAuthToken,
	checkAddResponse,
	includesText,
} from './utils';

const debug = require('debug')('popura:object');

export default class Popura {
	/**
	 * @param {string} username
	 * @param {string} password
	 * @return {object}
	 */
	constructor(username, password) {
		this.setUser(username, password);
	}

	/**
	 * @return {string}
	 */
	getUser() {
		return this._username;
	}

	/**
	 * @param {string} username
	 * @param {string} password
	 */
	setUser(username, password) {
		debug(`Setting '${username}' as user. Use pass = ${Boolean(password)}`);

		this._username = username;
		this._authToken = generateAuthToken(username, password);
	}

	/**
	 * @return {Promise}
	 */
	verifyAuth() {
		debug(`Verifying credentials for '${this._username}'`);
		return this._get('/account/verify_credentials.xml');
	}

	/**
	 * @param {string} title
	 * @return {Promise}
	 */
	searchAnimes(title) {
		return this._search('anime', title);
	}

	/**
	 * @param {string} title
	 * @return {Promise}
	 */
	searchMangas(title) {
		return this._search('manga', title);
	}

	/**
	 * @param {string} username
	 * @return {Promise}
	 */
	getAnimeList(username = this._username) {
		debug(`Getting animelist of ${username}`);
		return this._list('anime', username);
	}

	/**
	 * @param {string} username
	 * @return {Promise}
	 */
	getMangaList(username = this._username) {
		debug(`Getting mangalist of ${username}`);
		return this._list('manga', username);
	}

	/**
	 * @param {int} id
	 * @param {object} values
	 * @return {Promise}
	 */
	addAnime(id, values = {}) {
		if (!values.status) {
			values.status = 1;
		}

		return this._post(`/animelist/add/${id}.xml`, {values, expects: checkAddResponse});
	}

	/**
	 * @param {int} id
	 * @param {object} values
	 * @return {Promise}
	 */
	addManga(id, values = {}) {
		if (!values.status) {
			values.status = 1;
		}

		return this._post(`/mangalist/add/${id}.xml`, {values, expects: checkAddResponse});
	}

	/**
	 * @param {int} id
	 * @param {object} values
	 * @return {Promise}
	 */
	updateAnime(id, values = {}) {
		return this._post(`/animelist/update/${id}.xml`, {values, expects: includesText('Updated')});
	}

	/**
	 * @param {int} id
	 * @param {object} values
	 * @return {Promise}
	 */
	updateManga(id, values = {}) {
		return this._post(`/mangalist/update/${id}.xml`, {values, expects: includesText('Updated')});
	}

	/**
	 * @param {int} id
	 * @return {Promise}
	 */
	deleteAnime(id) {
		return this._post(`/animelist/delete/${id}.xml`, {expects: includesText('Deleted')});
	}

	/**
	 * @param {int} id
	 * @return {Promise}
	 */
	deleteManga(id) {
		return this._post(`/mangalist/delete/${id}.xml`, {expects: includesText('Deleted')});
	}

	/**
	 * @param {string} url
	 * @param {object} opts
	 * @return {Promise}
	 */
	_get(url, opts) {
		debug(`Requesting ${url}`);

		return request(this._authToken, `/api${url}`, opts)
			.then(({body}) => xmlParser(body))
			.then(cleanApiData);
	}

	/**
	 * @param {string} type
	 * @param {string} title
	 * @return {Promise}
	 */
	_search(type, title) {
		debug(`Searching for ${type} named '${title}'`);

		return this._get(`/${type}/search.xml`, {
			query: {q: title},
		})
			// Be sure to return an array since the XML parser
			// doesn't recognize single node XML results as array
			.then(result => Array.isArray(result) ? result : [result]);
	}

	/**
	 * @param {string} type
	 * @param {string} username
	 * @return {Promise}
	 */
	_list(type, username) {
		debug(`Requesting ${type}list of ${username}`);

		return request(this._authToken, '/malappinfo.php', {
			query: {
				u: username,
				type,
			},
		})
			.then(({body}) => xmlParser(body))
			.then(parsed => {
				if (parsed.error) {
					throw new Error(parsed.error);
				}
				return parsed;
			})
			.then(cleanListData);
	}

	/**
	 * @param {string} url
	 * @param {object} opts
	 * @return {Promise}
	 */
	_post(url, {values = false, expects = false}) {
		debug(`Posting in MAL's API at ${url}`);

		return request(this._authToken, `/api${url}`, {
			method: 'POST',
			body: values ? {data: xmlBuilder(values)} : false,
		})
			.then(({body = ''}) => {
				if (expects && !expects(body)) {
					debug(`Body did not match test function`, body);
					throw new Error(`Unespected return from MAL server posting at ${url}`);
				}
				return body;
			});
	}
}


import {
	get,
	list,
	post,
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
		debug(`Searching for the anime '${title}'`);
		return this._get(`/anime/search.xml`, {
			query: {q: title},
		});
	}

	/**
	 * @param {string} title
	 * @return {Promise}
	 */
	searchMangas(title) {
		debug(`Searching for the manga '${title}'`);
		return this._get(`/anime/search.xml`, {
			query: {q: title},
		});
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
	 * @param {object} opt
	 * @return {Promise}
	 */
	_get(url, opt) {
		return get(this._authToken, url, opt);
	}

	/**
	 * @param {string} type
	 * @param {string} username
	 * @return {Promise}
	 */
	_list(type, username) {
		return list(this._authToken, type, username);
	}

	/**
	 * @param {string} url
	 * @param {object} opt
	 * @return {Promise}
	 */
	_post(url, opt) {
		return post(this._authToken, url, opt);
	}
}


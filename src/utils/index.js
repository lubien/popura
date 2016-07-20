export {default as cleanApiData} from './clean-api-data';
export {default as cleanListData} from './clean-list-data';
export {default as convertFieldTypes} from './convert-field-types';
export {default as generateAuthToken} from './generate-auth-token';
export {default as request} from './request';
export {default as xmlParser} from './xml-parser';
export {default as xmlBuilder} from './xml-builder';

/**
 * Check if a POST adding animes/mangas into MAL API succeeded
 * Why this function? Ramdomly MAL returns a transaction ID
 * of the action.
 *
 * @param {string} body
 * @return {bool}
 */
export const checkAddResponse = body =>
	body && (Number(body) > 0 || body.includes('201 Created'));

/**
 * Given a string, returns a function that checks if it's
 * inside another strings
 *
 * @param {string} needle
 * @return {function}
 */
export const includesText = needle =>
	haystack => haystack.includes(needle);

/**
 * Given a number, return itself with at least 2 digits.
 *
 * @param {number} n
 * @return {string}
 */
export const showTwoDigit = n =>
	n < 10 ? `0${n}` : n;

/**
 * Given a `splitter` character, split a `str` and trim it's values.
 *
 * @param {string} splitter
 * @param {string} str
 * @return {array}
 */
export const splitBy = (splitter, str) =>
	str ? str.split(splitter).map(value => value.trim()) : [];


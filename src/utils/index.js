import cleanApiData from './clean-api-data';
import cleanListData from './clean-list-data';
import convertFieldTypes from './convert-field-types';
import generateAuthToken from './generate-auth-token';
import xmlParser from './xml-parser';
import xmlBuilder from './xml-builder';

export {cleanApiData};
export {cleanListData};
export {convertFieldTypes};
export {generateAuthToken};
export * from './request';
export {xmlParser};
export {xmlBuilder};

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


import cleanApiData from './clean-api-data';
import cleanListData from './clean-list-data';
import convertFieldTypes from './convert-field-types';
import generateAuthToken from './generate-auth-token';
import xmlParser from './xml-parser';

export {cleanApiData};
export {cleanListData};
export {convertFieldTypes};
export {generateAuthToken};
export * from './output-api-values';
export * from './request';
export {xmlParser};

/**
 * Check if a POST into MAL API succeeded
 *
 * @param {string} body
 * @return {bool}
 */
export const checkAddResponse = body => (
	body && (Number(body) > 0 || body.includes('201 Created'))
);

/**
 * Given a number, return itself with at least 2 digits.
 *
 * @param {number} n
 * @return {string}
 */
export const showTwoDigit = n => n < 10 ? `0${n}` : n;

/**
 * Given a `splitter` character, split a `str` and trim it's values.
 *
 * @param {string} splitter
 * @param {string} str
 * @return {array}
 */
export const splitBy = (splitter, str) =>
	str ?
		str.split(splitter).map(value => value.trim()) :
		[];


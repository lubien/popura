import flattenObject from './flatten-object';
import convertFieldTypes from './convert-field-types';

/**
 * Clean data requested from anime/manga lists
 *
 * @example
 * cleanListData({ myanimelist: { myinfo: [ [Object] ], anime: [ [Object], [Object] ] } })
 * cleanListData({ myanimelist: { myinfo: [ [Object] ], manga: [ [Object], [Object] ] } })
 * cleanListData({ myanimelist: { myinfo: [ [Object] ] } }) // sometimes you don't have animes/mangas
 *
 * @param  {object} data - MyAnimeList's list parsed XML
 * @return {object} - { myinfo: {...}, list: [...] }
 */
export default function cleanListData({myanimelist: {myinfo, anime, manga}}) {
	if (!myinfo) {
		throw new Error(`No 'myinfo' field in list data therefore, it's an invalid list`);
	}

	const newData = {
		myinfo: convertFieldTypes(flattenObject(myinfo[0])),
		list: [],
	};

	/**
	 * Verificate if the type of the list being parsed is an anime, manga
	 * or if the list is empty, type is false.
	 */
	let type;
	if (anime) {
		type = anime;
	}	else if (manga) {
		type = manga;
	}	else {
		type = false;
	}

	if (type) {
		type.forEach(item => {
			newData.list.push(convertFieldTypes(flattenObject(item)));
		});
	}

	return newData;
}

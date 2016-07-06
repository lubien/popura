import convertFieldTypes from './convert-field-types';

/**
 * Clean data requested from anime/manga lists
 *
 * @example
 * cleanListData({ myinfo: [Object], anime: [ [Object], [Object] ] })
 * cleanListData({ myinfo: [Object], manga: [ [Object], [Object] ] })
 * cleanListData({ myinfo: [Object] }) // sometimes you don't have animes/mangas
 *
 * @param  {object} data - MyAnimeList's list parsed XML
 * @return {object} - { myinfo: {...}, list: [...] }
 */
export default function cleanListData({myinfo, anime, manga}) {
	if (!myinfo) {
		throw new Error(`No 'myinfo' field in list data therefore, it's an invalid list`);
	}

	const cleanData = {
		myinfo: convertFieldTypes(myinfo),
		list: [],
	};

	const type = anime || manga || false;

	if (type) {
		type.forEach(item => {
			cleanData.list.push(convertFieldTypes(item));
		});
	}

	return cleanData;
}

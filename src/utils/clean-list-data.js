import {convertFieldTypes} from './';

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

	if (Array.isArray(type)) {
		type.forEach(item => {
			cleanData.list.push(convertFieldTypes(item));
		});
	// What happens is that the XML parser returns
	// a single value when there's only one node
	// of the same name.
	} else if (type) {
		cleanData.list.push(convertFieldTypes(type));
	}

	return cleanData;
}

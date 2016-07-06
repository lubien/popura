import xml2js from 'xml2js';
import {parseNumbers, parseBooleans} from 'xml2js/lib/processors';

const htmlBrToNewline = value =>
	typeof value === 'string' ?
		value.replace(/<br(\s*)\/>/g, '\n') :
		value;

const parser = new xml2js.Parser({
	explicitRoot: false,
	explicitArray: false,
	valueProcessors: [parseNumbers, parseBooleans, htmlBrToNewline],
});

export default function xmlParser(xml) {
	return new Promise((resolve, reject) => {
		parser.parseString(xml, (err, parsedXml) => {
			if (err) {
				reject(err);
			}
			resolve(parsedXml);
		});
	});
}


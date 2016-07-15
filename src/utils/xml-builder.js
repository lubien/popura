import xml2js from 'xml2js';

const builder = new xml2js.Builder({
	rootName: 'entry',
	renderOpts: {
		pretty: false,
	},
});

export default function xmlParser(obj) {
	return builder.buildObject(obj);
}


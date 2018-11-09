#! /usr/bin/env node
var program = require('commander');
var fs = require('fs');
var XML = require('pixl-xml');

// split a string
var splitter = function(list) {
	return list.split(/\s+/);
}

// camparator for strings
var comparator = function(a, b) {
	return a < b ? -1 :
		a > b ? 1 : 0;
}

// build a custom string comparator
var buildCustomComparator = function(list) {
	return function(a, b) {
		var scoreA = list.findIndex(a);
		var scoreB = list.findIndex(b);

		if (scoreA >= 0 && scoreB >= 0) {
			return scoreA - scoreB;
		} else if (scoreA >= 0) {
			return -1;
		} else if (scoreB >= 0) {
			return 1;
		} else {
			return comparator(a, b);
		}
	}
}

var cmdFile;

program
	.name("xml-sorter")
	.arguments('<file>')
	.action(function (file) {
		cmdFile = file;
	 })
	 .option('-t, --tag-order <list>', 'Order of tags', splitter)
	 .option('-a, --attribute-order <list>', 'Order of attributes', splitter)
	 .option('-v, --tag-order-same-name <list>', 'Order tags with the same name by attribute value', splitter)
	 .option('')
	.parse(process.argv);

cmdFile = "c:\\Users\\mirfra\\Desktop\\App.config";

var input = fs.readFileSync(cmdFile, 'utf8');

var opt = {
	preserveAttributes: true,
	preserveDocumentNode: true,
};

var obj = XML.parse(input, opt);

var tag_sorter_by_attribs = function (a, b) {
	return 0;
}

var tag_sorter = function(a, b) {
	if (a.key === "configSections") {
		return -1;
	} else if (b.key === "configSections") {
		return 1;
	} else if (a.key < b.key) {
		return -1;
	} else if (a.key > b.key) {
		return 1;
	}

	return tag_sorter_by_attribs(a, b);
}

var output = XML.stringify(obj, undefined, undefined, undefined, undefined, true, tag_sorter);

fs.writeFileSync(cmdFile, output);

console.log("file xml is sorted");
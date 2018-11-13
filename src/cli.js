#! /usr/bin/env node
var program = require('commander');
var Core = require('./core');

// parse list separated by space
function splitList(list) {
    return list.split(/\s+/);
}

// path source file
var pathSrc;

// sorting options
var opts = Core.createSortingOptions();

function examples() {
    console.log(
        '\nExamples:\n' +
        '  xml-sorter -t tagB tagA ./file.xml\t\tTag named "tagB" will be rendered first, then "tagA", then the other tags ordered alphabetically\n' +
        '  xml-sorter -a attB attA ./file.xml\t\tAttribute named "attB" will be rendered first, then "attA" then the other attributes ordered alphabetically\n'
    );
}

program
    .version('1.0.0')
    .name("xml-sorter")
    .arguments('<file>')
    .action(function (file) { pathSrc = file; })
    .option('-t, --tag-order <list>', 'Customize the tag order, ignoring the alphabetical order for tags present in <list>', splitList)
    .option('-a, --attribute-order <list>', 'Customize the attribute order, ignoring the alphatical order for attributes present in <list>', splitList)
    .option('-o, --overwrite', 'Overwrite source file')
    .on('-h', examples)
    .on('--help', examples)
    .parse(process.argv);

// read file XML
var input = Core.readFileXML(pathSrc);

opts.tagComparatorByName = Core.composeComparators(
    Core.buildComparatorFromList(program.tagOrder || []),
    Core.alphabeticalComparator);

opts.attComparatorByName = Core.composeComparators(
    Core.buildComparatorFromList(program.attributeOrder || []),
    Core.alphabeticalComparator);

opts.tagComparatorByAttributes = Core.buildAttribsComparator(
    opts.attComparatorByName,
    Core.alphabeticalComparator
);

var output = Core.sort(input, opts);

// give result
if (program.overwrite) {
    // overwrite the source file
    Core.writeFile(pathSrc, output);
    console.log("-- the XML file has been sorted");
} else {
    // write on the console
    console.log(output);
}
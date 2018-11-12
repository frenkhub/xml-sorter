var fs = require('fs');
var XML = require('./xml');
var _ = require('lodash');

// alphabetical string comparator
var alphabeticalComparator = exports.alphabeticalComparator = function (a, b) {
        return a < b ? -1 :
                a > b ? 1 : 0;
}

// compare objects by properties values
var buildObjectComparator = exports.buildAttribsComparator = function (keyComparator, valueComparator) {

        keyComparator = keyComparator || alphabeticalComparator;
        valueComparator = valueComparator || alphabeticalComparator;

        return function (a,b) {
                a = a['_Attribs'];
                b = b['_Attribs'];

                var keys = _.keys(a)
                        .concat(_.keys(b))
                        .sort(keyComparator);
                
                keys = _.uniq(keys);
                
                for (var i = 0; i < keys.length; i++) {
                        var k = keys[i];
                        var valueA = a[k];
                        var valueB = b[k];

                        if (valueA && !valueB) { return -1; } 
                        else if (!valueA && valueB) { return 1; }
                        else {
                                var res = valueComparator(valueA, valueB);
                                if (res) {
                                        return res;
                                }
                        }
                }

                // no common key found in a and b with differents values
                return 0;
        }
}

// invert a comparator
exports.invertComparator = function (comparator) {
        return function (a, b) {
                return - comparator(a, b);
        }
}

// create a string comparator from a list of strings
exports.buildComparatorFromList = function (list) {

        function score(string) {
                var y = list.findIndex(function (z) { return z === string });
                return y === -1 ? list.length : y;
        }

        return function (a, b) {
                return Math.sign(score(a) - score(b));
        }
}

// compose comparators
exports.composeComparators = function (primaryComparator, secondaryComparator) {
        return function (a, b) {
                return primaryComparator(a, b) || secondaryComparator(a, b);
        }
}

// read file content
exports.readFileXML = function (path) {
        return fs.readFileSync(path, 'utf8');
}

// save on file
exports.writeFile = function (path, content) {
        return fs.writeFileSync(path, content);
}

// create
var createSortingOptions = exports.createSortingOptions = function (
        tagComparatorByName,
        tagComparatorByAttributes,
        attComparatorByName) {
        return ({
                tagComparatorByName: tagComparatorByName || alphabeticalComparator,
                tagComparatorByAttributes: tagComparatorByAttributes || buildObjectComparator(),
                attComparatorByName: attComparatorByName || alphabeticalComparator
        });
}

// sort XML content
exports.sort = function (xmlString, opts) {
        opts = opts || createSortingOptions();
        var parser = null;

        try {
                parser = new XML.Parser(
                        xmlString,
                        {
                                preserveAttributes: true,
                                preserveDocumentNode: true
                        });
        }
        catch (err) {
                throw err;
        }

        return parser.compose(
                undefined,
                undefined,
                opts.tagComparatorByName,
                opts.tagComparatorByAttributes,
                opts.attComparatorByName);
}
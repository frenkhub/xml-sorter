var fs = require('fs');
var XML = require('./xml');

// get keys of an object
var getKeys = function (obj) {
        var ks = [];

        for (var k in obj) {
                ks.push(k);
        }

        return ks;
}

// filter uniqs value
var filterUniq = function (ls) {
        var out = [];

        for (var i = 0; i < ls.length; i++) {
                var v = ls[i];
                if (!out.includes(v)) {
                        out.push(v);
                }
        }

        return out;
}

// alphabetical string comparator
var alphabeticalComparator = exports.alphabeticalComparator = function (a, b) {
        return a < b ? -1 :
                a > b ? 1 : 0;
}

// alphabetical case insensitive string comparator
var alphabeticalIgnoreCaseComparator = exports.alphabeticalIgnoreCaseComparator = function (a, b) {
        a = a || "";
        b = b || "";

        aLow = a.toLowerCase();
        bLow = b.toLowerCase();

        return aLow < bLow ? -1 :
                aLow > bLow ? 1 :
                        a < b ? -1 : // (same strings but with different case)
                                a > b ? 1 : 0;
}

// compare objects by properties values
var buildAttribsComparator = exports.buildAttribsComparator = function (keyComparator, valueComparator) {

        keyComparator = keyComparator || alphabeticalIgnoreCaseComparator;
        valueComparator = valueComparator || alphabeticalIgnoreCaseComparator;

        return function (a, b) {
                a = a['_Attribs'];
                b = b['_Attribs'];

                var keysA = getKeys(a);
                var keysB = getKeys(b);
                var keys = filterUniq(keysA.concat(keysB)).sort(keyComparator);

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
var buildComparatorFromList = exports.buildComparatorFromList = function (list) {

        list = list || [];

        function score(string) {
                var y = list.findIndex(function (z) { return z === string });
                return y === -1 ? list.length : y;
        }

        return function (a, b) {
                return Math.sign(score(a) - score(b));
        }
}

// compose comparators
var composeComparators = exports.composeComparators = function (primaryComparator, secondaryComparator) {
        return function (a, b) {
                return primaryComparator(a, b) || secondaryComparator(a, b);
        }
}

// create a tag comparatore
var createComparatorHelper = exports.createComparatorHelper = function (precedenceList, ignoreCase) {
        var comparator = buildComparatorFromList(precedenceList);

        if (ignoreCase) {
                comparator = composeComparators(comparator, alphabeticalIgnoreCaseComparator);
        } else {
                comparator = composeComparators(comparator, alphabeticalComparator);
        }

        return comparator;
}

// create a tag comparatore
var createAttribsComparatorHelper = exports.createAttribsComparatorHelper = function (precedenceList, ignoreCase) {
        var comparator = buildComparatorFromList(precedenceList);

        if (ignoreCase) {
                comparator = composeComparators(comparator, alphabeticalIgnoreCaseComparator);
        } else {
                comparator = composeComparators(comparator, alphabeticalComparator);
        }

        return buildAttribsComparator(comparator, alphabeticalIgnoreCaseComparator);
}

// read file content
exports.readFileXML = function (path) {
        return fs.readFileSync(path, 'utf8');
}

// save on file
exports.writeFile = function (path, content) {
        return fs.writeFileSync(path, content);
}

// create sorting options
var createSortingOptions = exports.createSortingOptions = function (
        tagComparatorByName,
        tagComparatorByAttributes,
        attComparatorByName) {
        return ({
                tagComparatorByName: tagComparatorByName || alphabeticalComparator,
                tagComparatorByAttributes: tagComparatorByAttributes || buildAttribsComparator(),
                attComparatorByName: attComparatorByName || alphabeticalComparator
        });
}

// create sorting options helper
exports.createSortingOptionsHelper = function (tags, attrs, ignoreCase) {
        var opts = {};
        opts.tagComparatorByName = createComparatorHelper(tags, ignoreCase);
        opts.attComparatorByName = createComparatorHelper(attrs, ignoreCase);
        opts.tagComparatorByAttributes = createAttribsComparatorHelper(attrs, ignoreCase);

        return opts;
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
var assert = require('assert');
var Core = require('../src/core');

// helpers
function clean(stringXml) {
    return stringXml
        .replace(/\s/g, '')
        .replace(/\n/g, '')
        .replace(/<\?.+\?>/, '');
}

describe('core.js', function () {

    describe('#sort()', function () {

        it('by default sort tags by name', function () {
            var x = '<x><z></z><a></a></x>';
            var y = '<x><a></a><z></z></x>';

            var res = clean(Core.sort(x));

            assert.equal(res, y);
        });

        it('by default sort attributes by name', function () {
            var x = '<x z="" a=""/>';
            var y = '<xa=""z=""/>';

            var res = clean(Core.sort(x));

            assert.equal(res, y);
        });

        it('by default sort tags with the same name by attributes', function () {
            var x = '<x><a y="z"></a><a y="a"></a></x>';
            var y = '<x><ay="a"/><ay="z"/></x>';

            var res = clean(Core.sort(x));

            assert.equal(res, y);
        });

        it('custom sort of tags with the same name, tags has 1 attribute', function () {
            var x = "<root>" +
                "<artist a='zzz'/>" +
                "<artist b='ccc'/>" +
                "<artist c='aaa'/>" +
                "<artist d='aaa'/>" +
                "<artist e='aaa'/>" +
                "<artist f='bbb'/>" +
                "<artist f='aaa'/>" +
                "</root>";

            var y = "<root>" +
                "<artistf=\"aaa\"/>" +
                "<artistf=\"bbb\"/>" +
                "<artistb=\"ccc\"/>" +
                "<artista=\"zzz\"/>" +
                "<artistc=\"aaa\"/>" +
                "<artistd=\"aaa\"/>" +
                "<artiste=\"aaa\"/>" +
                "</root>";

            var customComparator = Core.buildComparatorFromList(["f", "b"]);
            var attribsComparator = Core.buildAttribsComparator(customComparator, Core.alphabeticalComparator);

            var opts = Core.createSortingOptions(
                Core.alphabeticalComparator,
                attribsComparator);

            var res = clean(Core.sort(x, opts));

            assert.equal(res, y);
        })
    });
});
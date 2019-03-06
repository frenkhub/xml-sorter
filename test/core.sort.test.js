var assert = require('assert');
var Core = require('../src/core');
var examples = require('./examples.js').examples;

// helpers
function clean(stringXml) {
    return stringXml
        .replace(/<\?.+\?>/, '')
        .replace(/\s\s+/g, ' ')
        .replace(/>\s+/g, '>')
        .replace(/\n/, '');
}

describe('xml-sort', function () {

    it('by default sort tags by name', function () {
        var x = '<x><z></z><a></a></x>';
        var y = '<x><a></a><z></z></x>';

        var res = clean(Core.sort(x));

        assert.equal(res, y);
    });

    it('by default sort attributes by name', function () {
        var x = '<x z="" a=""/>';
        var y = '<x a="" z=""/>';

        var res = clean(Core.sort(x));

        assert.equal(res, y);
    });

    it('by default sort tags with the same name by attributes', function () {
        var x = '<x><a y="z"></a><a y="a"></a></x>';
        var y = '<x><a y="a"/><a y="z"/></x>';

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
            "<artist f=\"aaa\"/>" +
            "<artist f=\"bbb\"/>" +
            "<artist b=\"ccc\"/>" +
            "<artist a=\"zzz\"/>" +
            "<artist c=\"aaa\"/>" +
            "<artist d=\"aaa\"/>" +
            "<artist e=\"aaa\"/>" +
            "</root>";

        var customComparator = Core.buildComparatorFromList(["f", "b"]);
        var attribsComparator = Core.buildAttribsComparator(customComparator, Core.alphabeticalComparator);

        var opts = Core.createSortingOptions(
            Core.alphabeticalComparator,
            attribsComparator);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort example-0', function () {
        var x = examples[0];

        var y = "<root>" +
            "<artist name=\"aaa\"/>" +
            "<artist name=\"ccc\"/>" +
            "<artist name=\"zzz\"/>" +
            "</root>";

        var opts = Core.createSortingOptionsHelper([], [], false);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort -a \'f b\' example-1', function () {
        var x = examples[1];

        var y = "<root>" +
            "<artist f=\"aaa\"/>" +
            "<artist f=\"bbb\"/>" +
            "<artist b=\"ccc\"/>" +
            "<artist a=\"zzz\"/>" +
            "<artist c=\"aaa\"/>" +
            "<artist d=\"aaa\"/>" +
            "<artist e=\"aaa\"/>" +
            "</root>";

        var opts = Core.createSortingOptionsHelper([], ['f', 'b'], false);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort example-2', function () {
        var x = examples[2];

        var y = "<root>" +
            "<a>" +
            "<b></b>" +
            "<d></d>" +
            "<z></z>" +
            "</a>" +
            "<c></c>" +
            "<z></z>" +
            "</root>";

        var opts = Core.createSortingOptionsHelper([], [], false);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort -t d example-2', function () {
        var x = examples[2];

        var y = "<root>" +
            "<a>" +
            "<d></d>" +
            "<b></b>" +
            "<z></z>" +
            "</a>" +
            "<c></c>" +
            "<z></z>" +
            "</root>";

        var opts = Core.createSortingOptionsHelper(['d'], [], false);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort example-3', function () {
        var x = examples[3];

        var y = "<root a=\"\" x=\"\" z=\"\"/>";

        var opts = Core.createSortingOptionsHelper(['d'], [], false);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort -a z example-3', function () {
        var x = examples[3];

        var y = "<root z=\"\" a=\"\" x=\"\"/>";

        var opts = Core.createSortingOptionsHelper([], ['z'], false);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort -t \'z x\' -a \'x z\' example-4', function () {
        var x = examples[4];

        var y = "<tagsWithSameName>" +
            "<x x=\"d\" z=\"a\" a=\"d\" b=\"b\" c=\"c\"/>" +
            "<x x=\"d\" z=\"a\" a=\"e\" b=\"c\" c=\"d\"/>" +
            "<x x=\"d\" z=\"e\" a=\"c\" b=\"a\" c=\"b\"/>" +
            "<x x=\"d\" z=\"z\" a=\"c\" b=\"a\" c=\"b\"/>" +
            "<x x=\"f\" z=\"e\" a=\"c\" b=\"h\" c=\"g\"/>" +
            "</tagsWithSameName>"

        var opts = Core.createSortingOptionsHelper(['z', 'x'], ['x', 'z'], false);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort -i example-5', function () {
        var x = examples[5];

        var y = "<IgnoreCaseOption>" +
            "<A>" +
            "</A>" +
            "<a>" +
            "</a>" +
            "<B>" +
            "</B>" +
            "<b>" +
            "</b>" +
            "<C>" +
            "</C>" +
            "<c>" +
            "</c>" +
            "<D>" +
            "</D>" +
            "<d>" +
            "</d>" +
            "<E>" +
            "</E>" +
            "<e>" +
            "</e>" +
            "<F>" +
            "</F>" +
            "<f>" +
            "</f>" +
            "<ZZZ A=\"\" a=\"\" C=\"\" c=\"\" H=\"\" j=\"\" K=\"\" k=\"\" Z=\"\" z=\"\"/>" +
            "</IgnoreCaseOption>";

        var opts = Core.createSortingOptionsHelper([], [], true);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })

    it('xml-sort -t \'z x\' -a \'x z\' readme-example', function () {
        var x = examples['readme-example'];

        var y = "<sorting>" +
            "<attributes>" +
            "<x x=\"\" z=\"\" a=\"\" b=\"\" c=\"\"/>" +
            "</attributes>" +
            "<tags>" +
            "<z></z>" +
            "<x></x>" +
            "<a></a>" +
            "<b></b>" +
            "<c></c>" +
            "</tags>" +
            "<tagsWithSameName>" +
            "<x x=\"d\" z=\"a\" a=\"d\" c=\"c\"/>" +
            "<x x=\"d\" z=\"a\" a=\"e\" c=\"d\"/>" +
            "<x x=\"d\" z=\"e\" a=\"c\" c=\"b\"/>" +
            "<x x=\"d\" z=\"z\" a=\"c\" c=\"b\"/>" +
            "<x x=\"f\" z=\"e\" a=\"c\" c=\"g\"/>" +
            "</tagsWithSameName>" +
            "</sorting>";

        var opts = Core.createSortingOptionsHelper(['z', 'x'], ['x', 'z'], false);

        var res = clean(Core.sort(x, opts));

        assert.equal(res, y);
    })
});
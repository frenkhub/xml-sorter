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
    });
});
var assert = require('assert');
var Core = require('../src/core');

describe('core.js', function () {

    describe('#alphabeticalComparator()', function () {
        it('default scenario', function () {
            var res = Core.alphabeticalComparator("a", "b");
            assert.equal(res, -1);
        });
    });

    describe('#buildObjectComparator()', function () {
        it('default scenario', function () {
            var x = {
                _Attribs:
                {
                    a: 'a',
                    b: 'a'
                }
            };

            var y = {
                _Attribs:
                {
                    a: 'a',
                    b: 'b'
                }
            }

            var comparator = Core.buildAttribsComparator();

            var res = comparator(x, y);
            assert.equal(res, -1);
        });
    });

    describe('#buildComparatorFromList()', function () {
        it('default scenario', function () {
            var comparator = Core.buildComparatorFromList(['b']);
            var res = comparator('b', 'a');
            assert.equal(res, -1);
        })
    });

    describe('#composeComparators()', function () {
        it('default scenario', function () {
            var primary = Core.buildComparatorFromList(['z']);
            var secondary = Core.alphabeticalComparator;
            var comparator = Core.composeComparators(primary, secondary);

            assert.equal(comparator('z', 'a'), -1);
            assert.equal(comparator('a', 'b'), -1);
        })
    });

    describe('#invertComparator()', function () {
        it('default scenario', function () {
            var comparator = Core.invertComparator(Core.alphabeticalComparator);
            assert.equal(comparator('a', 'b'), 1);
        })
    });

});
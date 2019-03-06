var assert = require('assert');
var Core = require('../src/core');

// github issues
var issues = {};
issues[1] = "<div><t1 a=\"\" b=\"\" /><t1 a=\"\" /></div>";

// helpers
function clean(stringXml) {
    return stringXml
        .replace(/<\?.+\?>/, '')
        .replace(/\s\s+/g, ' ')
        .replace(/>\s+/g, '>')
        .replace(/\n/, '');
}

describe('from github issues', function () {

    it('issue #1', function () {
        assert.ok(Core.sort(issues[1]));
    });
});
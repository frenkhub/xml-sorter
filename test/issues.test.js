var assert = require('assert');
var Core = require('../src/core');

// github issues
var issues = {};
issues[1] = "<div><t1 a=\"\" b=\"\" /><t1 a=\"\" /></div>";
issues[2] = "<div><a>code=\"a->point\"</a><a>code=\"b->point\"</a></div>"

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

    it('issue #2', function(){
        var issue = issues[2];
        var expected = clean(issue);
        var output = clean(Core.sort(issue));

        assert.equal(output, expected);
    });
});

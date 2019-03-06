var examples = {};

// case 0
examples[0] = "<root>" +
    "<artist name='zzz'/>" +
    "<artist name='ccc'/>" +
    "<artist name='aaa'/>" +
    "</root>";

// case 1
examples[1] = "<root>" +
    "<artist a='zzz'/>" +
    "<artist b='ccc'/>" +
    "<artist c='aaa'/>" +
    "<artist d='aaa'/>" +
    "<artist e='aaa'/>" +
    "<artist f='bbb'/>" +
    "<artist f='aaa'/>" +
    "</root>";

// case 2
examples[2] = "<root>" +
    "<z />" +
    "<c />" +
    "<a>" +
    "<z/>" +
    "<b/>" +
    "<d/>" +
    "</a>" +
    "</root>";

// case 3
examples[3] = "<root z='' x='' a=''/>";

// case 4
examples[4] = "<tagsWithSameName>" +
    "<x b='a' c='b' a='c' x='d' z='e'/>" +
    "<x b='b' c='c' a='d' x='d' z='a'/>" +
    "<x b='c' c='d' a='e' x='d' z='a'/>" +
    "<x b='a' c='b' a='c' x='d' z='z'/>" +
    "<x b='h' c='g' a='c' x='f' z='e'/>" +
    "</tagsWithSameName>";

// case 5
examples[5] = "<IgnoreCaseOption>" +
    "<D/>" +
    "<C/>" +
    "<f/>" +
    "<b/>" +
    "<B/>" +
    "<c/>" +
    "<e/>" +
    "<A/>" +
    "<E/>" +
    "<F/>" +
    "<a/>" +
    "<d/>" +
    "<ZZZ z='' Z='' k='' K='' C='' H='' j='' A='' c='' a=''/>" +
    "</IgnoreCaseOption>";

// case readme-example.xml
examples['readme-example'] = "<sorting>" +
    "<tags>" +
    "<b/>" +
    "<c/>" +
    "<a/>" +
    "<x/>" +
    "<z/>" +
    "</tags>" +
    "<attributes>" +
    "<x b='' c='' a='' x='' z=''/>" +
    "</attributes>" +
    "<tagsWithSameName>" +
    "<x c='b' a='c' x='d' z='e'/>" +
    "<x c='c' a='d' x='d' z='a'/>" +
    "<x c='d' a='e' x='d' z='a'/>" +
    "<x c='b' a='c' x='d' z='z'/>" +
    "<x c='g' a='c' x='f' z='e'/>" +
    "</tagsWithSameName>" +
    "</sorting>";

exports.examples = examples;
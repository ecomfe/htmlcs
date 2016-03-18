/**
 * @file test for spec nest-rule util
 * @author nighca<nighca@live.cn>
 */

var emmet = require('emmet');
var rules = require('../../../lib/spec/nest-rule');
var util = require('../../../lib/spec/nest-rule/util')(rules);
var parse = require('../../../lib/parse');

var getFirstTag = function (domExpression) {
    return domExpression.match(/^[\w\-]+/)[0];
};

var getElement = function (domExpression, query) {
    var htmlCode = emmet.expandAbbreviation(domExpression, {html: 'xhtml'});
    var document = parse(htmlCode);
    return document.querySelector(query || getFirstTag(domExpression));
};

describe('method getRule', function () {
    var getRule = util.getRule;

    it('should get correct rule for known elements', function () {
        ['html', 'p', 'div', 'span', 'script', 'math', 'svg'].forEach(function (tag) {
            expect(getRule(getElement(tag))).toBe(rules[tag]);
        });
    });

    it('should return undefined for unknown elements', function () {
        expect(getRule(getElement('self-defined-tag'))).toBe(undefined);
    });
});

describe('method getCategories', function () {
    var getRule = util.getRule;
    var getCategories = util.getCategories;

    it('should get correct rule for known elements', function () {
        ['html', 'p', 'div', 'span', 'script', 'math', 'svg'].forEach(function (tag) {
            var element = getElement(tag);
            expect(getCategories(element)).toEqual(getRule(element).getCategories(element));
        });
    });

    it('should return empty list for unknown elements', function () {
        expect(getCategories(getElement('self-defined-tag'))).toEqual([]);
    });
});

describe('method nodeInfo', function () {
    var nodeInfo = util.nodeInfo;

    it('should get node info description for given elements', function () {
        ['html', 'p', 'div', 'span', 'script', 'math', 'svg'].forEach(function (tag) {
            expect(typeof nodeInfo(getElement(tag))).toBe('string');
        });
    });
});

describe('method nodeCategoriesInfo', function () {
    var nodeCategoriesInfo = util.nodeCategoriesInfo;

    it('should get node info description for given elements', function () {
        ['html', 'p', 'div', 'span', 'script', 'math', 'svg'].forEach(function (tag) {
            expect(typeof nodeCategoriesInfo(getElement(tag))).toBe('string');
        });
    });
});

describe('method sequenceInfo', function () {
    var sequenceInfo = util.sequenceInfo;

    it('should get node info description for given elements', function () {
        ['html>head+body', 'body>p+div', 'div>p*2+div', 'span>i+{hello!}+strong', 'i'].forEach(function (tag) {
            expect(typeof sequenceInfo(getElement(tag).children)).toBe('string');
        });
    });
});

describe('method isCategory & isNotCategory', function () {
    var isCategory = util.isCategory;
    var isNotCategory = util.isNotCategory;

    it('should get correct result for category match', function () {
        expect(isCategory('interactive content', getElement('audio[controls]'))).toBe(true);
        expect(isNotCategory('interactive content', getElement('audio'))).toBe(true);
    });

    it('should return true for unknown elements', function () {
        expect(isCategory('interactive content', getElement('self-defined-tag'))).toBe(true);
        expect(isNotCategory('interactive content', getElement('self-defined-tag'))).toBe(false);
    });
});

describe('method isTag & isNotTag', function () {
    var isTag = util.isTag;
    var isNotTag = util.isNotTag;

    it('should get correct result for tag match', function () {
        expect(isTag('p', getElement('p'))).toBe(true);
        expect(isTag('div', getElement('div'))).toBe(true);
        expect(isTag('span', getElement('span'))).toBe(true);
        expect(isTag('p|div|span,', getElement('p'))).toBe(true);
        expect(isTag('p|div|span,', getElement('p>span'))).toBe(true);

        expect(isNotTag('p', undefined)).toBe(true);
        expect(isNotTag('span', getElement('p'))).toBe(true);
        expect(isNotTag('p|span', getElement('p'))).toBe(false);
        expect(isNotTag('div|span', getElement('p'))).toBe(true);
    });
});

describe('method getAncestors', function () {
    var getAncestors = util.getAncestors;

    var getAncestorsInfo = function (element) {
        return getAncestors(element).reverse().map(function (ancestor) {
            return ancestor.tagName.toLowerCase();
        }).join(',');
    };

    var getTargetElement = function (domExpression) {
        return getElement(domExpression, '#target');
    };

    it('should get ancestors for given element', function () {
        expect(
            getAncestorsInfo(
                getTargetElement('html>head+body>script+div>(p#target>i)+ul>li*2')
            )
        ).toBe('html,body,div');
        expect(
            getAncestorsInfo(
                getTargetElement('html>head>meta+title+script#target')
            )
        ).toBe('html,head');
        expect(
            getAncestorsInfo(
                getTargetElement('html>head+body>p+ol>li>(h5#target>span*2)+p')
            )
        ).toBe('html,body,ol,li');
        expect(
            getAncestorsInfo(
                getTargetElement('body#target')
            )
        ).toBe('');
    });
});

describe('method walkDescendants', function () {
    var walkDescendants = util.walkDescendants;

    var getDescendantsInfo = function (element) {
        var descendants = [];
        walkDescendants(element, function (descendant) {
            descendants.push(descendant.tagName.toLowerCase());
        });
        return descendants.join(',');
    };

    it('should get ancestors for given element', function () {
        expect(
            getDescendantsInfo(
                getElement('html>head+body>script+div>(p>i)+ul>li*2')
            )
        ).toBe('head,body,script,div,p,i,ul,li,li');
        expect(
            getDescendantsInfo(
                getElement('html>head>meta+title+script')
            )
        ).toBe('head,meta,title,script');
        expect(
            getDescendantsInfo(
                getElement('html>head+body>p+ol>li>(h5>span*2)+p')
            )
        ).toBe('head,body,p,ol,li,h5,span,span,p');
        expect(
            getDescendantsInfo(
                getElement('body')
            )
        ).toBe('');
    });
});

describe('method validateCategory', function () {
    var validateCategory = util.validateCategory;
    var validateChildrenCategory = function (expected, element) {
        return validateCategory(expected, element.children).length;
    };

    it('should get correct result for category match', function () {
        expect(validateChildrenCategory('interactive content', getElement('div>a+textarea'))).toBe(0);
        expect(validateChildrenCategory('interactive content', getElement('div>a+textarea+p'))).toBe(1);
        expect(validateChildrenCategory('interactive content', getElement('div>a+textarea+p+span'))).toBe(2);
        expect(validateChildrenCategory('interactive content', getElement('div>a+self-defined-tag'))).toBe(0);
    });
});

describe('method validateChildrenSequence', function () {
    var validateChildrenSequence = util.validateChildrenSequence;

    var shouldReport = function (expected, domExpression) {
        var result = validateChildrenSequence(expected, getElement(domExpression));
        expect(result.length).toBe(1);
        expect(result[0].expect).toBe(expected.desc);
    };

    var shouldNotReport = function (expected, domExpression) {
        var result = validateChildrenSequence(expected, getElement(domExpression));
        expect(result.length).toBe(0);
    };

    it('should validate correctly for ?', function () {
        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '?']]
        }, 'div');

        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '?']]
        }, 'div>a');

        shouldReport({
            desc: 'test',
            sequence: [['a|p', '?']]
        }, 'div>a*2');

        shouldReport({
            desc: 'test',
            sequence: [['a|p', '?']]
        }, 'div>a+p');
    });

    it('should validate correctly for *', function () {
        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '*']]
        }, 'div');

        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '*']]
        }, 'div>a');

        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '*']]
        }, 'div>a*2');

        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '*']]
        }, 'div>a+p');
    });

    it('should validate correctly for *', function () {
        shouldReport({
            desc: 'test',
            sequence: [['a|p', '+']]
        }, 'div');

        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '+']]
        }, 'div>a');

        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '+']]
        }, 'div>a*2');

        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', '+']]
        }, 'div>a+p');
    });

    it('should validate correctly for num', function () {
        shouldReport({
            desc: 'test',
            sequence: [['a|p', 1]]
        }, 'div');

        shouldNotReport({
            desc: 'test',
            sequence: [['a|p', 1]]
        }, 'div>a');

        shouldReport({
            desc: 'test',
            sequence: [['a|p', 1]]
        }, 'div>a*2');

        shouldReport({
            desc: 'test',
            sequence: [['a|p', 1]]
        }, 'div>a+p');
    });

    it('should validate correctly for category requirement', function () {
        shouldReport({
            desc: 'test',
            sequence: [['p|category:interactive content', 2]]
        }, 'div');

        shouldNotReport({
            desc: 'test',
            sequence: [['p|category:interactive content', 2]]
        }, 'div>p+a');

        shouldNotReport({
            desc: 'test',
            sequence: [['p|category:interactive content', 2]]
        }, 'div>a*2');

        shouldNotReport({
            desc: 'test',
            sequence: [['p|category:interactive content', 2]]
        }, 'div>p*2');
    });

    it('should validate correctly for method requirement', function () {
        shouldReport({
            desc: 'test',
            sequence: [[util.isTag('p'), 1]]
        }, 'div');

        shouldNotReport({
            desc: 'test',
            sequence: [[util.isTag('p'), 1]]
        }, 'div>p');

        shouldReport({
            desc: 'test',
            sequence: [[util.isTag('p'), 1]]
        }, 'div>a');

        shouldReport({
            desc: 'test',
            sequence: [[util.isTag('p'), 1]]
        }, 'div>a+p');
    });

    it('should validate correctly for multi sequence requirement', function () {
        shouldReport({
            desc: 'test',
            sequence: [
                ['p', '*'],
                ['category:interactive content', '+'],
                ['div|category:embedded content', 1]
            ]
        }, 'div');

        shouldReport({
            desc: 'test',
            sequence: [
                ['p', '*'],
                ['category:interactive content', '+'],
                ['div|category:embedded content', 1]
            ]
        }, 'div>p+a');

        shouldReport({
            desc: 'test',
            sequence: [
                ['p', '*'],
                ['category:interactive content', '+'],
                ['div|category:embedded content', 1]
            ]
        }, 'div>p+div');

        shouldNotReport({
            desc: 'test',
            sequence: [
                ['p', '*'],
                ['category:interactive content', '+'],
                ['div|category:embedded content', 1]
            ]
        }, 'div>a+div');

        shouldNotReport({
            desc: 'test',
            sequence: [
                ['p', '*'],
                ['category:interactive content', '+'],
                ['div|category:embedded content', 1]
            ]
        }, 'div>p*2+a+div');

        shouldNotReport({
            desc: 'test',
            sequence: [
                ['p', '*'],
                ['category:interactive content', '+'],
                ['div|category:embedded content', 1]
            ]
        }, 'div>p*2+a*2+div');

        shouldNotReport({
            desc: 'test',
            sequence: [
                ['p', '*'],
                ['category:interactive content', '+'],
                ['div|category:embedded content', 1]
            ]
        }, 'div>a+audio');

    });
});

/**
 * @file test for nest-rule spec realization
 * @author nighca<nighca@live.cn>
 */

var emmet = require('emmet');
var rules = require('../../../lib/spec/nest-rule');
var parse = require('../../../lib/parse');

[
    {
        tag: 'html',
        categories: [
            {
                desc: 'none',
                cases: [
                    ['html>head+body', []]
                ]
            }
        ],
        contexts: [
            {
                desc: 'as the root element of a document',
                cases: [
                    ['html>head+body', 0],
                    ['div>html>head+body', 1]
                ]
            }
        ],
        content: [
            {
                desc: 'a head element followed by a body element',
                cases: [
                    ['html>head+body', 0],
                    ['html', 1],
                    ['html>head', 1],
                    ['html>body', 1],
                    ['html>head+div+body', 1],
                    ['html>div+head+body', 1],
                    ['html>head+body+div', 1]
                ]
            }
        ]
    },
    {
        tag: 'head',
        categories: [
            {
                desc: 'none',
                cases: [
                    ['head', []]
                ]
            }
        ],
        contexts: [
            {
                desc: 'as the first element in an html element',
                cases: [
                    ['html>head+body', 0],
                    ['html>div+head+body', 1],
                    ['div>head+body', 1]
                ]
            }
        ],
        content: [
            {
                desc: 'elements of metadata content, of which no more than one is a title element and no more than one is a base element',
                cases: [
                    ['head', 0],
                    ['head>div', 1],
                    ['head>meta+title+base', 0],
                    ['head>meta+title*2', 1],
                    ['head>meta+base*2', 1]
                ]
            }
        ]
    },
    {
        tag: 'title',
        categories: [
            {
                desc: 'metadata content',
                cases: [
                    ['title', ['metadata content']]
                ]
            }
        ],
        contexts: [
            {
                desc: 'in a head element containing no other title elements',
                cases: [
                    ['head>title', 0],
                    ['head>title+meta', 0],
                    ['head>title*2+meta', 1]
                ]
            }
        ],
        content: [
            {
                desc: 'text that is not inter-element whitespace',
                cases: [
                    ['title{hello!}', 0],
                    ['title>p{hello!}', 1],
                    ['title{\u0020\u0009\u000a\u000c\u000d}', 1],
                ]
            }
        ]
    },
    {
        tag: 'base',
        categories: [
            {
                desc: 'metadata content',
                cases: [
                    ['base', ['metadata content']]
                ]
            }
        ],
        contexts: [
            {
                desc: 'in a head element containing no other base elements',
                cases: [
                    ['head>base', 0],
                    ['head>base+meta', 0],
                    ['head>base*2+meta', 1]
                ]
            }
        ],
        content: [
            {
                desc: 'empty',
                cases: [
                    ['base', 0]
                ]
            }
        ]
    }
].forEach(function (current) {
    var tag = current.tag;
    var rule = rules[tag];

    var getElement = function (domExpression) {
        var htmlCode = emmet.expandAbbreviation(domExpression, {html: 'xhtml'});
        console.log(htmlCode);
        var document = parse(htmlCode);
        return document.querySelector('#target') || document.getElementsByTagName(tag)[0];
    };


    describe('nest rule for ' + tag, function () {
        it('should exist', function () {
            expect(rule).toBeTruthy();
        });
    });

    describe('categories of ' + tag, function () {
        current.categories.forEach(function (situation) {
            it('should be ' + situation.desc, function () {
                situation.cases.forEach(function (testcase) {
                    var dom = testcase[0];
                    var expected = testcase[1];
                    var element = getElement(dom);
                    var categories = rule.getCategories(element);

                    expect(categories).toEqual(expected);
                });
            });
        });
    });

    describe('contexts of ' + tag, function () {
        current.contexts.forEach(function (situation) {
            it('should be ' + situation.desc, function () {
                situation.cases.forEach(function (testcase) {
                    var dom = testcase[0];
                    var expected = testcase[1];
                    var element = getElement(dom);
                    var result = rule.validContext(element, []);

                    expect(result.length).toEqual(expected);
                });
            });
        });
    });

    describe('content of ' + tag, function () {
        current.content.forEach(function (situation) {
            it('should be ' + situation.desc, function () {
                situation.cases.forEach(function (testcase) {
                    var dom = testcase[0];
                    var expected = testcase[1];
                    var element = getElement(dom);
                    var result = rule.validContent(element, []);

                    expect(result.length).toEqual(expected);
                });
            });
        });
    });
});




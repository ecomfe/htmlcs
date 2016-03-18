/**
 * @file test for spec-define
 * @author nighca<nighca@live.cn>
 */

var emmet = require('emmet');
var define = require('../../lib/spec/define');
var parse = require('../../lib/parse');

var getFirstTag = function (domExpression) {
    return domExpression.match(/^[\w\-]+/)[0];
};

var getElement = function (domExpression, query) {
    var htmlCode = emmet.expandAbbreviation(domExpression, {html: 'xhtml'});
    var document = parse(htmlCode);
    return document.querySelector(query || getFirstTag(domExpression));
};

describe('define for inter-element whitespace', function () {
    var name = 'inter-element whitespace';
    var match = define.is(name);
    var dismatch = define.isNot(name);

    it('should match correctly', function () {
        expect(match(undefined)).toBe(true);
        expect(match(getElement('span').childNodes[0])).toBe(true);
        expect(match(getElement('span{\u0020}').childNodes[0])).toBe(true);
        expect(match(getElement('span{\u0009}').childNodes[0])).toBe(true);
        expect(match(getElement('span{\u000a}').childNodes[0])).toBe(true);
        expect(match(getElement('span{\u000c}').childNodes[0])).toBe(true);
        expect(match(getElement('span{\u000d}').childNodes[0])).toBe(true);
        expect(match(getElement('span{\u0020\u0009}').childNodes[0])).toBe(true);
        expect(match(getElement('span{\u0020\u0009\u000a\u000c\u000d}').childNodes[0])).toBe(true);

        expect(dismatch(getElement('span{hello!}').childNodes[0])).toBe(true);
        expect(dismatch(getElement('span{hello!\u0020}').childNodes[0])).toBe(true);
        expect(dismatch(getElement('span'))).toBe(true);
        expect(dismatch(getElement('p'))).toBe(true);
        expect(dismatch(getElement('div'))).toBe(true);
    });
});

describe('define for media element', function () {
    var name = 'media element';
    var match = define.is(name);
    var dismatch = define.isNot(name);

    it('should match correctly', function () {
        expect(match(getElement('audio'))).toBe(true);
        expect(match(getElement('audio[controls]'))).toBe(true);
        expect(match(getElement('video'))).toBe(true);
        expect(match(getElement('video[controls]'))).toBe(true);

        expect(dismatch(undefined)).toBe(true);
        expect(dismatch(getElement('span'))).toBe(true);
        expect(dismatch(getElement('p'))).toBe(true);
        expect(dismatch(getElement('div'))).toBe(true);
    });
});

describe('unfound define', function () {
    var name = 'some unfound define';
    var match = define.is(name);
    var dismatch = define.isNot(name);

    it('should never match', function () {
        expect(dismatch(getElement('span').childNodes[0])).toBe(true);
        expect(dismatch(getElement('span{hello!}').childNodes[0])).toBe(true);
        expect(dismatch(getElement('span'))).toBe(true);
        expect(dismatch(getElement('p'))).toBe(true);
        expect(dismatch(getElement('div'))).toBe(true);
    });
});
/**
 * @file test for parse
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var parse = require('../../lib/parse');

var testCasePath = path.resolve(__dirname, '../fixture/all.html');
var testCase = fs.readFileSync(testCasePath, {
    encoding: 'utf-8'
});

describe('parse', function () {
    var document = parse(testCase);

    it('should return a dom tree', function () {
        expect(document.nodeName).toBe('#document');

        var html = document.firstElementChild;
        expect(html.tagName).toBe('HTML');
        expect(html.firstElementChild.tagName).toBe('HEAD');
        expect(html.lastElementChild.tagName).toBe('BODY');

        var imgs = document.querySelectorAll('img');
        expect(imgs.length).toBe(3);
        expect(imgs[0].id).toBe('img1');
        expect(imgs[1].id).toBe('img2');
        expect(imgs[2].id).toBe('img3');
    });

    it('should record positions', function () {
        var titlePos = document.querySelector('title').startIndex;
        expect(titlePos).toBe(61);

        var divPos = document.querySelector('#div').startIndex;
        expect(divPos).toBe(751);

        var img1Pos = document.querySelector('#img1').startIndex;
        expect(img1Pos).toBe(999);
    });
});

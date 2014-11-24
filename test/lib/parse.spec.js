var assert = require('assert');

var fs = require('fs');
var path = require('path');
var parse = require('../../lib/parse');

var testCasePath = path.resolve(__dirname, '../cases/1.html');
var testCase = fs.readFileSync(testCasePath, {
    encoding: 'utf-8'
});

describe('parse', function () {
    var document = parse(testCase);

    it('should return a dom tree', function () {
        assert.strictEqual('#document', document.nodeName);

        var html = document.firstElementChild;
        assert.strictEqual('HTML', html.tagName);
        assert.strictEqual('HEAD', html.firstElementChild.tagName);
        assert.strictEqual('BODY', html.lastElementChild.tagName);

        var imgs = document.querySelectorAll('img');
        assert.strictEqual(3, imgs.length);
        assert.strictEqual('img1', imgs[0].id);
        assert.strictEqual('img2', imgs[1].id);
        assert.strictEqual('img3', imgs[2].id);
    });

    it('should record positions', function () {
        var titlePos = document.querySelector('title').startPos;
        assert.strictEqual(5, titlePos.line);
        assert.strictEqual(5, titlePos.col);

        var divPos = document.querySelector('#div').startPos;
        assert.strictEqual(27, divPos.line);
        assert.strictEqual(9, divPos.col);

        var img1Pos = document.querySelector('#img1').startPos;
        assert.strictEqual(36, img1Pos.line);
        assert.strictEqual(5, img1Pos.col);
    });
});

var assert = require('assert');

var path = require('path');
var util = require('../../lib/util');
var packageInfo = require('../../package.json');

describe('app', function () {
    var app = util.app;

    describe('root', function () {
        it('should be a string', function () {
            assert.strictEqual('string', typeof app.root);
        });

        it('should be the dir path where package.json locates', function () {
            assert.strictEqual(packageInfo, require(path.join(app.root, 'package.json')));
        });
    });
});

describe('nodeType', function () {
    var nodeType = util.nodeType;

    it('should be a type map', function () {
        assert.strictEqual('object', typeof nodeType);
    });
});

describe('isElement', function () {
    var isElement = util.isElement;

    it('should return true if passed an element node', function () {
        assert.strictEqual(true, isElement({
            type: 'tag'
        }));
        assert.strictEqual(true, isElement({
            type: 'script'
        }));
        assert.strictEqual(true, isElement({
            type: 'style'
        }));
    });

    it('should return false if passed an none-element node', function () {
        assert.strictEqual(false, isElement({
            type: 'comment'
        }));
        assert.strictEqual(false, isElement({
            type: 'text'
        }));
        assert.strictEqual(false, isElement({
            type: 'doctype'
        }));
    });
});

describe('extend', function () {
    var extend = util.extend;

    describe('extend object', function () {
        var result = extend(
            {
                a: 1,
                b: 1
            },
            {
                b: 2,
                c: 3
            }
        );

        it('should return right result', function () {
            assert.strictEqual(1, result.a);
            assert.strictEqual(2, result.b);
            assert.strictEqual(3, result.c);
        });
    });
});

describe('cachable', function () {
    var cachable = util.cachable;

    describe('valueOf', function () {
        var count = 0;
        var valueOf = cachable(function (key) {
            count++;
            return key;
        });

        it('should return right result', function () {
            assert.strictEqual('1', valueOf('1'));
            assert.strictEqual('2', valueOf('2'));
        });

        it('should cache result', function () {
            assert.strictEqual('1', valueOf('1'));
            assert.strictEqual(2, count);
        });

        it('should run getter again if refresh required', function () {
            assert.strictEqual('1', valueOf('1', true));
            assert.strictEqual(3, count);
        });

        it('should clean cached data while method clear called', function () {
            valueOf.clear();
            assert.strictEqual('1', valueOf('1'));
            assert.strictEqual('2', valueOf('2'));
            assert.strictEqual(5, count);
        });
    });
});

describe('getHomePath', function () {
    var getHomePath = util.getHomePath;

    it('should return a path', function () {
        assert.strictEqual('string', typeof getHomePath());
    });
});

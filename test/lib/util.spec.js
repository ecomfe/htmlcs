/**
 * @file test for util methods
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var util = require('../../lib/util');
var packageInfo = require('../../package.json');

describe('app', function () {
    var app = util.app;

    describe('root', function () {
        it('should be a string', function () {
            expect(typeof app.root).toBe('string');
        });

        it('should be the dir path where package.json locates', function () {
            expect(require(path.join(app.root, 'package.json'))).toBe(packageInfo);
        });
    });
});

describe('nodeType', function () {
    var nodeType = util.nodeType;

    it('should be a type map', function () {
        expect(typeof nodeType).toBe('object');
    });
});

describe('isElement', function () {
    var isElement = util.isElement;

    it('should return true if passed an element node', function () {
        expect(isElement({
            type: 'tag'
        })).toBe(true);
        expect(isElement({
            type: 'script'
        })).toBe(true);
        expect(isElement({
            type: 'style'
        })).toBe(true);
    });

    it('should return false if passed an none-element node', function () {
        expect(isElement({
            type: 'comment'
        })).toBe(false);
        expect(isElement({
            type: 'text'
        })).toBe(false);
        expect(isElement({
            type: 'doctype'
        })).toBe(false);
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
            expect(result.a).toBe(1);
            expect(result.b).toBe(2);
            expect(result.c).toBe(3);
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
            expect(valueOf('1')).toBe('1');
            expect(valueOf('2')).toBe('2');
        });

        it('should cache result', function () {
            expect(valueOf('1')).toBe('1');
            expect(count).toBe(2);
        });

        it('should run getter again if refresh required', function () {
            expect(valueOf('1', true)).toBe('1');
            expect(count).toBe(3);
        });

        it('should clean cached data while method clear called', function () {
            valueOf.clear();
            expect(valueOf('1')).toBe('1');
            expect(valueOf('2')).toBe('2');
            expect(count).toBe(5);
        });
    });
});

describe('getHomePath', function () {
    var getHomePath = util.getHomePath;

    it('should return a path', function () {
        expect(typeof getHomePath()).toBe('string');
    });
});

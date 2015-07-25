/**
 * @file test for util methods
 * @author nighca<nighca@live.cn>
 */

var util = require('../../lib/util');

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

describe('extendAttribute', function () {
    var extendAttribute = util.extendAttribute;

    describe('extend attributes', function () {
        var result = extendAttribute(
            {
                a: 1,
                b: 1
            },
            {
                b: {
                    get: function () {
                        return 2;
                    }
                },
                c: {
                    get: function () {
                        return this.b + 1;
                    },
                    set: function (c) {
                        this.a = c - 2;
                    }
                }
            }
        );

        it('should return right result', function () {
            expect(result.a).toBe(1);
            expect(result.b).toBe(2);
            expect(result.c).toBe(3);

            result.c = 4;
            expect(result.a).toBe(2);
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

describe('getPosition', function () {
    var getPosition = util.getPosition;
    var content = [
        'This is content for test getPosition.',
        'Words written here may make no sense.',
        'The end.'
    ].join('\n');
    var position = getPosition(content);
    var pos = getPosition(content, content.indexOf('The end.') + 2);

    it('should return a function given one argument', function () {
        expect(typeof position).toBe('function');
    });

    it('should return position info given two argument', function () {
        expect(typeof pos).toBe('object');
    });

    it('should position right', function () {
        var pos0 = position(0);
        expect(pos0.line).toBe(1);
        expect(pos0.column).toBe(1);

        var posOfWrittern = position(content.indexOf('written'));
        expect(posOfWrittern.line).toBe(2);
        expect(posOfWrittern.column).toBe(7);

        var posOfTheEndPlus2 = position(content.indexOf('The end.') + 2);
        expect(posOfTheEndPlus2.line).toBe(3);
        expect(posOfTheEndPlus2.column).toBe(3);

        expect(pos.line).toBe(3);
        expect(pos.column).toBe(3);
    });
});

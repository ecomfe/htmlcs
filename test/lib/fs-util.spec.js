/**
 * @file test for fs-relative util methods
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var util = require('../../lib/fs-util');
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

describe('getHomePath', function () {
    var getHomePath = util.getHomePath;

    it('should return a path', function () {
        expect(typeof getHomePath()).toBe('string');
    });
});

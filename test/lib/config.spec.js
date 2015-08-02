/**
 * @file test for config
 * @author nighca<nighca@live.cn>
 */

var sh = require('shelljs');
var fs = require('fs');
var path = require('path');
var fsUtil = require('../../lib/fs-util');
var config = require('../../lib/config');

describe('load', function () {
    var configFilePath;

    var createConfigFile = function (targetDirPath, cnt) {
        var filePath = path.join(targetDirPath, config.fileName);
        fs.writeFileSync(filePath, cnt || [
            '{',
            '    // The is a file for test',
            '    "test": true    // value "test" should be true',
            '}'
        ].join('\n'));
        configFilePath = filePath;
    };

    var removeConfigFile = function () {
        sh.rm(configFilePath);
        configFilePath = null;
    };

    describe('config file in same directory', function () {
        it('should return right config', function () {
            createConfigFile(__dirname);

            expect(config.load(__filename, true).test).toBe(true);

            removeConfigFile();
        });
    });

    describe('config file in parent directory', function () {
        it('should return right config', function () {
            createConfigFile(path.resolve(__dirname, '../'));

            expect(config.load(__filename, true).test).toBe(true);

            removeConfigFile();
        });
    });

    describe('config file in another parent directory', function () {
        it('should return right config', function () {
            createConfigFile(path.resolve(__dirname, '../../'));

            expect(config.load(__filename, true).test).toBe(true);

            removeConfigFile();
        });
    });

    describe('config file in home path', function () {
        it('should return right config', function () {
            createConfigFile(fsUtil.getHomePath());

            expect(config.load(__filename, true).test).toBe(true);

            removeConfigFile();
        });
    });

    describe('no config file', function () {
        it('should use default config', function () {
            var cfg = config.load(__filename, true);
            expect(cfg.default).toBe(true);
        });
    });

    describe('wrong config file', function () {
        it('should throw error', function () {
            createConfigFile(__dirname, 'xxx');

            var err;
            try {
                config.load(__filename, true);
            }
            catch (e) {
                err = e;
            }

            expect(err instanceof Error).toBe(true);

            removeConfigFile();
        });
    });
});

var assert = require('assert');

var sh = require('shelljs');
var fs = require('fs');
var path = require('path');
var util = require('../../lib/util');
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

            assert.strictEqual(true, config.load(__filename, true).test);

            removeConfigFile();
        });
    });

    describe('config file in parent directory', function () {
        it('should return right config', function () {
            createConfigFile(path.resolve(__dirname, '../'));

            assert.strictEqual(true, config.load(__filename, true).test);

            removeConfigFile();
        });
    });

    describe('config file in another parent directory', function () {
        it('should return right config', function () {
            createConfigFile(path.resolve(__dirname, '../../'));

            assert.strictEqual(true, config.load(__filename, true).test);

            removeConfigFile();
        });
    });

    // HELP! how to test config file under '/'? >_<
    /*describe('config file in root', function () {
        it('should return right config', function () {
            createConfigFile(path.resolve('/'));

            assert.strictEqual(true, config.load(__filename).test);

            removeConfigFile();
        });
    });*/

    describe('config file in home path', function () {
        it('should return right config', function () {
            createConfigFile(util.getHomePath());

            assert.strictEqual(true, config.load(__filename, true).test);

            removeConfigFile();
        });
    });

    describe('no config file', function () {
        it('should use default config', function () {
            var cfg = config.load(__filename, true);
            assert.strictEqual(true, cfg['default']);
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

            assert.strictEqual(true, err instanceof Error);

            removeConfigFile();
        });
    });
});

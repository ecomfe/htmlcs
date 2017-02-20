/**
 * @file test for lib/htmlcs
 * @author nighca<nighca@live.cn>
 */

var htmlcs = require('../../lib/htmlcs');

describe('htmlcs', function () {

    describe('hint', function () {

        it('should hint correctly', function () {
            var code = '<html></html>';
            var cfg = {
                'html-lang': true
            };

            var result = htmlcs.hint(code, cfg);
            expect(result.length).toBe(1);
            expect(result[0].code).toBe('010');
            expect(result[0].rule).toBe('html-lang');
            expect(result[0].line).toBe(1);
            expect(result[0].column).toBe(1);
        });

        it('should hint correctly with no config (null / undefined / {})', function () {
            var code = '<html></html>';
            expect(htmlcs.hint(code, null).length).toBe(0);
            expect(htmlcs.hint(code).length).toBe(0);
            expect(htmlcs.hint(code, {}).length).toBe(0);
        });

    });

    describe('hintAsync', function () {

        it('should hint correctly & asyncly', function (done) {
            var code = '<html></html>';
            var cfg = {
                'html-lang': true
            };

            /* eslint-disable max-nested-callbacks */
            htmlcs.hintAsync(code, cfg).then(
                function (result) {
                    expect(result.length).toBe(1);
                    expect(result[0].code).toBe('010');
                    expect(result[0].rule).toBe('html-lang');
                    expect(result[0].line).toBe(1);
                    expect(result[0].column).toBe(1);
                    done();
                }
            );
            /* eslint-enable max-nested-callbacks */
        });

    });

    describe('format', function () {

        it('should format correctly', function () {
            var code = '<html></html>';
            var cfg = {
                'html-lang': true
            };

            expect(htmlcs.format(code, cfg)).toBe('<html lang="zh-CN"></html>');
        });

        it('should format correctly with no config (null / undefined / {})', function () {
            var code = '<html></html>';
            expect(htmlcs.format(code, null)).toBe(code);
            expect(htmlcs.format(code)).toBe(code);
            expect(htmlcs.format(code, {})).toBe(code);
        });

    });

    describe('formatAsync', function () {

        it('should format correctly & asyncly', function (done) {
            var code = '<html></html>';
            var cfg = {
                'html-lang': true
            };

            /* eslint-disable max-nested-callbacks */
            htmlcs.formatAsync(code, cfg).then(
                function (result) {
                    expect(result).toBe('<html lang="zh-CN"></html>');
                    done();
                }
            );
            /* eslint-enable max-nested-callbacks */
        });

        it('should support script/style formatters which returns a promise', function (done) {
            var code = '<html><script>*</script><style>*</style></html>';
            var asyncScriptFormatter = function () {
                return Promise.resolve('script');
            };
            var asyncStyleFormatter = function () {
                return Promise.resolve('style');
            };
            var cfg = {
                'html-lang': true,
                'format': {
                    'no-format': true,
                    'formatter': {
                        script: asyncScriptFormatter,
                        style: asyncStyleFormatter
                    }
                }
            };

            /* eslint-disable max-nested-callbacks */
            htmlcs.formatAsync(code, cfg).then(
                function (result) {
                    expect(result).toBe('<html lang="zh-CN"><script>script</script><style>style</style></html>');
                    done();
                }
            );
            /* eslint-enable max-nested-callbacks */
        });

    });

    describe('add rule', function () {

        it('should add rule correctly', function () {
            var code = '<html></html>';
            var cfg = {
                'html-lang': true
            };
            var rule = {
                name: 'test-rule',
                desc: 'Just a test rule.',
                lint: function (getCfg, document, reporter) {
                    reporter.warn(
                        1,
                        '099',
                        'This is a test waring!'
                    );
                }
            };

            htmlcs.addRule(rule);
            var result = htmlcs.hint(code, cfg);

            expect(result.length).toBe(2);

            expect(result[0].code).toBe('010');
            expect(result[0].rule).toBe('html-lang');
            expect(result[0].line).toBe(1);
            expect(result[0].column).toBe(1);

            expect(result[1].code).toBe('099');
            expect(result[1].rule).toBe('test-rule');
            expect(result[1].line).toBe(1);
            expect(result[1].column).toBe(2);
        });

    });

});

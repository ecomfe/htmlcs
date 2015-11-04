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

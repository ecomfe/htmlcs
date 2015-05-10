/**
 * @file test for Reporter
 * @author nighca<nighca@live.cn>
 */

var Reporter = require('../../lib/reporter');

describe('result', function () {
    describe('inititial status', function () {
        it('should return empty list', function () {
            var reporter = new Reporter();
            var num = reporter.num();
            var result = reporter.result();

            expect(num).toBe(0);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });
    });

    describe('after adding a report', function () {
        it('should return list with this report', function () {
            var reporter = new Reporter();
            var report = {
                pos: 1,
                type: 'INFO',
                code: '001',
                message: 'test report'
            };
            reporter.report(report);
            var num = reporter.num();
            var result = reporter.result();

            expect(num).toBe(1);
            expect(result.length).toBe(1);
            expect(result[0].pos).toBe(report.pos);
            expect(result[0].type).toBe(report.type);
            expect(result[0].code).toBe(report.code);
            expect(result[0].message).toBe(report.message);
        });
    });

    describe('after adding more reports', function () {
        it('should return list with all reports sorted by pos', function () {
            var reporter = new Reporter();

            var report1 = {
                pos: 1,
                type: 'INFO',
                code: '001',
                message: 'test report1'
            };
            var report2 = {
                pos: 2,
                type: 'WARN',
                code: '002',
                message: 'test report2'
            };
            var report3 = {
                pos: 3,
                type: 'ERROR',
                code: '003',
                message: 'test report3'
            };
            var report4 = {
                pos: 4,
                type: 'ERROR',
                code: '004',
                message: 'test report4'
            };

            reporter.report(report2);
            reporter.report(report4);
            reporter.report(report1);
            reporter.report(report3);

            var num = reporter.num();
            var result = reporter.result();

            expect(num).toBe(4);
            expect(result.length).toBe(4);

            expect(result[0].pos).toBe(report1.pos);
            expect(result[0].type).toBe(report1.type);
            expect(result[0].code).toBe(report1.code);
            expect(result[0].message).toBe(report1.message);

            expect(result[1].pos).toBe(report2.pos);
            expect(result[1].type).toBe(report2.type);
            expect(result[1].code).toBe(report2.code);
            expect(result[1].message).toBe(report2.message);

            expect(result[2].pos).toBe(report3.pos);
            expect(result[2].type).toBe(report3.type);
            expect(result[2].code).toBe(report3.code);
            expect(result[2].message).toBe(report3.message);

            expect(result[3].pos).toBe(report4.pos);
            expect(result[3].type).toBe(report4.type);
            expect(result[3].code).toBe(report4.code);
            expect(result[3].message).toBe(report4.message);
        });
    });
});

describe('report', function () {
    describe('with pos', function () {
        it('should record the right item', function () {
            var reporter = new Reporter();
            var report = {
                pos: 1,
                type: 'INFO',
                code: '001',
                message: 'test report'
            };
            reporter.report(report);
            var num = reporter.num();
            var result = reporter.result();

            expect(num).toBe(1);
            expect(result.length).toBe(1);
            expect(result[0].pos).toBe(report.pos);
            expect(result[0].type).toBe(report.type);
            expect(result[0].code).toBe(report.code);
            expect(result[0].message).toBe(report.message);
        });
    });

    describe('without pos', function () {
        it('should record the right item (pos: 0)', function () {
            var reporter = new Reporter();
            var report = {
                type: 'INFO',
                code: '001',
                message: 'test report'
            };
            reporter.report(report);
            var num = reporter.num();
            var result = reporter.result();

            expect(num).toBe(1);
            expect(result.length).toBe(1);
            expect(result[0].pos).toBe(0);
            expect(result[0].type).toBe(report.type);
            expect(result[0].code).toBe(report.code);
            expect(result[0].message).toBe(report.message);
        });
    });
});

describe('info', function () {
    it('should record the right item (type "INFO")', function () {
        var reporter = new Reporter();
        var startIndex = 1;
        var code = '001';
        var message = 'test info';
        reporter.info(startIndex, code, message);
        var num = reporter.num();
        var result = reporter.result();

        expect(num).toBe(1);
        expect(result.length).toBe(1);
        expect(result[0].type).toBe('INFO');
        expect(result[0].code).toBe(code);
        expect(result[0].pos).toBe(startIndex);
        expect(result[0].message).toBe(message);
    });
});

describe('warn', function () {
    it('should record the right item (type "WARN")', function () {
        var reporter = new Reporter();
        var startIndex = 1;
        var code = '001';
        var message = 'test warn';
        reporter.warn(startIndex, code, message);
        var num = reporter.num();
        var result = reporter.result();

        expect(num).toBe(1);
        expect(result.length).toBe(1);
        expect(result[0].type).toBe('WARN');
        expect(result[0].code).toBe(code);
        expect(result[0].pos).toBe(startIndex);
        expect(result[0].message).toBe(message);
    });
});

describe('error', function () {
    it('should record the right item (type "ERROR")', function () {
        var reporter = new Reporter();
        var startIndex = 1;
        var code = '001';
        var message = 'test error';
        reporter.error(startIndex, code, message);
        var num = reporter.num();
        var result = reporter.result();

        expect(num).toBe(1);
        expect(result.length).toBe(1);
        expect(result[0].type).toBe('ERROR');
        expect(result[0].code).toBe(code);
        expect(result[0].pos).toBe(startIndex);
        expect(result[0].message).toBe(message);
    });
});

describe('bindRule', function () {
    var reporter = new Reporter();

    reporter.report({
        message: 'test1'
    });

    var reporterForRuleA = reporter.bindRule('A');

    reporterForRuleA.report({
        message: 'test2'
    });

    reporterForRuleA.warn(0, '001', 'test3', 'B');

    it('should keep list while binding', function () {
        expect(reporterForRuleA.num()).toBe(reporter.num());
        expect(reporterForRuleA.result()[0].message).toBe('test1');
        expect(reporterForRuleA.result()[1].message).toBe('test2');
        expect(reporterForRuleA.result()[2].message).toBe('test3');
        expect(reporter.result()[1].message).toBe('test2');
        expect(reporter.result()[2].message).toBe('test3');
    });

    it('should use bound rule as default', function () {
        expect(reporterForRuleA.result()[1].rule).toBe('A');
    });

    it('should prefer given rule than bound rule', function () {
        expect(reporterForRuleA.result()[2].rule).toBe('B');
    });
});

describe('disable & enable', function () {
    var reporter = new Reporter();

    reporter.report({
        message: 'test1'
    });

    reporter.disable();
    reporter.report({
        message: 'test2'
    });

    reporter.enable();
    reporter.warn(0, '001', 'test3');

    reporter.disable();
    reporter.error(0, '002', 'test4');

    it('should disable & enable correctly', function () {
        expect(reporter.num()).toBe(2);
        expect(reporter.result()[0].message).toBe('test1');
        expect(reporter.result()[1].message).toBe('test3');
    });
});

var Reporter = require('../../lib/reporter');

describe('result', function () {
    describe('inititial status', function () {
        it('should return empty list', function () {
            var reporter = new Reporter();
            var result = reporter.result();

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });
    });

    describe('after adding a report', function () {
        it('should return list with this report', function () {
            var reporter = new Reporter();
            var report = {
                pos: {
                    line: 1,
                    col: 1
                },
                type: 'INFO',
                rule: '001',
                message: 'test report'
            };
            reporter.report(report);
            var result = reporter.result();

            expect(result.length).toBe(1);
            expect(result[0].line).toBe(report.pos.line);
            expect(result[0].col).toBe(report.pos.col);
            expect(result[0].type).toBe(report.type);
            expect(result[0].rule).toBe(report.rule);
            expect(result[0].message).toBe(report.message);
        });
    });

    describe('after adding more reports', function () {
        it('should return list with all reports sorted by pos', function () {
            var reporter = new Reporter();

            var report1 = {
                pos: {
                    line: 1,
                    col: 1
                },
                type: 'INFO',
                rule: '001',
                message: 'test report1'
            };
            var report2 = {
                pos: {
                    line: 2,
                    col: 2
                },
                type: 'WARN',
                rule: '002',
                message: 'test report2'
            };
            var report3 = {
                pos: {
                    line: 3,
                    col: 3
                },
                type: 'ERROR',
                rule: '003',
                message: 'test report3'
            };
            var report4 = {
                pos: {
                    line: 3,
                    col: 4
                },
                type: 'ERROR',
                rule: '004',
                message: 'test report4'
            };

            reporter.report(report2);
            reporter.report(report4);
            reporter.report(report1);
            reporter.report(report3);

            var result = reporter.result();

            expect(result.length).toBe(4);

            expect(result[0].line).toBe(report1.pos.line);
            expect(result[0].col).toBe(report1.pos.col);
            expect(result[0].type).toBe(report1.type);
            expect(result[0].rule).toBe(report1.rule);
            expect(result[0].message).toBe(report1.message);

            expect(result[1].line).toBe(report2.pos.line);
            expect(result[1].col).toBe(report2.pos.col);
            expect(result[1].type).toBe(report2.type);
            expect(result[1].rule).toBe(report2.rule);
            expect(result[1].message).toBe(report2.message);

            expect(result[2].line).toBe(report3.pos.line);
            expect(result[2].col).toBe(report3.pos.col);
            expect(result[2].type).toBe(report3.type);
            expect(result[2].rule).toBe(report3.rule);
            expect(result[2].message).toBe(report3.message);

            expect(result[3].line).toBe(report4.pos.line);
            expect(result[3].col).toBe(report4.pos.col);
            expect(result[3].type).toBe(report4.type);
            expect(result[3].rule).toBe(report4.rule);
            expect(result[3].message).toBe(report4.message);
        });
    });
});

describe('report', function () {
    describe('with pos', function () {
        it('should record the right item', function () {
            var reporter = new Reporter();
            var report = {
                pos: {
                    line: 1,
                    col: 1
                },
                type: 'INFO',
                rule: '001',
                message: 'test report'
            };
            reporter.report(report);
            var result = reporter.result();

            expect(result.length).toBe(1);
            expect(result[0].line).toBe(report.pos.line);
            expect(result[0].col).toBe(report.pos.col);
            expect(result[0].type).toBe(report.type);
            expect(result[0].rule).toBe(report.rule);
            expect(result[0].message).toBe(report.message);
        });
    });

    describe('with element', function () {
        it('should record the right item', function () {
            var reporter = new Reporter();
            var report = {
                elem: {
                    startPos: {
                        line: 1,
                        col: 1
                    }
                },
                type: 'INFO',
                rule: '001',
                message: 'test report'
            };
            reporter.report(report);
            var result = reporter.result();

            expect(result.length).toBe(1);
            expect(result[0].line).toBe(report.elem.startPos.line);
            expect(result[0].col).toBe(report.elem.startPos.col);
            expect(result[0].type).toBe(report.type);
            expect(result[0].rule).toBe(report.rule);
            expect(result[0].message).toBe(report.message);
        });
    });

    describe('without pos nor element', function () {
        it('should record the right item (pos 0,0)', function () {
            var reporter = new Reporter();
            var report = {
                type: 'INFO',
                rule: '001',
                message: 'test report'
            };
            reporter.report(report);
            var result = reporter.result();

            expect(result.length).toBe(1);
            expect(result[0].line).toBe(0);
            expect(result[0].col).toBe(0);
            expect(result[0].type).toBe(report.type);
            expect(result[0].rule).toBe(report.rule);
            expect(result[0].message).toBe(report.message);
        });
    });
});

describe('info', function () {
    it('should record the right item (type "INFO")', function () {
        var reporter = new Reporter();
        var element = {
            startPos: {
                line: 1,
                col: 1
            }
        };
        var rule = '001';
        var message = 'test info';
        reporter.info(element, rule, message);
        var result = reporter.result();

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('INFO');
        expect(result[0].rule).toBe(rule);
        expect(result[0].line).toBe(element.startPos.line);
        expect(result[0].col).toBe(element.startPos.col);
        expect(result[0].message).toBe(message);
    });
});

describe('warn', function () {
    it('should record the right item (type "WARN")', function () {
        var reporter = new Reporter();
        var element = {
            startPos: {
                line: 1,
                col: 1
            }
        };
        var rule = '001';
        var message = 'test warn';
        reporter.warn(element, rule, message);
        var result = reporter.result();

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('WARN');
        expect(result[0].rule).toBe(rule);
        expect(result[0].line).toBe(element.startPos.line);
        expect(result[0].col).toBe(element.startPos.col);
        expect(result[0].message).toBe(message);
    });
});

describe('error', function () {
    it('should record the right item (type "ERROR")', function () {
        var reporter = new Reporter();
        var element = {
            startPos: {
                line: 1,
                col: 1
            }
        };
        var rule = '001';
        var message = 'test error';
        reporter.error(element, rule, message);
        var result = reporter.result();

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('ERROR');
        expect(result[0].rule).toBe(rule);
        expect(result[0].line).toBe(element.startPos.line);
        expect(result[0].col).toBe(element.startPos.col);
        expect(result[0].message).toBe(message);
    });
});

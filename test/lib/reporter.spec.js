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
                message: 'test report'
            };
            reporter.report(report);
            var result = reporter.result();

            expect(result.length).toBe(1);
            expect(result[0].pos.line).toBe(report.pos.line);
            expect(result[0].pos.col).toBe(report.pos.col);
            expect(result[0].type).toBe(report.type);
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
                message: 'test report1'
            };
            var report2 = {
                pos: {
                    line: 2,
                    col: 2
                },
                type: 'WARN',
                message: 'test report2'
            };
            var report3 = {
                pos: {
                    line: 3,
                    col: 3
                },
                type: 'ERROR',
                message: 'test report3'
            };
            var report4 = {
                pos: {
                    line: 3,
                    col: 4
                },
                type: 'ERROR',
                message: 'test report4'
            };

            reporter.report(report2);
            reporter.report(report4);
            reporter.report(report1);
            reporter.report(report3);

            var result = reporter.result();

            expect(result.length).toBe(4);

            expect(result[0].pos.line).toBe(report1.pos.line);
            expect(result[0].pos.col).toBe(report1.pos.col);
            expect(result[0].type).toBe(report1.type);
            expect(result[0].message).toBe(report1.message);

            expect(result[1].pos.line).toBe(report2.pos.line);
            expect(result[1].pos.col).toBe(report2.pos.col);
            expect(result[1].type).toBe(report2.type);
            expect(result[1].message).toBe(report2.message);

            expect(result[2].pos.line).toBe(report3.pos.line);
            expect(result[2].pos.col).toBe(report3.pos.col);
            expect(result[2].type).toBe(report3.type);
            expect(result[2].message).toBe(report3.message);

            expect(result[3].pos.line).toBe(report4.pos.line);
            expect(result[3].pos.col).toBe(report4.pos.col);
            expect(result[3].type).toBe(report4.type);
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
                message: 'test report'
            };
            reporter.report(report);
            var result = reporter.result();

            expect(result.length).toBe(1);
            expect(result[0].pos.line).toBe(report.pos.line);
            expect(result[0].pos.col).toBe(report.pos.col);
            expect(result[0].type).toBe(report.type);
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
                message: 'test report'
            };
            reporter.report(report);
            var result = reporter.result();

            expect(result.length).toBe(1);
            expect(result[0].pos.line).toBe(report.elem.startPos.line);
            expect(result[0].pos.col).toBe(report.elem.startPos.col);
            expect(result[0].type).toBe(report.type);
            expect(result[0].message).toBe(report.message);
        });
    });

    describe('without pos nor element', function () {
        it('should record the right item (pos 0,0)', function () {
            var reporter = new Reporter();
            var report = {
                type: 'INFO',
                message: 'test report'
            };
            reporter.report(report);
            var result = reporter.result();

            expect(result.length).toBe(1);
            expect(result[0].pos.line).toBe(0);
            expect(result[0].pos.col).toBe(0);
            expect(result[0].type).toBe(report.type);
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
        var message = 'test info';
        reporter.info(element, message);
        var result = reporter.result();

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('INFO');
        expect(result[0].pos.line).toBe(element.startPos.line);
        expect(result[0].pos.col).toBe(element.startPos.col);
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
        var message = 'test warn';
        reporter.warn(element, message);
        var result = reporter.result();

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('WARN');
        expect(result[0].pos.line).toBe(element.startPos.line);
        expect(result[0].pos.col).toBe(element.startPos.col);
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
        var message = 'test error';
        reporter.error(element, message);
        var result = reporter.result();

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('ERROR');
        expect(result[0].pos.line).toBe(element.startPos.line);
        expect(result[0].pos.col).toBe(element.startPos.col);
        expect(result[0].message).toBe(message);
    });
});

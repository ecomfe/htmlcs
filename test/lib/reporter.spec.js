var assert = require('assert');

var Reporter = require('../../lib/reporter');

describe('result', function () {
    describe('inititial status', function () {
        it('should return empty list', function () {
            var reporter = new Reporter();
            var result = reporter.result();

            assert.strictEqual(true, Array.isArray(result));
            assert.strictEqual(0, result.length);
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

            assert.strictEqual(1, result.length);
            assert.strictEqual(report.pos.line, result[0].pos.line);
            assert.strictEqual(report.pos.col, result[0].pos.col);
            assert.strictEqual(report.type, result[0].type);
            assert.strictEqual(report.message, result[0].message);
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

            assert.strictEqual(4, result.length);

            assert.strictEqual(report1.pos.line, result[0].pos.line);
            assert.strictEqual(report1.pos.col, result[0].pos.col);
            assert.strictEqual(report1.type, result[0].type);
            assert.strictEqual(report1.message, result[0].message);

            assert.strictEqual(report2.pos.line, result[1].pos.line);
            assert.strictEqual(report2.pos.col, result[1].pos.col);
            assert.strictEqual(report2.type, result[1].type);
            assert.strictEqual(report2.message, result[1].message);

            assert.strictEqual(report3.pos.line, result[2].pos.line);
            assert.strictEqual(report3.pos.col, result[2].pos.col);
            assert.strictEqual(report3.type, result[2].type);
            assert.strictEqual(report3.message, result[2].message);

            assert.strictEqual(report4.pos.line, result[3].pos.line);
            assert.strictEqual(report4.pos.col, result[3].pos.col);
            assert.strictEqual(report4.type, result[3].type);
            assert.strictEqual(report4.message, result[3].message);
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

            assert.strictEqual(1, result.length);
            assert.strictEqual(report.pos.line, result[0].pos.line);
            assert.strictEqual(report.pos.col, result[0].pos.col);
            assert.strictEqual(report.type, result[0].type);
            assert.strictEqual(report.message, result[0].message);
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

            assert.strictEqual(1, result.length);
            assert.strictEqual(report.elem.startPos.line, result[0].pos.line);
            assert.strictEqual(report.elem.startPos.col, result[0].pos.col);
            assert.strictEqual(report.type, result[0].type);
            assert.strictEqual(report.message, result[0].message);
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

            assert.strictEqual(1, result.length);
            assert.strictEqual(0, result[0].pos.line);
            assert.strictEqual(0, result[0].pos.col);
            assert.strictEqual(report.type, result[0].type);
            assert.strictEqual(report.message, result[0].message);
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

        assert.strictEqual(1, result.length);
        assert.strictEqual('INFO', result[0].type);
        assert.strictEqual(element.startPos.line, result[0].pos.line);
        assert.strictEqual(element.startPos.col, result[0].pos.col);
        assert.strictEqual(message, result[0].message);
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

        assert.strictEqual(1, result.length);
        assert.strictEqual('WARN', result[0].type);
        assert.strictEqual(element.startPos.line, result[0].pos.line);
        assert.strictEqual(element.startPos.col, result[0].pos.col);
        assert.strictEqual(message, result[0].message);
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

        assert.strictEqual(1, result.length);
        assert.strictEqual('ERROR', result[0].type);
        assert.strictEqual(element.startPos.line, result[0].pos.line);
        assert.strictEqual(element.startPos.col, result[0].pos.col);
        assert.strictEqual(message, result[0].message);
    });
});

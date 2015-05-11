/**
 * @file test for rules
 * @author nighca<nighca@live.cn>
 */

var rules = require('../../lib/rules');

describe('rules', function () {
    describe('init', function () {

        it('should init correctly', function () {
            rules.init();
        });

        it('should list rules', function () {
            var ruleList = rules.list();
            expect(Array.isArray(ruleList)).toBe(true);

            var parserRuleList = rules.list('parser');
            expect(Array.isArray(parserRuleList)).toBe(true);

            for (var i = parserRuleList.length - 1; i >= 0; i--) {
                expect(parserRuleList[i].target).toBe('parser');
            }

            var documentRuleList = rules.list('document');
            expect(Array.isArray(documentRuleList)).toBe(true);

            for (var j = documentRuleList.length - 1; j >= 0; j--) {
                expect(documentRuleList[j].target).toBe('document');
            }

            expect(parserRuleList.length + documentRuleList.length).toBe(ruleList.length);
        });

        it('should add rule correctly', function () {
            var ruleNum = rules.list().length;
            var parserRuleNum = rules.list('parser').length;
            var documentRuleNum = rules.list('document').length;

            rules.add({
                name: 'test',
                desc: 'rule for test',
                target: 'parser',
                lint: function () {}
            });
            expect(rules.list().length).toBe(ruleNum + 1);
            expect(rules.list('parser').length).toBe(parserRuleNum + 1);
            expect(rules.list('document').length).toBe(documentRuleNum);

            rules.add({
                name: 'test2',
                desc: 'another rule for test',
                target: 'document',
                lint: function () {}
            });
            expect(rules.list().length).toBe(ruleNum + 2);
            expect(rules.list('parser').length).toBe(parserRuleNum + 1);
            expect(rules.list('document').length).toBe(documentRuleNum + 1);
        });
    });
});

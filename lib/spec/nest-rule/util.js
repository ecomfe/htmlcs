/**
 * @file nest-rule-relative util methods
 * @author nighca<nighca@live.cn>
 */

var util = require('../../util');

var nodeInfo = function (element, categories) {
    categories = categories || [];
    return element.tagName.toLowerCase()
        + (
            categories.length
            ? ' ( ' + categories.join(' | ') + ' )'
            : ''
        );
};

var isPositive = function (given) {
    return given;
};

var getAncestors = function (element) {
    var ancestors = [];
    var parent;

    while (parent = element.parentElement) {
        ancestors.push(parent);
        element = parent;
    }

    return ancestors;
};

var isTag = util.curry(function (tag, given) {
    return given && tag.split(',').indexOf(given.tagName) >= 0;
});

var isNotTag = util.not(isTag);

var expectContext = function (expect, target, got) {
    return {
        expect: expect,
        got: got,
        target: target
    };
};

var expectContent = function (expect, target, got) {
    return {
        expect: expect,
        got: got,
        target: target
    };
};

var expectSequence = function (expect, target, sequence) {
    return expectContent(
        expect,
        target,
        '[ ' + sequence.map(function (child) {
            return child.tagName.toLowerCase();
        }).join(', ') + ' ]'
    );
};

var validateSequence = function (sequence, expects) {
    sequence = sequence.slice();

    var report = function (target) {
        return target || true;
    };

    for (var i = 0, l = expects.length, expect, check, num; i < l; i++) {
        expect = expects[i];

        check = typeof expect[0] === 'function'
            ? expect[0]
            : function (element) {
                return element && (expect[0].split(',').indexOf(element.tagName) >= 0);
            };

        num = expect[1];

        switch (num) {

            // zero or one
            case '?':
                if (check(sequence[0])) {
                    sequence.shift();
                }
                break;

            // zero or more
            case '*':
                while (check(sequence[0])) {
                    sequence.shift();
                }
                break;

            // one or more
            case '+':
                if (!check(sequence[0])) {
                    return report(sequence[0]);
                }

                do {
                    sequence.shift();
                } while (check(sequence[0]));
                break;

            // exact num
            default:
                while (num--) {
                    if (!check(sequence[0])) {
                        return report(sequence[0]);
                    }
                    sequence.shift();
                }
                break;
        }
    }

    return sequence[0];
};

var walkDescendants = function (element, handler) {
    return util.walk(element, function (target) {
        if (target !== element) {
            handler(target);
        }
    });
};

module.exports = {
    nodeInfo: nodeInfo,
    isPositive: isPositive,
    getAncestors: getAncestors,
    isTag: isTag,
    isNotTag: isNotTag,
    expectContext: expectContext,
    expectContent: expectContent,
    expectSequence: expectSequence,
    validateSequence: validateSequence,
    walkDescendants: walkDescendants
};

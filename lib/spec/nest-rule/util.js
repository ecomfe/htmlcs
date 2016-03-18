/**
 * @file nest-rule-relative util methods
 * @author nighca<nighca@live.cn>
 */

var util = require('../../util');

module.exports = function (rules) {

    var getRule = function (element) {
        return rules[element.tagName.toLowerCase()];
    };

    var getCategories = function (element) {
        var rule = getRule(element);
        return rule
            ? rule.getCategories(element)
            : [];
    };

    var nodeInfo = function (element) {
        return element.tagName.toLowerCase();
    };

    var nodeCategoriesInfo = function (element) {
        var categories = getCategories(element);
        return nodeInfo(element)
            + ' ( '
            + (
                categories.length
                ? categories.join(' | ')
                : 'none'
            )
            + ' )';
    };

    var sequenceInfo = function (sequence) {
        return '[ '
            + sequence.map(function (child) {
                return child.tagName.toLowerCase();
            }).join(', ')
            + ' ]';
    };

    var isCategory = util.curry(function (expect, element) {
        return getRule(element)
            ? getCategories(element).indexOf(expect) >= 0
            : true;
    });

    var isNotCategory = util.not(isCategory);

    var isTag = util.curry(function (tag, given) {
        return given && given.tagName && tag.split('|').indexOf(given.tagName.toLowerCase()) >= 0;
    });

    var isNotTag = util.not(isTag);

    var getAncestors = function (element) {
        var ancestors = [];
        var parent;

        while (parent = element.parentElement) {
            ancestors.push(parent);
            element = parent;
        }

        return ancestors;
    };

    var walkDescendants = function (element, handler) {
        return util.walk(element, function (target) {
            if (target !== element) {
                handler(target);
            }
        });
    };

    var validateCategory = function (expect, elements) {
        return elements.reduce(function (result, child) {
            if (isNotCategory(expect, child)) {
                result.push({
                    expect: expect,
                    got: nodeCategoriesInfo(child),
                    target: child
                });
            }
            return result;
        }, []);
    };

    var validateChildrenSequence = function (expect, element) {
        var children = element.children.slice();

        if (expect.exclude) {
            children = children.filter(expect.exclude);
        }

        var createElementValidator = function (expects) {
            expects = expects.split('|');

            return function (element) {
                return element && expects.reduce(function (valid, expect) {
                    var check = isTag;
                    if (/^category\:/.test(expect)) {
                        expect = expect.slice(9);
                        check = isCategory;
                    }
                    return valid || check(expect, element);
                }, false);
            };
        };

        var unexpect = function (unexpected) {
            return [
                {
                    expect: expect.desc,
                    got: sequenceInfo(element.children),
                    target: element
                }
            ];
        };

        for (var i = 0, l = expect.sequence.length, expectInfo, validate, num; i < l; i++) {
            expectInfo = expect.sequence[i];

            validate = typeof expectInfo[0] === 'function'
                ? expectInfo[0]
                : createElementValidator(expectInfo[0]);

            num = expectInfo[1];

            switch (num) {

                // zero or one
                case '?':
                    if (validate(children[0])) {
                        children.shift();
                    }
                    break;

                // zero or more
                case '*':
                    while (validate(children[0])) {
                        children.shift();
                    }
                    break;

                // one or more
                case '+':
                    if (!validate(children[0])) {
                        return unexpect(children[0]);
                    }

                    do {
                        children.shift();
                    } while (validate(children[0]));
                    break;

                // exact num
                default:
                    while (num--) {
                        if (!validate(children[0])) {
                            return unexpect(children[0]);
                        }
                        children.shift();
                    }
                    break;
            }
        }

        return children.length ? unexpect(children[0]) : [];
    };

    return {
        getRule: getRule,
        getCategories: getCategories,
        nodeInfo: nodeInfo,
        nodeCategoriesInfo: nodeCategoriesInfo,
        sequenceInfo: sequenceInfo,
        isCategory: isCategory,
        isNotCategory: isNotCategory,
        isTag: isTag,
        isNotTag: isNotTag,
        getAncestors: getAncestors,
        walkDescendants: walkDescendants,
        validateCategory: validateCategory,
        validateChildrenSequence: validateChildrenSequence
    };
};

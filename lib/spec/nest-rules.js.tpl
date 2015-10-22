/**
 * @file nest rules
 * @author nighca<nighca@live.cn>
 * @spec http://www.w3.org/TR/html5/semantics.html#semantics
 */

/* this file is generated automatically, disable eslint here */
/* eslint-disable */

var rules = {};

var getRule = function (element) {
    return rules[element.tagName.toLowerCase()];
};

var nodeInfo = function (element, categories) {
    categories = categories || getRule(element).getCategories();
    return element.tagName.toLowerCase() + ' ( ' + categories.join(' | ') + ' )';
};

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
{{#forin root.rules rule ruleName}}
rules.{{ruleName}} = {
    getCategories: function (element) {
        return [{{rule.categories}}];
    },
    validContext: function (element) {
{{#each rule.contexts context}}        // TODO: context: {{context.type}} - {{context.content}}
{{/each}}        return null;
    },
    validContent: function (element) {
        var children = element.children;
{{#each rule.content content}}{{set log = false}}{{#if content.type === "raw" && content.content === "empty"}}        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }
{{set log = true}}{{/if}}{{#if content.type === "raw" && content.content === "text"}}
        // text
        if (children.length) {
            return expectContent('text');
        }
{{set log = true}}{{/if}}{{#if content.type === "raw" && content.content === "transparent"}}
        // transparent
        var rule = element.parentNode && getRule(element.parentNode);
        if (!rule) {
            return null;
        }
        return rule.validContent(element);
{{set log = true}}{{/if}}{{#if content.type === "is"}}
        // is {{content.content}}
        return children.map(function (child) {
            var got = getRule(child).getCategories();
            return got.indexOf('{{content.content}}') < 0
                ? expectContent('{{content.content}}', child, nodeInfo(child, got))
                : null;
        }).filter(function (result) {
            return result;
        });
{{set log = true}}{{/if}}{{#if !log}}        // TODO: content: {{content.type}} - {{content.content}}{{/if}}
{{/each}}        return null;
    }
};
{{/forin}}
module.exports = {
    get: getRule
};

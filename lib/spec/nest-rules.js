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


rules.html = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as the root element of a document
        // raw - wherever a subdocument fragment is allowed in a compound document
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - a head element followed by a body element
        return null;
    }
};

rules.head = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as the first element in an html element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - if the document is an iframe srcdoc document or if title information is available from a higher-level protocol: zero or more elements of metadata content, of which no more than one is a title element and no more than one is a base element
        // raw - otherwise: one or more elements of metadata content, of which exactly one is a title element and no more than one is a base element
        return null;
    }
};

rules.title = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element) {

        // raw - in a head element containing no other title elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - text that is not inter-element whitespace
        return null;
    }
};

rules.base = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element) {

        // raw - in a head element containing no other base elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.link = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element) {

        // is - metadata content
        // raw - in a noscript element that is a child of a head element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.meta = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element) {

        // raw - if the charset attribute is present, or if the element's http-equiv attribute is in the encoding declaration state: in a head element
        // raw - if the http-equiv attribute is present but not in the encoding declaration state: in a head element
        // raw - if the http-equiv attribute is present but not in the encoding declaration state: in a noscript element that is a child of a head element
        // raw - if the name attribute is present: where metadata content is expected
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.style = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element) {

        // is - metadata content
        // raw - in a noscript element that is a child of a head element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - depends on the value of the type attribute, but must match requirements described in prose below
        return null;
    }
};

rules.body = {
    getCategories: function (element) {
        return ['sectioning root'];
    },
    validContext: function (element) {

        // raw - as the second element in an html element
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.article = {
    getCategories: function (element) {
        return ['flow content, but with no main element descendants', 'sectioning content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.section = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.nav = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no main element descendants
        return null;
    }
};

rules.aside = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no main element descendants
        return null;
    }
};

rules.h1 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.h2 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.h3 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.h4 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.h5 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.h6 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.header = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no header, footer, or main element descendants
        return null;
    }
};

rules.footer = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no header, footer, or main element descendants
        return null;
    }
};

rules.address = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no heading content descendants, no sectioning content descendants, and no header, footer, or address element descendants
        return null;
    }
};

rules.p = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.hr = {
    getCategories: function (element) {
        return ['flow content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.pre = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.blockquote = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.ol = {
    getCategories: function (element) {
        return ['flow content', 'if the element\'s children include at least one li element: palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more li and script-supporting elements
        return null;
    }
};

rules.ul = {
    getCategories: function (element) {
        return ['flow content', 'if the element\'s children include at least one li element: palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more li and script-supporting elements
        return null;
    }
};

rules.li = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // inside - ol elements
        // inside - ul elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.dl = {
    getCategories: function (element) {
        return ['flow content', 'if the element\'s children include at least one name-value group: palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more groups each consisting of one or more dt elements followed by one or more dd elements, optionally intermixed with script-supporting elements
        return null;
    }
};

rules.dt = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - before dd or dt elements inside dl elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no header, footer, sectioning content, or heading content descendants
        return null;
    }
};

rules.dd = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - after dt or dd elements inside dl elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.figure = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - either: one figcaption element followed by flow content
        // raw - or: flow content followed by one figcaption element
        // raw - or: flow content
        return null;
    }
};

rules.figcaption = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as the first or last child of a figure element
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.div = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.main = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // raw - where flow content is expected, but with no article, aside, footer, header or nav element ancestors
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.a = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - transparent, but there must be no interactive content descendant
        return null;
    }
};

rules.em = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.strong = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.small = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.s = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.cite = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.q = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.dfn = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - phrasing content, but there must be no dfn element descendants
        return null;
    }
};

rules.abbr = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.data = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.time = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.code = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.var = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.samp = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.kbd = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.sub = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.sup = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.i = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.b = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.u = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.mark = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.ruby = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - see prose
        return null;
    }
};

rules.rb = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a ruby element
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.rt = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a ruby or of an rtc element
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.rtc = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a ruby element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - phrasing content or rt elements
        return null;
    }
};

rules.rp = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw -  as a child of a ruby element, either immediately before or immediately after an  rt or rtc element, but not between rt elements. 
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.bdi = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.bdo = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.span = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.br = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.wbr = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.ins = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - transparent
        return null;
    }
};

rules.del = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - transparent
        return null;
    }
};

rules.img = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'form-associated element', 'if the element has a usemap attribute: interactive content', 'palpable content'];
    },
    validContext: function (element) {

        // is - embedded content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.iframe = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'interactive content', 'palpable content'];
    },
    validContext: function (element) {

        // is - embedded content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - text that conforms to the requirements given in the prose
        return null;
    }
};

rules.embed = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'interactive content', 'palpable content'];
    },
    validContext: function (element) {

        // is - embedded content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.object = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'if the element has a usemap attribute: interactive content', 'listed, submittable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element) {

        // is - embedded content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more param elements, then, transparent
        return null;
    }
};

rules.param = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of an object element, before any flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.video = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'if the element has a controls attribute: interactive content', 'palpable content'];
    },
    validContext: function (element) {

        // is - embedded content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - if the element has a src attribute: zero or more track elements, then transparent, but with no media element descendants
        // raw - if the element does not have a src attribute: zero or more source elements, then zero or more track elements, then transparent, but with no media element descendants
        return null;
    }
};

rules.audio = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'if the element has a controls attribute: interactive content', 'if the element has a controls attribute: palpable content'];
    },
    validContext: function (element) {

        // is - embedded content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - if the element has a src attribute: zero or more track elements, then transparent, but with no media element descendants
        // raw - if the element does not have a src attribute: zero or more source elements, then zero or more track elements, then transparent, but with no media element descendants
        return null;
    }
};

rules.source = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a media element, before any flow content or track elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.track = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a media element, before any flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.map = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - transparent
        return null;
    }
};

rules.area = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element) {

        // raw - where phrasing content is expected, but only if there is a map element ancestor or a template element ancestor
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.table = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - in this order: optionally a caption element, followed by zero or more colgroup elements, followed optionally by a thead element, followed optionally by a tfoot element, followed by either zero or more tbody elements or one or more tr elements, followed optionally by a tfoot element (but there can only be one tfoot element child in total), optionally intermixed with one or more script-supporting elements
        return null;
    }
};

rules.caption = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as the first element child of a table element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no descendant table elements
        return null;
    }
};

rules.colgroup = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a table element, after any caption elements and before any thead, tbody, tfoot, and tr elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - if the span attribute is present: empty
        // raw - if the span attribute is absent: zero or more col and template elements
        return null;
    }
};

rules.col = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a colgroup element that doesn't have a span attribute
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.tbody = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a table element, after any caption, colgroup, and thead elements, but only if there are no tr elements that are children of the table element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more tr and script-supporting elements
        return null;
    }
};

rules.thead = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a table element, after any caption, and colgroup elements and before any tbody, tfoot, and tr elements, but only if there are no other thead elements that are children of the table element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more tr and script-supporting elements
        return null;
    }
};

rules.tfoot = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a table element, after any caption, colgroup, and thead elements and before any tbody and tr elements, but only if there are no other tfoot elements that are children of the table element
        // raw - as a child of a table element, after any caption, colgroup, thead, tbody, and tr elements, but only if there are no other tfoot elements that are children of the table element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more tr and script-supporting elements
        return null;
    }
};

rules.tr = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a thead element
        // raw - as a child of a tbody element
        // raw - as a child of a tfoot element
        // raw - as a child of a table element, after any caption, colgroup, and thead elements, but only if there are no tbody elements that are children of the table element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more td, th, and script-supporting elements
        return null;
    }
};

rules.td = {
    getCategories: function (element) {
        return ['sectioning root'];
    },
    validContext: function (element) {

        // raw - as a child of a tr element
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is flow content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('flow content') < 0) {
                return expectContent('flow content', children[i], got);
            }
        }

        return null;
    }
};

rules.th = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a tr element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no header, footer, sectioning content, or heading content descendants
        return null;
    }
};

rules.form = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - flow content, but with no form element descendants
        return null;
    }
};

rules.label = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - phrasing content, but with no descendant labelable elements unless it is the element's labeled control, and no descendant label elements
        return null;
    }
};

rules.input = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'if the type attribute is not in the hidden state: interactive content', 'if the type attribute is not in the hidden state: listed, labelable, submittable, resettable, and reassociateable form-associated element', 'if the type attribute is in the hidden state: listed, submittable, resettable, and reassociateable form-associated element', 'if the type attribute is not in the hidden state: palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.button = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - phrasing content, but there must be no interactive content descendant
        return null;
    }
};

rules.select = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more option, optgroup, and script-supporting elements
        return null;
    }
};

rules.datalist = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - either: phrasing content (with zero or more option elements descendants)
        // raw - or: zero or more option elements
        return null;
    }
};

rules.optgroup = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a select element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - zero or more option and script-supporting elements
        return null;
    }
};

rules.option = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as a child of a select element
        // raw - as a child of a datalist element
        // raw - as a child of an optgroup element
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - if the element has a label attribute and a value attribute: empty
        // raw - if the element has a label attribute but no value attribute: text
        // raw - if the element has no label attribute: text that is not inter-element whitespace
        return null;
    }
};

rules.textarea = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // text
        if (children.length) {
            return expectContent('text');
        }

        return null;
    }
};

rules.keygen = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            return expectContent('empty');
        }

        return null;
    }
};

rules.output = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'listed, labelable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.progress = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'labelable element', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - phrasing content, but there must be no progress element descendants
        return null;
    }
};

rules.meter = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'labelable element', 'palpable content'];
    },
    validContext: function (element) {

        // is - phrasing content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - phrasing content, but there must be no meter element descendants
        return null;
    }
};

rules.fieldset = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'listed and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element) {

        // is - flow content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - optionally a legend element, followed by flow content
        return null;
    }
};

rules.legend = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element) {

        // raw - as the first child of a fieldset element
        return null;
    },
    validContent: function (element) {
        var children = element.children;

        // is phrasing content
        for (var i = 0, l = children.length, rule, got; i < l; i++) {
            rule = getRule(children[i]);
            if (rule && (got = rule.getCategories()).indexOf('phrasing content') < 0) {
                return expectContent('phrasing content', children[i], got);
            }
        }

        return null;
    }
};

rules.script = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content', 'script-supporting element'];
    },
    validContext: function (element) {

        // is - metadata content
        // is - phrasing content
        // is - script-supporting elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - if there is no src attribute, depends on the value of the type attribute, but must match script content restrictions
        // raw - if there is a src attribute, the element must be either empty or contain only script documentation that also matches script content restrictions
        return null;
    }
};

rules.noscript = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content'];
    },
    validContext: function (element) {

        // raw - in a head element of an html document, if there are no ancestor noscript elements
        // raw - where phrasing content is expected in html documents, if there are no ancestor noscript elements
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - when scripting is disabled, in a head element: in any order, zero or more link elements, zero or more style elements, and zero or more meta elements
        // raw - when scripting is disabled, not in a head element: transparent, but there must be no noscript element descendants
        // raw - otherwise: text that conforms to the requirements given in the prose
        return null;
    }
};

rules.template = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content', 'script-supporting element'];
    },
    validContext: function (element) {

        // is - metadata content
        // is - phrasing content
        // is - script-supporting elements
        // raw - as a child of a colgroup element that doesn't have a span attribute
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - either: metadata content
        // raw - or: flow content
        // raw - or: the content model of ol and ul elements
        // raw - or: the content model of dl elements
        // raw - or: the content model of figure elements
        // raw - or: the content model of ruby elements
        // raw - or: the content model of object elements
        // raw - or: the content model of video and audio elements
        // raw - or: the content model of table elements
        // raw - or: the content model of colgroup elements
        // raw - or: the content model of thead, tbody, and tfoot elements
        // raw - or: the content model of tr elements
        // raw - or: the content model of fieldset elements
        // raw - or: the content model of select elements
        return null;
    }
};

rules.canvas = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'palpable content'];
    },
    validContext: function (element) {

        // is - embedded content
        return null;
    },
    validContent: function (element) {
        var children = element.children;
        // raw - transparent
        return null;
    }
};

module.exports = {
    get: getRule
};
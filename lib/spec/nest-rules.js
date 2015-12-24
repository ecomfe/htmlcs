/**
 * @file nest rules
 * @author nighca<nighca@live.cn>
 * @spec http://www.w3.org/TR/html5/semantics.html#semantics
 */

/* this file is generated automatically, disable eslint here */
/* eslint-disable */

var define = require('./define');

var rules = {};

var getRule = function (element) {
    return rules[element.tagName.toLowerCase()];
};

var nodeInfo = function (element, categories) {
    categories = categories || getRule(element).getCategories();
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
    validContext: function (element, result) {
        // context: raw - as the root element of a document
        // context: raw - wherever a subdocument fragment is allowed in a compound document
        if (element.ownerDocument !== element.parentNode) {
            result.push(expectContext(
                'the root element of a document',
                element
            ));
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - a head element followed by a body element
        if (!(
            children.length === 2
            && children[0]
            && children[0].tagName === 'HEAD'
            && children[1]
            && children[1].tagName === 'BODY'
        )) {
            result.push(expectContent(
                'a head element followed by a body element',
                element,
                children.map(function (child) {
                    return child.tagName.toLowerCase();
                }).join(', ')
            ));
        }

        return result;
    }
};

rules.head = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as the first element in an html element
        if (
            element.parentElement.tagName !== 'HTML'
            || element.parentElement.firstElementChild !== element
        ) {
            result.push(expectContext(
                'the first element in an html element',
                element
            ));
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - if the document is an iframe srcdoc document or if title information is available from a higher-level protocol: zero or more elements of metadata content, of which no more than one is a title element and no more than one is a base element
        // content: raw - otherwise: one or more elements of metadata content, of which exactly one is a title element and no more than one is a base element
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('metadata content') < 0) {
                result.push(expectContent('metadata content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.title = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element, result) {
        // context: raw - in a head element containing no other title elements
        var parent = element.parentElement;
        if (
            parent.tagName !== 'HEAD'
            || parent.getElementsByTagName('TITLE').length > 1
        ) {
            result.push(expectContext('in a head element containing no other title elements'), element);
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - text that is not inter-element whitespace
        if (!(
            element.childNodes.length === 1
            && element.childNodes[0].nodeType === 3
            && !define.is('inter-element whitespace', element.childNodes[0])
        )) {
            result.push(expectContent(
                'text that is not inter-element whitespace',
                element
            ));
        }

        return result;
    }
};

rules.base = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element, result) {
        // context: raw - in a head element containing no other base elements
        var parent = element.parentElement;
        if (
            parent.tagName !== 'HEAD'
            || parent.getElementsByTagName('BASE').length > 1
        ) {
            result.push(expectContext('in a head element containing no other base elements'), element);
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.link = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - metadata content
        // TODO: context: raw - in a noscript element that is a child of a head element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.meta = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element, result) {
        // context: raw - if the charset attribute is present, or if the element's http-equiv attribute is in the encoding declaration state: in a head element
        if (
            element.hasAttribute('charset')
            || element.getAttribute('http-equiv') === 'content-type'
        ) {
            if (element.parentElement.tagName !== 'HEAD') {
                result.push(expectContext('in a head element', element, element.parentElement.tagName.toLowerCase()));
            }
        }

        // context: raw - if the http-equiv attribute is present but not in the encoding declaration state: in a head element
        // context: raw - if the http-equiv attribute is present but not in the encoding declaration state: in a noscript element that is a child of a head element
        if (
            element.hasAttribute('http-equiv')
            || element.getAttribute('http-equiv') !== 'content-type'
        ) {
            if (
                element.parentElement.tagName !== 'HEAD'
                && !(
                    element.parentElement.tagName === 'NOSCRIPT'
                    && element.parentElement.parentElement.tagName === 'HEAD'
                )
            ) {
                result.push(expectContext('in a head element or in a noscript element that is a child of a head element', element));
            }
        }

        // TODO: context: raw - if the name attribute is present: where metadata content is expected

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.style = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - metadata content
        // TODO: context: raw - in a noscript element that is a child of a head element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - depends on the value of the type attribute, but must match requirements described in prose below
        return result;
    }
};

rules.body = {
    getCategories: function (element) {
        return ['sectioning root'];
    },
    validContext: function (element, result) {
        // context: raw - as the second element in an html element
        if (
            element.parentElement.tagName !== 'HTML'
            || element.parentElement.children[1] !== element
        ) {
            result.push(expectContext(
                'the second element in an html element',
                element
            ));
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.article = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.section = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.nav = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no main element descendants

        // flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        // but with no main element descendants
        // -> context of [ main ]

        return result;
    }
};

rules.aside = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no main element descendants

        // flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        // but with no main element descendants
        // -> context of [ main ]

        return result;
    }
};

rules.h1 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.h2 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.h3 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.h4 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.h5 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.h6 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.header = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // with no header or footer element ancestors
        // see content requirement of [ header / footer ]
        var unAcceptable = ['HEADER', 'FOOTER'];
        getAncestors(element).forEach(function (ancestor) {
            if (unAcceptable.indexOf(ancestor.tagName) >= 0) {
                result.push(expectContext(
                    'with no footer or header element ancestors',
                    element,
                    ancestor.tagName.toLowerCase()
                ));
            }
        });

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no header, footer, or main element descendants

        // flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        // but with no header, footer, or main element descendants
        // -> context of [ header, footer, or main ]

        return result;
    }
};

rules.footer = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // with no header or footer element ancestors
        // see content requirement of [ header / footer ]
        var unAcceptable = ['HEADER', 'FOOTER'];
        getAncestors(element).forEach(function (ancestor) {
            if (unAcceptable.indexOf(ancestor.tagName) >= 0) {
                result.push(expectContext(
                    'with no footer or header element ancestors',
                    element,
                    ancestor.tagName.toLowerCase()
                ));
            }
        });

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no header, footer, or main element descendants

        // flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        // but with no header, footer, or main element descendants
        // -> context of [ header, footer, or main ]

        return result;
    }
};

rules.address = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // TODO: content: raw - flow content, but with no heading content descendants, no sectioning content descendants, and no header, footer, or address element descendants

        // flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        // but with no heading content descendants, no sectioning content descendants, and no header, footer, or address element descendants
        util.walk(element, function (descendant) {
            if (descendant === element) {
                return;
            }

            // no heading content descendants, no sectioning content descendants
            var got = getRule(descendant).getCategories();
            if (
                got.indexOf('heading content') >= 0
                || got.indexOf('sectioning content') >= 0
            ) {
                result.push(expectContent(
                    'with no heading content descendants, no sectioning content descendants',
                    descendant,
                    nodeInfo(descendant, got)
                ));
            }

            // no header, footer, or address element descendants
            var tagName = descendant.tagName;
            if (['HEADER', 'FOOTER', 'ADDRESS'].indexOf(tagName) >= 0) {
                result.push(expectContent(
                    'with no header, footer, or address element descendants',
                    descendant,
                    nodeInfo(descendant, [])
                ));
            }
        });

        return result;
    }
};

rules.p = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.hr = {
    getCategories: function (element) {
        return ['flow content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.pre = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.blockquote = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.ol = {
    getCategories: function (element) {
        return ['flow content', 'if the element\'s children include at least one li element: palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more li and script-supporting elements
        return result;
    }
};

rules.ul = {
    getCategories: function (element) {
        return ['flow content', 'if the element\'s children include at least one li element: palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more li and script-supporting elements
        return result;
    }
};

rules.li = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: inside - ol elements
        // TODO: context: inside - ul elements
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.dl = {
    getCategories: function (element) {
        return ['flow content', 'if the element\'s children include at least one name-value group: palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more groups each consisting of one or more dt elements followed by one or more dd elements, optionally intermixed with script-supporting elements
        return result;
    }
};

rules.dt = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - before dd or dt elements inside dl elements
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - flow content, but with no header, footer, sectioning content, or heading content descendants
        return result;
    }
};

rules.dd = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - after dt or dd elements inside dl elements
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.figure = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - either: one figcaption element followed by flow content
        // TODO: content: raw - or: flow content followed by one figcaption element
        // TODO: content: raw - or: flow content
        return result;
    }
};

rules.figcaption = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as the first or last child of a figure element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.div = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.main = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // context: raw - where flow content is expected, but with no article, aside, footer, header or nav element ancestors

        // flow content
        // -> content of [ article, aside, footer, header or nav ]

        // but with no article, aside, footer, header or nav element ancestors
        var unAcceptable = ['ARTICLE', 'ASIDE', 'FOOTER', 'HEADER', 'NAV'];
        getAncestors(element).forEach(function (ancestor) {
            if (unAcceptable.indexOf(ancestor.tagName) >= 0) {
                result.push(expectContext(
                    'with no article, aside, footer, header or nav element ancestors',
                    element,
                    ancestor.tagName.toLowerCase()
                ));
            }
        });

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.a = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - transparent, but there must be no interactive content descendant
        return result;
    }
};

rules.em = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.strong = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.small = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.s = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.cite = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.q = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.dfn = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - phrasing content, but there must be no dfn element descendants
        return result;
    }
};

rules.abbr = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.data = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.time = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.code = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.var = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.samp = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.kbd = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.sub = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.sup = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.i = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.b = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.u = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.mark = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.ruby = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - see prose
        return result;
    }
};

rules.rb = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a ruby element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.rt = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a ruby or of an rtc element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.rtc = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a ruby element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - phrasing content or rt elements
        return result;
    }
};

rules.rp = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw -  as a child of a ruby element, either immediately before or immediately after an  rt or rtc element, but not between rt elements. 
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.bdi = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.bdo = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.span = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.br = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.wbr = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.ins = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // transparent
        var rule = element.parentNode && getRule(element.parentNode);
        if (rule) {
            rule.validContent(element, result);
        }

        return result;
    }
};

rules.del = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // transparent
        var rule = element.parentNode && getRule(element.parentNode);
        if (rule) {
            rule.validContent(element, result);
        }

        return result;
    }
};

rules.img = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'form-associated element', 'if the element has a usemap attribute: interactive content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.iframe = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'interactive content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - text that conforms to the requirements given in the prose
        return result;
    }
};

rules.embed = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'interactive content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.object = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'if the element has a usemap attribute: interactive content', 'listed, submittable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more param elements, then, transparent
        return result;
    }
};

rules.param = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of an object element, before any flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.video = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'if the element has a controls attribute: interactive content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - if the element has a src attribute: zero or more track elements, then transparent, but with no media element descendants
        // TODO: content: raw - if the element does not have a src attribute: zero or more source elements, then zero or more track elements, then transparent, but with no media element descendants
        return result;
    }
};

rules.audio = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'if the element has a controls attribute: interactive content', 'if the element has a controls attribute: palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - if the element has a src attribute: zero or more track elements, then transparent, but with no media element descendants
        // TODO: content: raw - if the element does not have a src attribute: zero or more source elements, then zero or more track elements, then transparent, but with no media element descendants
        return result;
    }
};

rules.source = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a media element, before any flow content or track elements
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.track = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a media element, before any flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.map = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // transparent
        var rule = element.parentNode && getRule(element.parentNode);
        if (rule) {
            rule.validContent(element, result);
        }

        return result;
    }
};

rules.area = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // TODO: context: raw - where phrasing content is expected, but only if there is a map element ancestor or a template element ancestor
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.table = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - in this order: optionally a caption element, followed by zero or more colgroup elements, followed optionally by a thead element, followed optionally by a tfoot element, followed by either zero or more tbody elements or one or more tr elements, followed optionally by a tfoot element (but there can only be one tfoot element child in total), optionally intermixed with one or more script-supporting elements
        return result;
    }
};

rules.caption = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as the first element child of a table element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - flow content, but with no descendant table elements
        return result;
    }
};

rules.colgroup = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a table element, after any caption elements and before any thead, tbody, tfoot, and tr elements
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - if the span attribute is present: empty
        // TODO: content: raw - if the span attribute is absent: zero or more col and template elements
        return result;
    }
};

rules.col = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a colgroup element that doesn't have a span attribute
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.tbody = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a table element, after any caption, colgroup, and thead elements, but only if there are no tr elements that are children of the table element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more tr and script-supporting elements
        return result;
    }
};

rules.thead = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a table element, after any caption, and colgroup elements and before any tbody, tfoot, and tr elements, but only if there are no other thead elements that are children of the table element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more tr and script-supporting elements
        return result;
    }
};

rules.tfoot = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a table element, after any caption, colgroup, and thead elements and before any tbody and tr elements, but only if there are no other tfoot elements that are children of the table element
        // TODO: context: raw - as a child of a table element, after any caption, colgroup, thead, tbody, and tr elements, but only if there are no other tfoot elements that are children of the table element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more tr and script-supporting elements
        return result;
    }
};

rules.tr = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a thead element
        // TODO: context: raw - as a child of a tbody element
        // TODO: context: raw - as a child of a tfoot element
        // TODO: context: raw - as a child of a table element, after any caption, colgroup, and thead elements, but only if there are no tbody elements that are children of the table element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more td, th, and script-supporting elements
        return result;
    }
};

rules.td = {
    getCategories: function (element) {
        return ['sectioning root'];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a tr element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('flow content') < 0) {
                result.push(expectContent('flow content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.th = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a tr element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - flow content, but with no header, footer, sectioning content, or heading content descendants
        return result;
    }
};

rules.form = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - flow content, but with no form element descendants
        return result;
    }
};

rules.label = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - phrasing content, but with no descendant labelable elements unless it is the element's labeled control, and no descendant label elements
        return result;
    }
};

rules.input = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'if the type attribute is not in the hidden state: interactive content', 'if the type attribute is not in the hidden state: listed, labelable, submittable, resettable, and reassociateable form-associated element', 'if the type attribute is in the hidden state: listed, submittable, resettable, and reassociateable form-associated element', 'if the type attribute is not in the hidden state: palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.button = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - phrasing content, but there must be no interactive content descendant
        return result;
    }
};

rules.select = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more option, optgroup, and script-supporting elements
        return result;
    }
};

rules.datalist = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - either: phrasing content (with zero or more option elements descendants)
        // TODO: content: raw - or: zero or more option elements
        return result;
    }
};

rules.optgroup = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a select element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - zero or more option and script-supporting elements
        return result;
    }
};

rules.option = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as a child of a select element
        // TODO: context: raw - as a child of a datalist element
        // TODO: context: raw - as a child of an optgroup element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - if the element has a label attribute and a value attribute: empty
        // TODO: content: raw - if the element has a label attribute but no value attribute: text
        // TODO: content: raw - if the element has no label attribute: text that is not inter-element whitespace
        return result;
    }
};

rules.textarea = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // text
        if (children.length) {
            result.push(expectContent('text'));
        }

        return result;
    }
};

rules.keygen = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push(expectContent('empty'));
        }

        return result;
    }
};

rules.output = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'listed, labelable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.progress = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'labelable element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - phrasing content, but there must be no progress element descendants
        return result;
    }
};

rules.meter = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'labelable element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - phrasing content, but there must be no meter element descendants
        return result;
    }
};

rules.fieldset = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'listed and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - optionally a legend element, followed by flow content
        return result;
    }
};

rules.legend = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // TODO: context: raw - as the first child of a fieldset element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        children.forEach(function (child) {
            var got = getRule(child).getCategories();
            if (got.indexOf('phrasing content') < 0) {
                result.push(expectContent('phrasing content', child, nodeInfo(child, got)));
            }
        });

        return result;
    }
};

rules.script = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content', 'script-supporting element'];
    },
    validContext: function (element, result) {
        // TODO: context: is - metadata content
        // TODO: context: is - phrasing content
        // TODO: context: is - script-supporting elements
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - if there is no src attribute, depends on the value of the type attribute, but must match script content restrictions
        // TODO: content: raw - if there is a src attribute, the element must be either empty or contain only script documentation that also matches script content restrictions
        return result;
    }
};

rules.noscript = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // TODO: context: raw - in a head element of an html document, if there are no ancestor noscript elements
        // TODO: context: raw - where phrasing content is expected in html documents, if there are no ancestor noscript elements
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - when scripting is disabled, in a head element: in any order, zero or more link elements, zero or more style elements, and zero or more meta elements
        // TODO: content: raw - when scripting is disabled, not in a head element: transparent, but there must be no noscript element descendants
        // TODO: content: raw - otherwise: text that conforms to the requirements given in the prose
        return result;
    }
};

rules.template = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content', 'script-supporting element'];
    },
    validContext: function (element, result) {
        // TODO: context: is - metadata content
        // TODO: context: is - phrasing content
        // TODO: context: is - script-supporting elements
        // TODO: context: raw - as a child of a colgroup element that doesn't have a span attribute
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // TODO: content: raw - either: metadata content
        // TODO: content: raw - or: flow content
        // TODO: content: raw - or: the content model of ol and ul elements
        // TODO: content: raw - or: the content model of dl elements
        // TODO: content: raw - or: the content model of figure elements
        // TODO: content: raw - or: the content model of ruby elements
        // TODO: content: raw - or: the content model of object elements
        // TODO: content: raw - or: the content model of video and audio elements
        // TODO: content: raw - or: the content model of table elements
        // TODO: content: raw - or: the content model of colgroup elements
        // TODO: content: raw - or: the content model of thead, tbody, and tfoot elements
        // TODO: content: raw - or: the content model of tr elements
        // TODO: content: raw - or: the content model of fieldset elements
        // TODO: content: raw - or: the content model of select elements
        return result;
    }
};

rules.canvas = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'palpable content'];
    },
    validContext: function (element, result) {
        // TODO: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // transparent
        var rule = element.parentNode && getRule(element.parentNode);
        if (rule) {
            rule.validContent(element, result);
        }

        return result;
    }
};

module.exports = {
    get: getRule
};

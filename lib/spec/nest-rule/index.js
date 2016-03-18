/**
 * @file nest rules
 * @author nighca<nighca@live.cn>
 * @spec https://www.w3.org/TR/html5/single-page.html
 */

/* this file is generated automatically, disable eslint here */
/* eslint-disable */

var util = require('../../util');
var define = require('../define');

var rules = Object.create(null);
var nestUtil = require('./util')(rules);

rules.html = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as the root element of a document
        // context: raw - wherever a subdocument fragment is allowed in a compound document
        if (element.ownerDocument !== element.parentNode) {
            result.push({
                expect: 'as the root element of a document',
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - a head element followed by a body element
        result = result.concat(nestUtil.validateChildrenSequence({
            desc: 'a head element followed by a body element',
            sequence: [
                ['head', 1],
                ['body', 1]
            ]
        }, element));

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
            element.parentElement
            && (
                nestUtil.isNotTag('html', element.parentElement)
                || element.parentElement.firstElementChild !== element
            )
        ) {
            result.push({
                expect: 'as the first element in an html element',
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - if the document is an iframe srcdoc document or if title information is available from a higher-level protocol: zero or more elements of metadata content, of which no more than one is a title element and no more than one is a base element
        // content: raw - otherwise: one or more elements of metadata content, of which exactly one is a title element and no more than one is a base element

        result = result.concat(nestUtil.validateCategory('metadata content', children));

        if (children.filter(nestUtil.isTag('title')).length > 1) {
            result.push({
                expect: 'no more than one title element',
                target: element
            });
        }

        if (children.filter(nestUtil.isTag('base')).length > 1) {
            result.push({
                expect: 'no more than one base element',
                target: element
            });
        }

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
            parent
            && (
                nestUtil.isNotTag('head', parent)
                || parent.getElementsByTagName('TITLE').length > 1
            )
        ) {
            result.push({
                expect: 'in a head element containing no other title elements',
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - text that is not inter-element whitespace
        if (!(
            element.childNodes.length === 1
            && element.childNodes[0].nodeType === 3
            && define.isNot('inter-element whitespace', element.childNodes[0])
        )) {
            result.push({
                expect: 'text that is not inter-element whitespace',
                target: element
            });
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
            parent
            && (
                nestUtil.isNotTag('head', parent)
                || parent.getElementsByTagName('BASE').length > 1
            )
        ) {
            result.push({
                expect: 'in a head element containing no other base elements',
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.link = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - metadata content
        // IGNORE: context: raw - in a noscript element that is a child of a head element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
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
            if (
                element.parentElement
                && nestUtil.isNotTag('head', element.parentElement)
            ) {
                result.push({
                    expect: 'in a head element',
                    got: element.parentElement.tagName.toLowerCase(),
                    target: element
                });
            }
        }

        // context: raw - if the http-equiv attribute is present but not in the encoding declaration state: in a head element
        // context: raw - if the http-equiv attribute is present but not in the encoding declaration state: in a noscript element that is a child of a head element
        if (
            element.hasAttribute('http-equiv')
            && element.getAttribute('http-equiv') !== 'content-type'
        ) {
            if (
                element.parentElement
                && nestUtil.isNotTag('head', element.parentElement)
                && !(
                    nestUtil.isTag('noscript', element.parentElement)
                    && nestUtil.isTag('head', element.parentElement.parentElement)
                )
            ) {
                result.push({
                    expect: 'in a head element or in a noscript element that is a child of a head element',
                    target: element
                });
            }
        }

        // IGNORE: context: raw - if the name attribute is present: where metadata content is expected

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.style = {
    getCategories: function (element) {
        return ['metadata content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - metadata content
        // IGNORE: context: raw - in a noscript element that is a child of a head element
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // content: raw - depends on the value of the type attribute, but must match requirements described in prose below
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
            element.parentElement
            && (
                nestUtil.isNotTag('html', element.parentElement)
                || element.parentElement.children[1] !== element
            )
        ) {
            result.push({
                expect: 'as the second element in an html element',
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.article = {
    getCategories: function (element) {
        var categories = ['sectioning content', 'palpable content'];

        var hasMainElementDescendants = false;
        nestUtil.walkDescendants(element, function (descendant) {
            if (nestUtil.isTag('main', descendant)) {
                hasMainElementDescendants = true;
            }
        });

        if (!hasMainElementDescendants) {
            categories.unshift('flow content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.section = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.nav = {
    getCategories: function (element) {
        return ['flow content', 'sectioning content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no main element descendants

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

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
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no main element descendants

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

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
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.h2 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.h3 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.h4 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.h5 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.h6 = {
    getCategories: function (element) {
        return ['flow content', 'heading content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

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
        nestUtil.getAncestors(element).forEach(function (ancestor) {
            if (nestUtil.isTag('header|footer', ancestor)) {
                result.push({
                    expect: 'with no footer or header element ancestors',
                    got: ancestor.tagName.toLowerCase(),
                    target: element
                });
            }
        });

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no header, footer, or main element descendants

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

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
        nestUtil.getAncestors(element).forEach(function (ancestor) {
            if (nestUtil.isTag('header|footer', ancestor)) {
                result.push({
                    expect: 'with no footer or header element ancestors',
                    got: ancestor.tagName.toLowerCase(),
                    target: element
                });
            }
        });

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no header, footer, or main element descendants

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

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
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no heading content descendants, no sectioning content descendants, and no header, footer, or address element descendants

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        // but with no heading content descendants, no sectioning content descendants, and no header, footer, or address element descendants
        nestUtil.walkDescendants(element, function (descendant) {
            // no heading content descendants, no sectioning content descendants
            var categories = nestUtil.getCategories(descendant);
            if (
                categories.indexOf('heading content') >= 0
                || categories.indexOf('sectioning content') >= 0
            ) {
                result.push({
                    expect: 'with no heading content descendants, no sectioning content descendants',
                    got: nestUtil.nodeCategoriesInfo(descendant),
                    target: descendant
                });
            }

            // no header, footer, or address element descendants
            if (nestUtil.isTag('header|footer|address', descendant)) {
                result.push({
                    expect: 'with no header, footer, or address element descendants',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
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
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.hr = {
    getCategories: function (element) {
        return ['flow content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.pre = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.blockquote = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.ol = {
    getCategories: function (element) {
        var categories = ['flow content'];

        // if the element's children include at least one li element: palpable content
        if (element.children.some(nestUtil.isTag('li'))) {
            categories.push('palpable content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more li and script-supporting elements
        children.forEach(function (child) {
            if (
                nestUtil.isNotTag('li', child)
                && nestUtil.isNotCategory('script-supporting element', child)
            ) {
                result.push({
                    expect: 'li and script-supporting elements',
                    got: nestUtil.nodeInfo(child),
                    target: child
                });
            }
        });

        return result;
    }
};

rules.ul = {
    getCategories: function (element) {
        var categories = ['flow content'];

        // if the element's children include at least one li element: palpable content
        if (element.children.some(nestUtil.isTag('li'))) {
            categories.push('palpable content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more li and script-supporting elements
        children.forEach(function (child) {
            if (
                nestUtil.isNotTag('li', child)
                && nestUtil.isNotCategory('script-supporting element', child)
            ) {
                result.push({
                    expect: 'li and script-supporting elements',
                    got: nestUtil.nodeInfo(child),
                    target: child
                });
            }
        });

        return result;
    }
};

rules.li = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: inside - ol elements
        // context: inside - ul elements
        var parent = element.parentElement;
        if (
            parent
            && nestUtil.isNotTag('ol|ul', parent)
        ) {
            result.push({
                expect: 'inside ol or ul elements',
                got: parent.tagName.toLowerCase(),
                target: element
            });
        }
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.dl = {
    getCategories: function (element) {
        var categories = ['flow content'];

        // A name-value group consists of one or more names (dt elements)
        // followed by one or more values (dd elements),
        // ignoring any nodes other than dt and dd elements
        var startsNameValueGroup = function (child, index, children) {
            return nestUtil.isTag('dt', child)
                && children.slice(index + 1).some(nestUtil.isTag('dd'));
        };

        // if the element's children include at least one name-value group: palpable content
        if (element.children.some(startsNameValueGroup)) {
            categories.push('palpable content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more groups each consisting of one or more dt elements followed by one or more dd elements, optionally intermixed with script-supporting elements

        var childrenDtDd = children.filter(function (child) {
            if (nestUtil.isTag('dt|dd', child)) {
                return true;
            }

            // optionally intermixed with script-supporting elements
            if (nestUtil.isNotCategory('script-supporting element', child)) {
                result.push({
                    expect: 'dt, dd or script-supporting element',
                    got: nestUtil.nodeInfo(child),
                    target: child
                });
            }

            return false;
        });

        var childrenDtDdTags = childrenDtDd.map(function (child) {
            return child.tagName;
        }).join(',');

        // zero or more groups each consisting of one or more dt elements followed by one or more dd elements
        if (
            childrenDtDdTags
            && !/^((DT\,)+(DD(\,|$))+)*$/.test(childrenDtDdTags)
        ) {
            result.push({
                expect: 'zero or more groups each consisting of one or more dt elements followed by one or more dd elements',
                got: childrenDtDdTags,
                target: element
            });
        }

        return result;
    }
};

rules.dt = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - before dd or dt elements inside dl elements

        // before dd or dt elements
        // -> content of [ dl ]

        // inside dl elements
        if (
            element.parentElement
            && nestUtil.isNotTag('dl', element.parentElement)
        ) {
            result.push({
                expect: 'inside dl elements',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no header, footer, sectioning content, or heading content descendants

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        // but with no header, footer, sectioning content, or heading content descendants
        nestUtil.walkDescendants(element, function (descendant) {
            // no header, footer element descendants
            if (nestUtil.isTag('header|footer', descendant)) {
                result.push({
                    expect: 'with no header, footer element descendants',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }

            // no sectioning content or heading content descendants
            var categories = nestUtil.getCategories(descendant);
            if (
                categories.indexOf('heading content') >= 0
                || categories.indexOf('sectioning content') >= 0
            ) {
                result.push({
                    expect: 'with no sectioning content or heading content descendants',
                    got: nestUtil.nodeCategoriesInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.dd = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - after dt or dd elements inside dl elements

        // after dt or dd elements
        // -> content of [ dl ]

        // inside dl elements
        if (
            element.parentElement
            && nestUtil.isNotTag('dl', element.parentElement)
        ) {
            result.push({
                expect: 'inside dl elements',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.figure = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - either: one figcaption element followed by flow content
        // content: raw - or: flow content followed by one figcaption element
        // -> context of [ figcaption ]

        // content: raw - or: flow content
        result = result.concat(nestUtil.validateCategory(
            'flow content',
            children.filter(nestUtil.isNotTag('figcaption'))
        ));

        return result;
    }
};

rules.figcaption = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as the first or last child of a figure element
        if (element.parentElement) {
            if (nestUtil.isNotTag('figure', element.parentElement)) {
                result.push({
                    expect: 'as the first or last child of a figure element',
                    got: element.parentElement.tagName.toLowerCase(),
                    target: element
                });
            }

            if (
                element !== element.parentElement.firstElementChild
                && element !== element.parentElement.lastElementChild
            ) {
                result.push({
                    expect: 'as the first or last child of a figure element',
                    target: element
                });
            }
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.div = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.main = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // context: raw - where flow content is expected, but with no article, aside, footer, header or nav element ancestors

        // IGNORE: context: is - flow content

        // but with no article, aside, footer, header or nav element ancestors
        nestUtil.getAncestors(element).forEach(function (ancestor) {
            if (nestUtil.isTag('article|aside|footer|header|nav', ancestor)) {
                result.push({
                    expect: 'with no article, aside, footer, header or nav element ancestors',
                    got: ancestor.tagName.toLowerCase(),
                    target: element
                });
            }
        });

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.a = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - transparent, but there must be no interactive content descendant

        // transparent
        var rule = element.parentElement && nestUtil.getRule(element.parentElement);
        if (rule) {
            result = rule.validContent(element, result);
        }

        // but there must be no interactive content descendant
        nestUtil.walkDescendants(element, function (descendant) {
            if (nestUtil.isCategory('interactive content', descendant)) {
                result.push({
                    expect: 'no interactive content descendant',
                    got: nestUtil.nodeInfo(descendant),
                    target: element
                });
            }
        });

        return result;
    }
};

rules.em = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.strong = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.small = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.s = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.cite = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.q = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.dfn = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - phrasing content, but there must be no dfn element descendants

        // phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        // but there must be no dfn element descendants
        nestUtil.walkDescendants(element, function (descendant) {
            if (nestUtil.isTag('dfn', descendant)) {
                result.push({
                    expect: 'no dfn element descendants',
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.abbr = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.data = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.time = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.code = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.var = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.samp = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.kbd = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.sub = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.sup = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.i = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.b = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.u = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.mark = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.ruby = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
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
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

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
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

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
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.bdi = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.bdo = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.span = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.br = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.wbr = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.ins = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // transparent
        var rule = element.parentElement && nestUtil.getRule(element.parentElement);
        if (rule) {
            result = rule.validContent(element, result);
        }

        return result;
    }
};

rules.del = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // transparent
        var rule = element.parentElement && nestUtil.getRule(element.parentElement);
        if (rule) {
            result = rule.validContent(element, result);
        }

        return result;
    }
};

rules.img = {
    getCategories: function (element) {
        var categories = ['flow content', 'phrasing content', 'embedded content', 'form-associated element', 'palpable content'];

        // if the element has a usemap attribute: interactive content
        if (element.hasAttribute('usemap')) {
            categories.push('interactive content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.iframe = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'interactive content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - embedded content
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
        // IGNORE: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.object = {
    getCategories: function (element) {
        var categories = ['flow content', 'phrasing content', 'embedded content', 'listed, submittable, and reassociateable form-associated element', 'palpable content'];

        // if the element has a usemap attribute: interactive content
        if (element.hasAttribute('usemap')) {
            categories.push('interactive content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more param elements, then, transparent

        var rule = element.parentElement && nestUtil.getRule(element.parentElement);
        if (rule) {
            result = rule.validContent(
                util.extend(Object.create(element), {
                    childNodes: element.childNodes.filter(nestUtil.isNotTag('param'))
                }),
                result
            );
        }

        return result;
    }
};

rules.param = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of an object element, before any flow content
        if (element.parentElement) {
            // as a child of an object element
            if (nestUtil.isNotTag('object', element.parentElement)) {
                result.push({
                    expect: 'as a child of an object element',
                    got: element.parentElement.tagName.toLowerCase(),
                    target: element
                });
            }

            // before any flow content
            for (var prev = element; prev = prev.previousElementSibling;) {
                if (nestUtil.isCategory('flow content', prev)) {
                    result.push({
                        expect: 'before any flow content',
                        target: element
                    });
                }
            }
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.video = {
    getCategories: function (element) {
        var categories = ['flow content', 'phrasing content', 'embedded content', 'palpable content'];

        // if the element has a controls attribute: interactive content
        if (element.hasAttribute('controls')) {
            categories.push('interactive content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - if the element has a src attribute: zero or more track elements, then transparent, but with no media element descendants
        // content: raw - if the element does not have a src attribute: zero or more source elements, then zero or more track elements, then transparent, but with no media element descendants

        var hasSrcAttribute = element.hasAttribute('src');

        // transparent
        var rule = element.parentElement && nestUtil.getRule(element.parentElement);
        if (rule) {
            result = rule.validContent(
                util.extend(Object.create(element), {
                    childNodes: element.childNodes.filter(function (child) {
                        // if the element does not have a src attribute: zero or more source elements
                        if (
                            !hasSrcAttribute
                            && nestUtil.isTag('source', child)
                        ) {
                            return false;
                        }

                        // zero or more track elements
                        if (nestUtil.isTag('track', child)) {
                            return false;
                        }

                        return true;
                    })
                }),
                result
            );
        }

        // but with no media element descendants
        nestUtil.walkDescendants(element, function (descendant) {
            if (define.is('media element', descendant)) {
                result.push({
                    expect: 'with no media element descendants',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.audio = {
    getCategories: function (element) {
        var categories = ['flow content', 'phrasing content', 'embedded content'];

        // if the element has a controls attribute: interactive content
        // if the element has a controls attribute: palpable content
        if (element.hasAttribute('controls')) {
            categories.push('interactive content');
            categories.push('palpable content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - if the element has a src attribute: zero or more track elements, then transparent, but with no media element descendants
        // content: raw - if the element does not have a src attribute: zero or more source elements, then zero or more track elements, then transparent, but with no media element descendants

        var hasSrcAttribute = element.hasAttribute('src');

        // transparent
        var rule = element.parentElement && nestUtil.getRule(element.parentElement);
        if (rule) {
            result = rule.validContent(
                util.extend(Object.create(element), {
                    childNodes: element.childNodes.filter(function (child) {
                        // if the element does not have a src attribute: zero or more source elements
                        if (
                            !hasSrcAttribute
                            && nestUtil.isTag('source', child)
                        ) {
                            return false;
                        }

                        // zero or more track elements
                        if (nestUtil.isTag('track', child)) {
                            return false;
                        }

                        return true;
                    })
                }),
                result
            );
        }

        // but with no media element descendants
        nestUtil.walkDescendants(element, function (descendant) {
            if (define.is('media element', descendant)) {
                result.push({
                    expect: 'with no media element descendants',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.source = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a media element, before any flow content or track elements
        if (element.parentElement) {
            // as a child of a media element
            if (define.isNot('media element', element.parentElement)) {
                result.push({
                    expect: 'as a child of a media element',
                    got: element.parentElement.tagName.toLowerCase(),
                    target: element
                });
            }

            // before any flow content or track elements
            for (var prev = element; prev = prev.previousElementSibling;) {
                if (
                    nestUtil.isTag('track', prev)
                    || nestUtil.isCategory('flow content', prev)
                ) {
                    result.push({
                        expect: 'before any flow content or track elements',
                        target: element
                    });
                }
            }
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.track = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a media element, before any flow content
        if (element.parentElement) {
            // as a child of a media element
            if (define.isNot('media element', element.parentElement)) {
                result.push({
                    expect: 'as a child of a media element',
                    got: element.parentElement.tagName.toLowerCase(),
                    target: element
                });
            }

            // before any flow content
            for (var prev = element; prev = prev.previousElementSibling;) {
                if (nestUtil.isCategory('flow content', prev)) {
                    result.push({
                        expect: 'before any flow content',
                        target: element
                    });
                }
            }
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.map = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // transparent
        var rule = element.parentElement && nestUtil.getRule(element.parentElement);
        if (rule) {
            result = rule.validContent(element, result);
        }

        return result;
    }
};

rules.area = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // context: raw - where phrasing content is expected, but only if there is a map element ancestor or a template element ancestor

        // only if there is a map element ancestor or a template element ancestor
        if (!nestUtil.getAncestors(element).some(nestUtil.isTag('map|template'))) {
            result.push({
                expect: 'with a map element ancestor or a template element ancestor',
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.table = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - in this order:
        //      optionally a caption element,
        //      followed by zero or more colgroup elements,
        //      followed optionally by a thead element,
        //      followed optionally by a tfoot element,
        //      followed by either zero or more tbody elements or one or more tr elements,
        //      followed optionally by a tfoot element (but there can only be one tfoot element child in total),
        //      optionally intermixed with one or more script-supporting elements
        result = result.concat(nestUtil.validateChildrenSequence({
            desc: [
                'optionally a caption element',
                'followed by zero or more colgroup elements',
                'followed optionally by a thead element',
                'followed optionally by a tfoot element',
                'followed by either zero or more tbody elements or one or more tr elements',
                'followed optionally by a tfoot element',
                'optionally intermixed with one or more script-supporting elements'
            ].join(', '),
            exclude: nestUtil.isNotCategory('script-supporting element'),
            sequence: [
                ['caption', '?'],
                ['colgroup', '*'],
                ['thead', '?'],
                ['tfoot', '?'],
                // "tbody & tr should not show together" will be checked in following code
                ['tbody|tr', '*'],
                // "but there can only be one tfoot element child in total" will be checked in following code
                ['tfoot', '?']
            ]
        }, element));

        // tbody & tr should not show together
        if (
            children.some(nestUtil.isTag('tbody'))
            && children.some(nestUtil.isTag('tr'))
        ) {
            result.push({
                expect: 'containing either tbody elements or tr elements',
                got: 'tbody and tr',
                target: element
            });
        }

        // but there can only be one tfoot element child in total
        if (children.filter(nestUtil.isTag('tfoot')).length > 1) {
            result.push({
                expect: 'containing only one tfoot element child in total',
                target: element
            });
        }

        return result;
    }
};

rules.caption = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as the first element child of a table element

        // as a child of a table element
        if (
            element.parentElement
            && nestUtil.isNotTag('table', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of an table element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        // the first element child
        // -> content of [ table ]

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no descendant table elements

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        // but with no descendant table elements
        nestUtil.walkDescendants(element, function (descendant) {
            // no descendant table elements
            if (nestUtil.isTag('table', descendant)) {
                result.push({
                    expect: 'with no descendant table elements',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.colgroup = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a table element, after any caption elements and before any thead, tbody, tfoot, and tr elements

        // as a child of a table element
        if (
            element.parentElement
            && nestUtil.isNotTag('table', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of an table element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        // after any caption elements and before any thead, tbody, tfoot, and tr elements
        // -> content of [ table ]

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - if the span attribute is present: empty
        if (element.hasAttribute('span')) {
            if (element.childNodes.length) {
                result.push({expect: 'empty'});
            }
        }
        // content: raw - if the span attribute is absent: zero or more col and template elements
        else {
            result = result.concat(nestUtil.validateChildrenSequence({
                desc: 'zero or more col and template elements',
                sequence: [['col|template', '*']]
            }, element));
        }

        return result;
    }
};

rules.col = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a colgroup element that doesn't have a span attribute

        // as a child of a colgroup element
        if (
            element.parentElement
            && nestUtil.isNotTag('colgroup', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of a colgroup element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        // as a child of a colgroup element that doesn't have a span attribute
        // -> content of [ colgroup ]

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.tbody = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a table element, after any caption, colgroup, and thead elements, but only if there are no tr elements that are children of the table element

        // as a child of a table element
        if (
            element.parentElement
            && nestUtil.isNotTag('table', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of an table element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        // after any caption, colgroup, and thead elements, but only if there are no tr elements that are children of the table element
        // -> content of [ table ]

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more tr and script-supporting elements
        result = result.concat(nestUtil.validateChildrenSequence({
            desc: 'zero or more tr and script-supporting elements',
            sequence: [['tr|category:script-supporting element', '*']]
        }, element));

        return result;
    }
};

rules.thead = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a table element, after any caption, and colgroup elements and before any tbody, tfoot, and tr elements, but only if there are no other thead elements that are children of the table element

        // as a child of a table element
        if (
            element.parentElement
            && nestUtil.isNotTag('table', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of an table element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        // after any caption, and colgroup elements and before any tbody, tfoot, and tr elements, but only if there are no other thead elements that are children of the table element
        // -> content of [ table ]

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more tr and script-supporting elements
        result = result.concat(nestUtil.validateChildrenSequence({
            desc: 'zero or more tr and script-supporting elements',
            sequence: [['tr|category:script-supporting element', '*']]
        }, element));

        return result;
    }
};

rules.tfoot = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a table element, after any caption, colgroup, and thead elements and before any tbody and tr elements, but only if there are no other tfoot elements that are children of the table element
        // context: raw - as a child of a table element, after any caption, colgroup, thead, tbody, and tr elements, but only if there are no other tfoot elements that are children of the table element

        // as a child of a table element
        if (
            element.parentElement
            && nestUtil.isNotTag('table', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of an table element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        // after any caption, colgroup, and thead elements and before any tbody and tr elements, but only if there are no other tfoot elements that are children of the table element
        // after any caption, colgroup, thead, tbody, and tr elements, but only if there are no other tfoot elements that are children of the table element
        // -> content of [ table ]

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more tr and script-supporting elements
        result = result.concat(nestUtil.validateChildrenSequence({
            desc: 'zero or more tr and script-supporting elements',
            sequence: [['tr|category:script-supporting element', '*']]
        }, element));

        return result;
    }
};

rules.tr = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a thead element
        // context: raw - as a child of a tbody element
        // context: raw - as a child of a tfoot element
        // context: raw - as a child of a table element, after any caption, colgroup, and thead elements, but only if there are no tbody elements that are children of the table element

        // as a child of a thead element
        // as a child of a tbody element
        // as a child of a tfoot element
        // as a child of a table element
        if (
            element.parentElement
            && nestUtil.isNotTag('thead|tbody|tfoot|table', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of a thead element, a tbody element, a tfoot element or a table element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        // as a child of a table element, after any caption, colgroup, and thead elements, but only if there are no tbody elements that are children of the table element
        // -> content of [ table ]

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more td, th, and script-supporting elements
        result = result.concat(nestUtil.validateChildrenSequence({
            desc: 'zero or more td, th, and script-supporting elements',
            sequence: [['td|th|category:script-supporting element', '*']]
        }, element));

        return result;
    }
};

rules.td = {
    getCategories: function (element) {
        return ['sectioning root'];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a tr element
        if (
            element.parentElement
            && nestUtil.isNotTag('tr', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of a tr element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        return result;
    }
};

rules.th = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a tr element
        if (
            element.parentElement
            && nestUtil.isNotTag('tr', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of a tr element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no header, footer, sectioning content, or heading content descendants

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        // but with no header, footer, sectioning content, or heading content descendants
        nestUtil.walkDescendants(element, function (descendant) {
            // no header, footer element descendants
            if (nestUtil.isTag('header|footer', descendant)) {
                result.push({
                    expect: 'with no header, footer element descendants',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }

            // no sectioning content or heading content descendants
            var categories = nestUtil.getCategories(descendant);
            if (
                categories.indexOf('heading content') >= 0
                || categories.indexOf('sectioning content') >= 0
            ) {
                result.push({
                    expect: 'with no sectioning content or heading content descendants',
                    got: nestUtil.nodeCategoriesInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.form = {
    getCategories: function (element) {
        return ['flow content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - flow content, but with no form element descendants

        // flow content
        result = result.concat(nestUtil.validateCategory('flow content', children));

        // but with no form element descendants
        nestUtil.walkDescendants(element, function (descendant) {
            // no form element descendants
            if (nestUtil.isTag('form', descendant)) {
                result.push({
                    expect: 'with no form element descendants',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.label = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // content: raw - phrasing content, but with no descendant labelable elements unless it is the element's labeled control, and no descendant label elements

        // phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        // but with no descendant labelable elements unless it is the element's labeled control, and no descendant label elements
        nestUtil.walkDescendants(element, function (descendant) {
            // with no descendant labelable elements unless it is the element's labeled control
            // "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself"
            // so skip check here.

            // no descendant label elements
            if (nestUtil.isTag('label', descendant)) {
                result.push({
                    expect: 'with no descendant label elements',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.input = {
    getCategories: function (element) {
        var categories = ['flow content', 'phrasing content'];

        // if the type attribute is in the hidden state: listed, submittable, resettable, and reassociateable form-associated element
        if (element.getAttribute('type') === 'hidden') {
            categories.push('listed, submittable, resettable, and reassociateable form-associated element');
        }
        // if the type attribute is not in the hidden state: interactive content
        // if the type attribute is not in the hidden state: listed, labelable, submittable, resettable, and reassociateable form-associated element
        // if the type attribute is not in the hidden state: palpable content
        else {
            categories.push('interactive content');
            categories.push('listed, labelable, submittable, resettable, and reassociateable form-associated element');
            categories.push('palpable content');
        }

        return categories;
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.button = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - phrasing content, but there must be no interactive content descendant

        // phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        // but there must be no interactive content descendant
        nestUtil.walkDescendants(element, function (descendant) {
            // no interactive content descendant
            if (nestUtil.isCategory('interactive content', descendant)) {
                result.push({
                    expect: 'with no interactive content descendant',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.select = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more option, optgroup, and script-supporting elements
        result = result.concat(nestUtil.validateChildrenSequence({
            desc: 'zero or more option, optgroup, and script-supporting elements',
            sequence: [['option|optgroup|category:script-supporting element', '*']]
        }, element));

        return result;
    }
};

rules.datalist = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - either: phrasing content (with zero or more option elements descendants)
        // content: raw - or: zero or more option elements
        if (
            nestUtil.validateCategory('phrasing content', children).length
            && nestUtil.validateChildrenSequence({
                desc: 'zero or more option elements',
                sequence: [['option', '*']]
            }, element).length
        ) {
            result.push({
                expect: 'either phrasing content, or zero or more option elements',
                got: nestUtil.sequenceInfo(element.children),
                target: element
            });
        }

        return result;
    }
};

rules.optgroup = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a select element
        if (
            element.parentElement
            && nestUtil.isNotTag('select', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of an select element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - zero or more option and script-supporting elements
        result = result.concat(nestUtil.validateChildrenSequence({
            desc: 'zero or more option and script-supporting elements',
            sequence: [['option|category:script-supporting element', '*']]
        }, element));

        return result;
    }
};

rules.option = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as a child of a select element
        // context: raw - as a child of a datalist element
        // context: raw - as a child of an optgroup element
        if (
            element.parentElement
            && nestUtil.isNotTag('select|datalist|optgroup', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of a select element, a datalist element or an optgroup element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - if the element has a label attribute and a value attribute: empty
        if (
            element.hasAttribute('label')
            && element.hasAttribute('value')
        ) {
            if (element.childNodes.length) {
                result.push({expect: 'empty'});
            }
        }

        // content: raw - if the element has a label attribute but no value attribute: text
        if (
            element.hasAttribute('label')
            && !element.hasAttribute('value')
        ) {
            if (children.length) {
                result.push({expect: 'text'});
            }
        }

        // content: raw - if the element has no label attribute: text that is not inter-element whitespace
        if (!element.hasAttribute('label')) {
            if (!(
                element.childNodes.length === 1
                && element.childNodes[0].nodeType === 3
                && define.isNot('inter-element whitespace', element.childNodes[0])
            )) {
                result.push({
                    expect: 'text that is not inter-element whitespace',
                    target: element
                });
            }
        }

        return result;
    }
};

rules.textarea = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // text
        if (children.length) {
            result.push({expect: 'text'});
        }

        return result;
    }
};

rules.keygen = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'interactive content', 'listed, labelable, submittable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // empty
        if (element.childNodes.length) {
            result.push({expect: 'empty'});
        }

        return result;
    }
};

rules.output = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'listed, labelable, resettable, and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.progress = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'labelable element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - phrasing content, but there must be no progress element descendants

        // phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        // but there must be no progress element descendants
        nestUtil.walkDescendants(element, function (descendant) {
            // no progress element descendants
            if (nestUtil.isTag('progress', descendant)) {
                result.push({
                    expect: 'with no progress element descendants',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.meter = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'labelable element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - phrasing content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - phrasing content, but there must be no meter element descendants

        // phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        // but there must be no meter element descendants
        nestUtil.walkDescendants(element, function (descendant) {
            // no meter element descendants
            if (nestUtil.isTag('meter', descendant)) {
                result.push({
                    expect: 'with no meter element descendants',
                    got: nestUtil.nodeInfo(descendant),
                    target: descendant
                });
            }
        });

        return result;
    }
};

rules.fieldset = {
    getCategories: function (element) {
        return ['flow content', 'sectioning root', 'listed and reassociateable form-associated element', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - flow content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // content: raw - optionally a legend element, followed by flow content
        children.forEach(function (child, index) {
            if (!index && nestUtil.isTag('legend', children[0])) {
                return;
            }

            if (!nestUtil.isCategory('flow content', child)) {
                result.push({
                    expect: 'optionally a legend element, followed by flow content',
                    got: nestUtil.nodeCategoriesInfo(child),
                    target: child
                });
            }
        });

        return result;
    }
};

rules.legend = {
    getCategories: function (element) {
        return [];
    },
    validContext: function (element, result) {
        // context: raw - as the first child of a fieldset element

        // as the first child
        // -> content of [ fieldset ]

        // as a child of a fieldset element
        if (
            element.parentElement
            && nestUtil.isNotTag('fieldset', element.parentElement)
        ) {
            result.push({
                expect: 'as a child of an fieldset element',
                got: element.parentElement.tagName.toLowerCase(),
                target: element
            });
        }

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // is phrasing content
        result = result.concat(nestUtil.validateCategory('phrasing content', children));

        return result;
    }
};

rules.script = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content', 'script-supporting element'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - metadata content
        // IGNORE: context: is - phrasing content
        // IGNORE: context: is - script-supporting elements
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;
        // IGNORE: content: raw - if there is no src attribute, depends on the value of the type attribute, but must match script content restrictions
        // IGNORE: content: raw - if there is a src attribute, the element must be either empty or contain only script documentation that also matches script content restrictions
        return result;
    }
};

rules.noscript = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content'];
    },
    validContext: function (element, result) {
        // context: raw - in a head element of an html document, if there are no ancestor noscript elements
        // context: raw - where phrasing content is expected in html documents, if there are no ancestor noscript elements

        // there are no ancestor noscript elements
        nestUtil.getAncestors(element).forEach(function (ancestor) {
            if (nestUtil.isTag('noscript', ancestor)) {
                result.push({
                    expect: 'with no ancestor noscript elements',
                    got: ancestor.tagName.toLowerCase(),
                    target: element
                });
            }
        });

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // IGNORE: content: raw - when scripting is disabled, in a head element: in any order, zero or more link elements, zero or more style elements, and zero or more meta elements
        // IGNORE: content: raw - when scripting is disabled, not in a head element: transparent, but there must be no noscript element descendants
        // IGNORE: content: raw - otherwise: text that conforms to the requirements given in the prose

        // there must be no noscript element descendants
        // -> context of [ noscript ]

        return result;
    }
};

rules.template = {
    getCategories: function (element) {
        return ['metadata content', 'flow content', 'phrasing content', 'script-supporting element'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - metadata content
        // IGNORE: context: is - phrasing content
        // IGNORE: context: is - script-supporting elements

        // as a child of a colgroup element that doesn't have a span attribute
        // -> content of [ colgroup ]

        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // IGNORE: content: raw - either: metadata content
        // IGNORE: content: raw - or: flow content
        // IGNORE: content: raw - or: the content model of ol and ul elements
        // IGNORE: content: raw - or: the content model of dl elements
        // IGNORE: content: raw - or: the content model of figure elements
        // IGNORE: content: raw - or: the content model of ruby elements
        // IGNORE: content: raw - or: the content model of object elements
        // IGNORE: content: raw - or: the content model of video and audio elements
        // IGNORE: content: raw - or: the content model of table elements
        // IGNORE: content: raw - or: the content model of colgroup elements
        // IGNORE: content: raw - or: the content model of thead, tbody, and tfoot elements
        // IGNORE: content: raw - or: the content model of tr elements
        // IGNORE: content: raw - or: the content model of fieldset elements
        // IGNORE: content: raw - or: the content model of select elements

        return result;
    }
};

rules.canvas = {
    getCategories: function (element) {
        return ['flow content', 'phrasing content', 'embedded content', 'palpable content'];
    },
    validContext: function (element, result) {
        // IGNORE: context: is - embedded content
        return result;
    },
    validContent: function (element, result) {
        var children = element.children;

        // transparent
        var rule = element.parentElement && nestUtil.getRule(element.parentElement);
        if (rule) {
            result = rule.validContent(element, result);
        }

        return result;
    }
};

rules.math = {
    getCategories: function (element) {
        return ['embedded content', 'phrasing content', 'flow content'];
    },
    validContext: function (element, result) {
        return result;
    },
    validContent: function (element, result) {
        return result;
    }
};

rules.svg = {
    getCategories: function (element) {
        return ['embedded content', 'phrasing content', 'flow content'];
    },
    validContext: function (element, result) {
        return result;
    },
    validContent: function (element, result) {
        return result;
    }
};

module.exports = rules;

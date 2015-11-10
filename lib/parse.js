/**
 * @file parse code
 * @author nighca<nighca@live.cn>
 */

var emitter = require('events').EventEmitter.prototype;
var htmlparser2 = require('htmlparser2');
var Parser = htmlparser2.Parser;
var DomHandler = htmlparser2.DomHandler;

var util = require('./util');
var Node = require('./node');

/**
 * Transform node to Node instance & recursively transform its children.
 *
 * @param {Object} node - given node
 * @return {Node} result node
 */
var transformRecursively = function (node) {
    Node.init(node);

    node.childNodes.forEach(function (childNode) {
        transformRecursively(childNode);
    });

    return node;
};

/**
 * Wrap node list with <document>.
 *
 * @param {Array} arr - node list
 * @return {Node} document node
 */
var wrapDocument = function (arr) {
    var document = htmlparser2.parseDOM('<document></document>')[0];

    document.children = arr;

    for (var i = 0; i < arr.length; i++) {
        var node = arr[i];

        node.prev = arr[i - 1] || null;
        node.next = arr[i + 1] || null;

        node.root = document;
        node.parent = null;
    }

    transformRecursively(document);

    // fix startIndex missing, cause <document> is parsed seperately
    document.startIndex = document.documentElement ? document.documentElement.startIndex : 0;

    return document;
};

/**
 * Make parser emittable &
 * emit event "xxx" on parser while parser.onxxx called.
 *
 * @param {Parser} parser - the parser, instance of htmlparser2.Parser
 * @return {Parser} parser itself
 */
var emittable = function (parser, cbs) {
    // inherits EventEmitter
    for (var method in emitter) {
        if (emitter.hasOwnProperty(method)) {
            parser[method] = emitter[method];
        }
    }

    // wrap methods
    [
        'processinginstruction',
        'comment',
        'commentend',
        'cdatastart',
        'text',
        'cdataend',
        'error',
        'closetag',
        'end',
        'reset',
        'parserinit',
        'opentagname',
        'opentag',
        'closetag',
        'attribute'
    ].forEach(function (event) {
        // emit "xxx" on parser while method "onxxx" of cbs called

        var name = 'on' + event;
        var method = cbs[name];

        cbs[name] = function () {
            var args = Array.prototype.slice.call(arguments);
            parser.emit.apply(parser, [event].concat(args));
            return method ? method.apply(this, args) : null;
        };
    });

    return parser;
};

/**
 * Get a HTML parser.
 *
 * @param {Object} options - options for create parser
 * @return {Parser} HTML parser
 */
var getParser = function (options) {
    // handler during parse
    var handler = new DomHandler({
        withStartIndices: true
    });

    options = util.extend({
        lowerCaseAttributeNames: false
    }, options);

    // create parser with dom-handler
    var parser = new Parser(handler, options);

    // record handler on parser
    parser.handler = handler;

    return emittable(parser, handler);
};

/**
 * Parse given html content to document node.
 *
 * @param {string} htmlCode - HTML code content
 * @param {Parser=} parser - given parser
 * @return {Node} document node
 */
var parse = function (htmlCode, parser) {
    // get parser
    parser = parser || getParser();

    // replace "\r\n" with "\n"
    htmlCode = htmlCode.replace(/\r\n/g, '\n');

    // do parse
    parser.end(htmlCode);

    // get dom & wrap it with <document>
    var document = wrapDocument(parser.handler.dom);

    return document;
};

parse.getParser = getParser;

module.exports = parse;

/**
 * @file parse code
 * @author nighca<nighca@live.cn>
 */

var emitter = require('events').EventEmitter.prototype;
var htmlparser2 = require('htmlparser2');
var Parser = htmlparser2.Parser;
var DomHandler = htmlparser2.DomHandler;

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

    return document;
};

/**
 * Make parser emittable &
 * emit event "xxx" on parser while parser.onxxx called.
 *
 * @param {Parser} parser - the parser, instance of htmlparser2.Parser
 * @return {Parser} parser itself
 */
var emittable = function (parser) {
    // inherits EventEmitter
    for (var method in emitter) {
        if (emitter.hasOwnProperty(method)) {
            parser[method] = emitter[method];
        }
    }

    // emit "xxx" while method "onxxx" called
    var wrap = function (target, name) {
        var origin = target[name];
        var event = name.slice(2);

        return function (arg) {
            target.emit(event, arg);
            return origin.call(this, arg);
        };
    };

    // wrap methods
    for (var name in parser) {
        if (
            typeof parser[name] === 'function'
            && /^on\w+/.test(name)
        ) {
            parser[name] = wrap(parser, name);
        }
    }

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

    // create parser with dom-handler
    var parser = new Parser(handler, options);

    // record handler on parser
    parser.handler = handler;

    return emittable(parser);
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

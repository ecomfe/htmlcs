/**
 * @file test for Element
 * @author nighca<nighca@live.cn>
 */

var htmlparser2 = require('htmlparser2');

var Node = require('../../lib/node');

var NodeType = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11
};

var transformRecursively = function (node, root) {
    root = root || node;

    Node.init(node, root);

    node.childNodes.forEach(function (childNode) {
        transformRecursively(childNode, root);
    });

    return node;
};

describe('element', function () {
    var p = htmlparser2.parseDOM(
        '<p><span></span>' +
        '<a id="x" class="y z" href="#" data-role="test" disabled>' +
        '<img id="c1" class="cls cls2">' +
        '<span id="c2" class="cls"></span>' +
        '</a>' +
        '<i></i></p>'
    )[0];

    /* eslint-disable fecs-max-statements */
    it('should behave like a element(<a>)', function () {
        transformRecursively(p);

        var node = p.childNodes[1];

        // as a node
        expect(node.nodeName).toBe('A');
        expect(node.nodeType).toBe(NodeType.ELEMENT_NODE);

        expect(node.parentNode.tagName).toBe('P');
        expect(node.parentElement).toBe(node.parentNode);
        expect(node.previousSibling.tagName).toBe('SPAN');
        expect(node.nextSibling.tagName).toBe('I');

        // as an element
        expect(node.localName).toBe('a');
        expect(node.tagName).toBe('A');
        expect(node.id).toBe('x');
        expect(node.className).toBe('y z');
        expect(node.classList.length).toBe(2);
        expect(node.classList[0]).toBe('y');
        expect(node.classList[1]).toBe('z');

        expect(node.attributes[0].name).toBe('id');
        expect(node.attributes[0].value).toBe('x');
        expect(node.attributes[1].name).toBe('class');
        expect(node.attributes[1].value).toBe('y z');
        expect(node.attributes[2].name).toBe('href');
        expect(node.attributes[2].value).toBe('#');
        expect(node.attributes[3].name).toBe('data-role');
        expect(node.attributes[3].value).toBe('test');
        expect(node.attributes[4].name).toBe('disabled');
        expect(node.attributes[4].value).toBe('');

        expect(node.children.length).toBe(2);
        expect(node.children[0]).toBe(node.firstElementChild);
        expect(node.children[1]).toBe(node.lastElementChild);
        expect(node.childElementCount).toBe(2);
        expect(node.children[0].id).toBe('c1');
        expect(node.children[1].id).toBe('c2');

        expect(node.previousElementSibling.tagName).toBe('SPAN');
        expect(node.nextElementSibling.tagName).toBe('I');

        expect(node.getAttribute('href')).toBe('#');
        var hrefAttributeNode = node.getAttributeNode('href');
        expect(hrefAttributeNode.name).toBe('href');
        expect(hrefAttributeNode.value).toBe('#');
        expect(node.hasAttribute('href')).toBe(true);
        expect(node.hasAttribute('disabled')).toBe(true);
        expect(node.hasAttribute('disabledddd')).toBe(false);

        var elementsOfTagNameImg = node.getElementsByTagName('img');
        expect(elementsOfTagNameImg.length).toBe(1);
        expect(elementsOfTagNameImg[0].id).toBe('c1');

        var elementsOfClassNameCls = node.getElementsByClassName('cls');
        expect(elementsOfClassNameCls.length).toBe(2);
        expect(elementsOfClassNameCls[0].id).toBe('c1');
        expect(elementsOfClassNameCls[1].id).toBe('c2');

        var elementsOfClassNameClsCls2 = node.getElementsByClassName('cls cls2');
        expect(elementsOfClassNameClsCls2.length).toBe(1);
        expect(elementsOfClassNameClsCls2[0].id).toBe('c1');

        var elementOfIdC2 = node.querySelector('#c2');
        expect(elementOfIdC2.id).toBe('c2');

        var elementsOfIdC2 = node.querySelectorAll('#c2');
        expect(elementsOfIdC2.length).toBe(1);
        expect(elementsOfIdC2[0].id).toBe('c2');
    });
    /* eslint-enable fecs-max-statements */
});

describe('element write ops', function () {
    var a = htmlparser2.parseDOM(
        '<a id="x" class="y z" href="#" data-role="test" disabled></a>'
    )[0];

    transformRecursively(a);

    var Attr = a.getAttributeNode('href').constructor;

    it('should work well', function () {
        expect(a.getAttribute('id')).toBe('x');
        expect(a.getAttributeNode('id').name).toBe('id');
        expect(a.getAttributeNode('id').value).toBe('x');
        a.setAttribute('id', 'xx');
        expect(a.getAttribute('id')).toBe('xx');
        expect(a.getAttributeNode('id').name).toBe('id');
        expect(a.getAttributeNode('id').value).toBe('xx');

        a.removeAttribute('id');
        expect(a.hasAttribute('id')).toBe(false);
        expect(a.getAttribute('id')).toBe(null);
        expect(a.getAttributeNode('id')).toBe(null);

        var oldAttribute = a.setAttributeNode(new Attr('data-role', 'test2'));
        expect(oldAttribute.name).toBe('data-role');
        expect(oldAttribute.value).toBe('test');
        expect(a.getAttribute('data-role')).toBe('test2');

        oldAttribute = a.removeAttributeNode(a.getAttributeNode('disabled'));
        expect(oldAttribute.name).toBe('disabled');
        expect(oldAttribute.value).toBe('');
        expect(a.hasAttribute('disabled')).toBe(false);
    });
});

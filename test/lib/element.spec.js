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

        expect(node.attributes.id).toBe('x');
        expect(node.attributes.class).toBe('y z');
        expect(node.attributes.href).toBe('#');
        expect(node.attributes['data-role']).toBe('test');
        expect(node.attributes.disabled).toBe('');

        expect(node.children.length).toBe(2);
        expect(node.children[0]).toBe(node.firstElementChild);
        expect(node.children[1]).toBe(node.lastElementChild);
        expect(node.childElementCount).toBe(2);
        expect(node.children[0].id).toBe('c1');
        expect(node.children[1].id).toBe('c2');

        expect(node.previousElementSibling.tagName).toBe('SPAN');
        expect(node.nextElementSibling.tagName).toBe('I');

        expect(node.getAttribute('href')).toBe('#');
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
});

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(arg) {
    if (typeof arg === 'string') {
      this.each(node => {
        node.innerHTML = arg;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(children) {
    if (this.nodes.length === 0) {
      return;
    }

    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
      // make sure it is a collection
      children = $l(children);
    }
    if (typeof children === 'string') {
      // strings gets pushed into the selected element(s)
      this.each(node => (node.innerHTML += children));
    } else if (children instanceof DOMNodeCollection) {
      // if its an array of nodes we will take each node and append each child
      this.each(node => {
        children.each(child => {
          node.appendChild(child);
        });
      });
    }
  }

  attr(attr, val) {
    if (typeof val === 'string') {
      this.each(node => {
        node.setAttribute(attr, val);
      });
    } else {
      return this.nodes[0].getAttribute(attr);
    }
  }

  addClass(name) {
    this.each(node => {
      node.classList.add(name);
    });
  }

  removeClass(name) {
    this.each(node => {
      node.classList.remove(name);
    });
  }

  children() {
    let nodeList = [];
    this.each(node => {
      const childNodes = node.children;
      nodeList = nodeList.concat(Array.from(childNodes));
    });
    return new DOMNodeCollection(nodeList);
  }

  parent() {
    const parentNodes = [];
    this.each(({ parentNode }) => {
      parentNode.visited ? parentNodes.push(parentNode) : (parentNode.visited = true);
    });
    parentNodes.forEach(node => {
      node.visited = false;
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(arg) {
    let nodes = [];
    this.each(el => {
      nodes.concat(Array.from(el.querySelectorAll(arg)));
    });
    return new DOMNodeCollection(nodes);
  }

  remove() {
    this.each(node => node.parentNode.removeNode(node));
  }

  on(event, cb) {
    this.each(node => {
      node.addEventListener(event, cb);
      const defineEvent = `eventName=${event}`;
      if (typeof node[defineEvent] === 'undefined') {
        node[defineEvent] = [];
      }
      node[defineEvent].push(cb);
    });
  }

  off(event) {
    this.each(node => {
      const defineEvent = `eventName${event}`;
      if (node[defineEvent]) {
        node[defineEvent].forEach(cb => {
          node.removeEventListener(defineEvent, cb);
        });
      }
      node[defineEvent] = [];
    });
  }
}

module.exports = DOMNodeCollection;

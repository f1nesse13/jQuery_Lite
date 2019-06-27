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
}

module.exports = DOMNodeCollection;

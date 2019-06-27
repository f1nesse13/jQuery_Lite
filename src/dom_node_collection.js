class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(arg) {
    if (typeof arg === 'string') {
      this.nodes.each(el => {
        el.innerHTML = arg;
      });
    } else if (this.nodes.length < 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }
}

module.exports = DOMNodeCollection;

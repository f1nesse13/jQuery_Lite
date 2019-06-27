const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = arg => {
  if (arg instanceof HTMLElement) {
    return DOMNodeCollection([arg]);
  }
  if (typeof arg === 'string') {
    let nodelist = document.querySelectorAll(arg);
    nodelist = Array.from(nodelist);
    return DOMNodeCollection(nodelist);
  }
};

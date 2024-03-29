/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes;\n  }\n\n  each(cb) {\n    this.nodes.forEach(cb);\n  }\n\n  html(arg) {\n    if (typeof arg === 'string') {\n      this.each(node => {\n        node.innerHTML = arg;\n      });\n    } else if (this.nodes.length > 0) {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(children) {\n    if (this.nodes.length === 0) {\n      return;\n    }\n\n    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {\n      // make sure it is a collection\n      children = $l(children);\n    }\n    if (typeof children === 'string') {\n      // strings gets pushed into the selected element(s)\n      this.each(node => (node.innerHTML += children));\n    } else if (children instanceof DOMNodeCollection) {\n      // if its an array of nodes we will take each node and append each child\n      this.each(node => {\n        children.each(child => {\n          node.appendChild(child);\n        });\n      });\n    }\n  }\n\n  attr(attr, val) {\n    if (typeof val === 'string') {\n      this.each(node => {\n        node.setAttribute(attr, val);\n      });\n    } else {\n      return this.nodes[0].getAttribute(attr);\n    }\n  }\n\n  addClass(name) {\n    this.each(node => {\n      node.classList.add(name);\n    });\n  }\n\n  removeClass(name) {\n    this.each(node => {\n      node.classList.remove(name);\n    });\n  }\n\n  children() {\n    let nodeList = [];\n    this.each(node => {\n      const childNodes = node.children;\n      nodeList = nodeList.concat(Array.from(childNodes));\n    });\n    return new DOMNodeCollection(nodeList);\n  }\n\n  parent() {\n    const parentNodes = [];\n    this.each(({ parentNode }) => {\n      parentNode.visited ? parentNodes.push(parentNode) : (parentNode.visited = true);\n    });\n    parentNodes.forEach(node => {\n      node.visited = false;\n    });\n    return new DOMNodeCollection(parentNodes);\n  }\n\n  find(arg) {\n    let nodes = [];\n    this.each(el => {\n      nodes.concat(Array.from(el.querySelectorAll(arg)));\n    });\n    return new DOMNodeCollection(nodes);\n  }\n\n  remove() {\n    this.each(node => node.parentNode.removeNode(node));\n  }\n\n  on(event, cb) {\n    this.each(node => {\n      node.addEventListener(event, cb);\n      const defineEvent = `eventName=${event}`;\n      if (typeof node[defineEvent] === 'undefined') {\n        node[defineEvent] = [];\n      }\n      node[defineEvent].push(cb);\n    });\n  }\n\n  off(event) {\n    this.each(node => {\n      const defineEvent = `eventName${event}`;\n      if (node[defineEvent]) {\n        node[defineEvent].forEach(cb => {\n          node.removeEventListener(defineEvent, cb);\n        });\n      }\n      node[defineEvent] = [];\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nwindow.$l = arg => {\n  if (arg instanceof HTMLElement) {\n    return new DOMNodeCollection([arg]);\n  }\n  if (typeof arg === 'string') {\n    let nodelist = document.querySelectorAll(arg);\n    nodelist = Array.from(nodelist);\n    return new DOMNodeCollection(nodelist);\n  }\n};\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
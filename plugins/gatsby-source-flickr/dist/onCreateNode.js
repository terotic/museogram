"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gatsbySourceFilesystem = require("gatsby-source-filesystem");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//URL format of: https://farm6.staticflickr.com/5443/30796948442_0bcb99a5ff_b.jpg"
function onCreateNode(_x) {
  return _onCreateNode.apply(this, arguments);
}

function _onCreateNode() {
  _onCreateNode = _asyncToGenerator(function* ({
    node,
    cache,
    actions,
    store,
    createNodeId
  }) {
    let fileNode;
    const createNode = actions.createNode;
    console.log(node);
    console.log('Creating node with type: ' + node.internal.type);

    if (node.internal.type === "FlickrContent") {
      const imageUrl = `https://farm${node.farm}.staticflickr.com/${node.server}/${node.photoId}_${node.secret}_b.jpg`;
      console.log('Creating node with URL: ' + imageUrl);

      try {
        fileNode = yield (0, _gatsbySourceFilesystem.createRemoteFileNode)({
          url: imageUrl,
          store,
          cache,
          createNode,
          createNodeId
        });
      } catch (e) {
        console.log("ERROR: ", e);
      }
    }

    if (fileNode) {
      node.localImage___NODE = fileNode.id;
    }
  });
  return _onCreateNode.apply(this, arguments);
}

var _default = onCreateNode;
exports.default = _default;
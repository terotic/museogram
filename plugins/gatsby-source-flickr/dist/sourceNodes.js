"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function sourceNodes(_x, _x2) {
  return _sourceNodes.apply(this, arguments);
}

function _sourceNodes() {
  _sourceNodes = _asyncToGenerator(function* ({
    actions,
    createNodeId,
    createContentDigest
  }, configOptions) {
    const createNode = actions.createNode;
    delete configOptions.plugins; // Helper function that processes a photo to match Gatsby's node structure

    const processPhoto = photo => {
      const nodeId = createNodeId(`flickr-photo-${photo.id}`);
      const nodeContent = JSON.stringify(photo);
      photo.photoId = photo.id;
      console.log(photo);
      const nodeData = Object.assign({}, photo, {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: `FlickrContent`,
          content: nodeContent,
          contentDigest: createContentDigest(photo)
        }
      });
      return nodeData;
    };

    const apiOptions = _queryString.default.stringify(configOptions);

    const apiUrl = `https://api.flickr.com/services/rest/?${apiOptions}&nojsoncallback=1`;
    return (// Fetch a response from the apiUrl
      (0, _nodeFetch.default)(apiUrl) // Parse the response as JSON
      .then(response => response.json()) // Process the JSON data into a node
      .then(data => {
        // For each query result (or 'hit')
        data.photoset.photo.forEach(photo => {
          // Process the photo data to match the structure of a Gatsby node
          const nodeData = processPhoto(photo); // Use Gatsby's createNode helper to create a node from the node data

          console.log("boo");
          createNode(nodeData);
        });
      })
    );
  });
  return _sourceNodes.apply(this, arguments);
}

var _default = sourceNodes;
exports.default = _default;
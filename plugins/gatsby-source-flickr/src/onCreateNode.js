import {createRemoteFileNode} from "gatsby-source-filesystem"

//URL format of: https://farm6.staticflickr.com/5443/30796948442_0bcb99a5ff_b.jpg"

async function onCreateNode({ node, cache, actions, store, createNodeId }) {
  let fileNode
  const { createNode } = actions
  console.log(node)
  console.log('Creating node with type: ' + node.internal.type)
  if (node.internal.type === "FlickrContent") {
    const imageUrl = `https://farm${node.farm}.staticflickr.com/${node.server}/${node.photoId}_${node.secret}_b.jpg`
    console.log('Creating node with URL: ' + imageUrl)
    try {
      fileNode = await createRemoteFileNode({
        url: imageUrl,
        store,
        cache,
        createNode,
        createNodeId
      })
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }
    if (fileNode) {
      node.localImage___NODE = fileNode.id
    }
}

export default onCreateNode

import fetch from "node-fetch"
import queryString from "query-string"

async function sourceNodes({
  actions,
  createNodeId,
  createContentDigest
}, configOptions){
  const {
    createNode
  } = actions

  delete configOptions.plugins

  // Helper function that processes a photo to match Gatsby's node structure
  const processPhoto = photo => {
    const nodeId = createNodeId(`flickr-photo-${photo.id}`)
    const nodeContent = JSON.stringify(photo)
    photo.photoId = photo.id;
    console.log(photo);
    const nodeData = Object.assign({}, photo, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `FlickrContent`,
        content: nodeContent,
        contentDigest: createContentDigest(photo),
      },
    })

    return nodeData
  }

  const apiOptions = queryString.stringify(configOptions)
  const apiUrl = `https://api.flickr.com/services/rest/?${apiOptions}&nojsoncallback=1`

  return (
    // Fetch a response from the apiUrl
    fetch(apiUrl)
      // Parse the response as JSON
      .then(response => response.json())
      // Process the JSON data into a node
      .then(data => {
        // For each query result (or 'hit')
        data.photoset.photo.forEach(photo => {
          // Process the photo data to match the structure of a Gatsby node
          const nodeData = processPhoto(photo)
          // Use Gatsby's createNode helper to create a node from the node data
          console.log("boo");
          createNode(nodeData)
        })
      })
  )
}

export default sourceNodes

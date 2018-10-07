import * as PropTypes from "prop-types"
import React from "react"
import { graphql } from "gatsby"
import PhotoDetail from "../components/PhotoDetail"
import EditLayout from "../components/Layout-edit"

class EditImage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      flickrContent: PropTypes.object.isRequired,
    }),
  }
  render() {
    let isModal = false
    // We don't want to show the modal if a user navigates
    // directly to a post so if this code is running on Gatsby's
    // initial render then we don't show the modal, otherwise we
    // do.
    if (
      typeof window !== `undefined` &&
      window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE
    ) {
      isModal = true
    }
    return (
      <EditLayout location={this.props.location} isModal={isModal}>
        <PhotoDetail post={this.props.data.flickrContent} />
      </EditLayout>
    )
  }
}

export default EditImage

// The post template's GraphQL query. Notice the “id”
// variable which is passed in. We set this on the page
// context in gatsby-node.js.
//
// All GraphQL queries in Gatsby are run at build-time and
// loaded as plain JSON files so have minimal client cost.
export const pageQuery = graphql`
  query($id: String!) {
    # Select the post which equals this id.
    flickrContent(id: { eq: $id }) {
      ...PostDetail_details
    }
  }
`

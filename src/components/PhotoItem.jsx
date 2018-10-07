import * as PropTypes from "prop-types"
import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const PhotoLink = styled(Link)`
  display: block;
  flex: 0 0 auto;
  margin-right: 12px;
  width: 100%;
  max-width: 290.1px;
  position: relative;
  &:last-child {
    marginRight: 0;
  }
`

const PhotoWrap = styled.div`
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
`

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

let touched = false

class PhotoItem extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      smallImage: PropTypes.object,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }
  constructor() {
    super()
    this.state = {
      hovering: false,
    }
  }

  render() {
    const { smallImage, id } = this.props.post
    const { small } = smallImage.childImageSharp
    return (
      <PhotoLink
        data-testid="post"
        to={`/${id}/`}
        onTouchStart={() => (touched = true)}
        onMouseEnter={() => {
          if (!touched) {
            this.setState({ hovering: true })
          }
        }}
        onMouseLeave={() => {
          if (!touched) {
            this.setState({ hovering: false })
          }
        }}
      >
        <PhotoWrap>
          <Img
            fluid={{ ...small }}
          />
      </PhotoWrap>
        {/* overlay */}
        {!this.state.hovering && (
          <HoverOverlay
            data-testid="likes"
          >
        </HoverOverlay>
        )}
      </PhotoLink>
    )
  }
}

export default PhotoItem

export const postFragment = graphql`
  fragment Post_details on FlickrContent {
    id
    photoId
    smallImage: localImage {
      childImageSharp {
        small: fluid(
            maxWidth: 280,
            maxHeight: 510,
            duotone: {
              highlight: "#ffff99",
              shadow: "#192576"
            }
          ) {
          src
          srcSet
          aspectRatio
          sizes
          tracedSVG
        }
      }
    }
  }
`

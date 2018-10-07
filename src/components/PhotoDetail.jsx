import { Link as GatsbyLink } from 'gatsby';
import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Close } from 'rebass';

import VtmLogo from "../../assets/vtm-logo.svg"

const FullScreenImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  .gatsby-image-wrapper{
      height: 100%;
  }
`

const BigClose = styled(Close)`
  color: white;
  width: 100px;
  height: 100px;
  font-size: 5em;
`

const CloseButton = styled.div`
  position: absolute;
  right: 12px;
  top: 10px;
  color: white;
  width: 100px;
  height: 100px;
  font-size: 42px;
  text-align: right;
  line-height: 42px;
  a{
    color: white;
    text-decoration: none;
  }
`

const TextOverlay = styled.div`
  position: absolute;
  bottom: 60px;
  left: 12px;
  font-size: 3em;
  line-height: 0.85;
  font-weight: Bold;
`

const MuseumLogoPlacer = styled.div`
  position: absolute;
  width: 80px;
  height: 100px;
  top: 72px;
  left: 12px;
  font-size: 1em;
  line-height: 0.85;
  font-weight: Bold;
  text-align: center;
`

const MuseumLogo = styled(VtmLogo)`
  width: 100%;
  fill: #ffffff;
`

class PhotoDetail extends React.Component {
  render() {
    const {
      bigImage,
      id
    } = this.props.post

    const { big } = bigImage.childImageSharp

    const ToolBar = () => (
      <div>
        Colorize
      </div>
    )

    return (
      <div onClick={e => e.stopPropagation()}  >
        <div to={`/${id}/`}>
          <FullScreenImage>
            <Img
              fluid={{ ...big }}
            />
          <CloseButton><GatsbyLink to="/">&times;</GatsbyLink></CloseButton>
          <TextOverlay contentEditable>
            Your Text Here
          </TextOverlay>
          <MuseumLogoPlacer>&times;<br/><br/><MuseumLogo /></MuseumLogoPlacer>
          </FullScreenImage>
        </div>
        <div>
          <ToolBar />
        </div>
      </div>
    )
  }
}

export default PhotoDetail

export const postDetailFragment = graphql`
  fragment PostDetail_details on FlickrContent {
    # Specify the fields from the post we need.
    id
    photoId
    bigImage: localImage {
      childImageSharp {
        # Here we query for *multiple* image thumbnails to be
        # created. So with no effort on our part, 100s of
        # thumbnails are created. This makes iterating on
        # designs effortless as we change the args
        # for the query and we get new thumbnails.
        big: fluid(maxWidth: 540, maxHeight: 960) {
          src
          srcSet
        }
      }
    }
  }
`

import { Link as GatsbyLink } from 'gatsby';
import React, {Component} from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Close, Button, Fixed, Modal, Text, Box, Heading, Absolute } from 'rebass';

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

const Tools = styled(Fixed)`
  bottom: 12px;
  right: 12px;
`

const UIButton = styled(Button)`
  color: #ffffff;
  background-color: rgba(0,0,0,0.33);
  &:hover {
    color: #eeee33;
  }
`

const MuseumLogo = styled(VtmLogo)`
  width: 100%;
  fill: #ffffff;
`

class PhotoDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {sharing: false};
    this.handleShare = this.handleShare.bind(this);
  }

  handleShare() {
    this.setState(prevState => ({
      sharing: !prevState.sharing
    }));
  }

  render() {
    const {
      bigImage,
      duotoneImage,
      id
    } = this.props.post

    const { big } = bigImage.childImageSharp
    const { colored } = duotoneImage.childImageSharp

    const ToolBar = () => (
      <Tools>
        <UIButton>Original</UIButton>
        <UIButton>Duotone</UIButton>
        <UIButton>Colored</UIButton>
        |
        <UIButton onClick={this.handleShare}>Share!</UIButton>
      </Tools>
    )

    return (
      <div onClick={e => e.stopPropagation()}  >
        <div to={`/${id}/`}>
          <FullScreenImage>
            <Img
              fluid={{ ...colored }}
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
        <div>
        {this.state.sharing && (
          <div>
            <Fixed
              top={0}
              right={0}
              bottom={0}
              left={0}
            />
            <Modal width={256}>
              <Box p={2}>
                <Absolute top={1} right={1}><Close onClick={this.handleShare}/></Absolute>
                <Heading textAlign="center" lineHeight="0.2" fontSize={6}>🤷</Heading>
                <Text>Sorry! Sharing doesn't work yet, but you can download the image using your device download image feature.</Text>
              </Box>
            </Modal>
          </div>
        )}
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
    duotoneImage: localImage {
      childImageSharp {
        # Here we query for *multiple* image thumbnails to be
        # created. So with no effort on our part, 100s of
        # thumbnails are created. This makes iterating on
        # designs effortless as we change the args
        # for the query and we get new thumbnails.
        colored: fluid(duotone: { highlight: "#7bcbca", shadow: "#890b0b" }, maxWidth: 540, maxHeight: 960) {
          src
          srcSet
        }
      }
    }
  }
`

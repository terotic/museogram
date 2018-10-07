import * as PropTypes from "prop-types"
import { graphql } from 'gatsby';
import React from 'react';
import { Container, Heading, Link, Text, Flex, Box, Lead, Subhead } from 'rebass';
import Layout from '../components/Layout';
import PhotoItem from '../components/PhotoItem'
import styled from "styled-components"

const Gallery = styled(Flex)`
  height: 100%;
  border-top: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  padding: 24px 0;
  overflow-x: auto;
`
const BlurbTitle = styled.h3`
  text-align: center;
`
const TextLink = styled(Link)`
  color: #ffffff;
  text-decoration: underline;
`

class IndexPage extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
      allFlickrContent: PropTypes.object,
    }),
  }

  constructor() {
    super()
    let postsToShow = 12
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }

    this.state = {
      showingMore: postsToShow > 12,
      postsToShow,
    }
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 12 })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  render() {
    let { allFlickrContent, user } = this.props.data

    return (
      <Layout location={this.props.location}>
        <Container>
          <Box p={3}>
            <BlurbTitle>Archive photos for your stories</BlurbTitle>
            <Lead is="p" textAlign='center'>Choose photographs from our selected free collection and mix your own stories for Instagram, Facebook or Snapchat.</Lead>
            <Lead is="p" textAlign='center'>This application is a demo so the image editing features are for demonstration purposes only. Nevertheless you are very welcome to use and share the photos in your stories!</Lead>
          </Box>
          <Box p={3}>
            <BlurbTitle>Work</BlurbTitle>
            <Lead is="p" textAlign='center'>Is your work different now than the work in these photographs from Central Union of Consumer Co-operatives collection? Collected by the <TextLink href='https://www.flickr.com/photos/valokuvataiteenmuseo/albums/72157676384900235' children="Finnish Museum of Photography" color="white"/></Lead>
          </Box>
          <Gallery justify='left' flexWrap='nowrap' w={1}>

          {
              this.props.data.allFlickrContent.edges.map((item, i) => {
                  return (
                      item.node.id? <PhotoItem key={item.node.id} post={item.node} onClick={post => this.setState({ activePost: post })}/> : <div>X</div>
                  )
              })
          }

        </Gallery>
        </Container>
      </Layout>
    );
  };
};

export default IndexPage;

export const storyThumbnail = graphql`
fragment storyThumbnail on File {
  childImageSharp {
    fluid(
      maxWidth: 540,
      maxHeight: 960,
      duotone: {
        highlight: "#f00e2e",
        shadow: "#192550"
      }
    ) {
      ...GatsbyImageSharpFluid
    }
  }
}
`;

export const storyThumbnailBw = graphql`
fragment storyThumbnailBw on File {
  childImageSharp {
    fluid(
      maxWidth: 500,
      maxHeight: 500
    ) {
      ...GatsbyImageSharpFluid
    }
  }
}
`;

export const query = graphql`
query PhotoQuery {
  allFlickrContent {
    edges {
      node {
        id
        photoId
        secret
        server
        farm
        ...Post_details
        ...PostDetail_details
      }
    }
  }
}
`

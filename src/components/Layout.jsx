import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Box, Flex, Heading, Provider as RebassProvider, Text, Small , Link} from 'rebass';
import { injectGlobal } from 'styled-components';
import styled from "styled-components"
import Img from "gatsby-image"
import Footer from './Footer';
import Header from './Header';

const TextLink = styled(Link)`
  color: #ffffff;
  text-decoration: underline;
`

let Modal
import(`../components/modal`).then(modal => {
  Modal = modal.default
})

let windowWidth

injectGlobal`
  body {
    margin: 0;
    text-size-adjust: 100%;
    background-color: #1a1a1a;
    color: #ffffff;
  }
`;

class Layout extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    isModal: PropTypes.bool,
  }

  render() {

    const { location } = this.props
    let isModal = false
    if (this.props.isModal) {
      isModal = true
    }

    if (isModal && Modal) {
      return (
        <React.Fragment>
          <PageRenderer location={{ pathname: `/` }} />
          <Modal isOpen={true} location={location}>
            {this.props.children}
          </Modal>
        </React.Fragment>
      )
    }

  return (
  <RebassProvider is={Flex} flexDirection="column" css={{ minHeight: '100vh' }}>
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              language
            }
          }
        }
      `}
      render={data => (
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
        >
          <html lang={data.site.siteMetadata.language} />
        </Helmet>
      )}
    />

  <Header brand={<Heading>Museogram</Heading>} />

    <Box is="main" flex={1}>
      {this.props.children}
    </Box>

    <Footer>
      <Flex justifyContent="space-around">
        <Box mt={6} mb={2} width={1/2}>
          <Text is="p" align="center"><Small align="center">Museogram was created at  <TextLink href='https://hack4.fi' children="hack4.fi" color="white"/> 2018 using open photographs made public by the <TextLink href='https://www.valokuvataiteenmuseo.fi/' children="The Finnish Museum of Photography" color="white"/>.</Small></Text>
        </Box>
      </Flex>
    </Footer>
  </RebassProvider>
);
}
}

export default Layout;

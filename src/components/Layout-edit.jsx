import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Box, Flex, Heading, Provider as RebassProvider, Text, Small } from 'rebass';
import { injectGlobal } from 'styled-components';
import Footer from './Footer';
import Header from './Header';

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

class EditLayout extends React.Component {
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

    <Box is="main" flex={1}>
      {this.props.children}
    </Box>

  </RebassProvider>
);
}
}

export default EditLayout;

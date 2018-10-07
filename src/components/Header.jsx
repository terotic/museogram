import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Box, Container, NavLink, Flex, Subhead } from 'rebass';
import styled from "styled-components"

const SiteLogo = styled(NavLink)`
  color: white;
`

const BrandBox = styled(Flex)`
  height: 200px;
`

const Header = ({ brand, ...props }) => (
  <Box is="header" color="white" {...props}>
    <Container>
      <BrandBox alignItems="center" justifyContent="center">
        <SiteLogo is={GatsbyLink} to="/" px={0} my={3}>
          {brand}
        </SiteLogo>
      </BrandBox>
    </Container>
  </Box>
);

Header.propTypes = {
  brand: PropTypes.node.isRequired,
};

export default Header;

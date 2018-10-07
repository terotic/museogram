import React from "react"
import Modal from "react-modal"
import findIndex from "lodash/findIndex"
import * as PropTypes from "prop-types"
import { push, StaticQuery } from "gatsby"

import { Close } from 'rebass';

let posts

Modal.setAppElement(`#___gatsby`)

class MuseogramModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    location: PropTypes.object.isRequired,
  }

  findCurrentIndex() {
    let index
    index = findIndex(
      posts,
      post => post.id === this.props.location.pathname.split(`/`)[1]
    )

    return index
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allFlickrContent {
              edges {
                node {
                  id
                }
              }
            }
          }
        `}
        render={data => {
          if (!posts) {
            posts = data.allFlickrContent.edges.map(e => e.node)
          }
          return (
            <Modal
              isOpen={this.props.isOpen}
              onRequestClose={() => push(`/`)}
              style={{
                overlay: {
                  position: `fixed`,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: `rgba(0, 0, 0, 0.75)`,
                },
                content: {
                  position: `absolute`,
                  border: `none`,
                  background: `none`,
                  padding: 0,
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  overflow: `auto`,
                  WebkitOverflowScrolling: `touch`,
                },
              }}
              contentLabel="Modal"
            >
              <div
                onClick={() => push(`/`)}
                css={{
                  display: `flex`,
                  position: `relative`,
                  height: `100vh`,
                }}
              >
                <div
                  css={{
                    display: `flex`,
                    alignItems: `center`,
                    justifyItems: `center`,
                    maxWidth: rhythm(40.25), // Gets it right around Instagram's maxWidth.
                    margin: `auto`,
                    width: `100%`,
                  }}
                >

                </div>
                <Close
                  data-testid="modal-close"
                  onClick={() => push(`/`)}
                />
              </div>
            </Modal>
          )
        }}
      />
    )
  }
}

export default MuseogramModal

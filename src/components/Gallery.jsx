import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

const Container = styled('div')`
    margin: 20px;
`
const Thumb = styled('div')`
    max-width: 400px;
    padding: 12px;
`

export default ({posts}) => (
    <Container className='grid'>
        {
            posts.edges.map((item, i) => {
                return (
                    item.node.localImage? <Thumb><Image fluid={item.node.originalImage.childImageSharp.fluid} key={i} /></Thumb> : <div></div>
                )
            })
        }
    </Container>
)

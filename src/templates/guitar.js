import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image } from "./templateStyles/guitarStyles"

const GuitarTemplate = ({
  data: {
    wpcontent: {
      guitar: {
        guitar,
        roles: { edges: roles },
      },
    },
  },
}) => {
    const { picture1, picture2, picture3 } = guitar.pictures
    const pictures = [picture1, picture2, picture3]

  return (
    <Layout>
      <SEO title="Guitar" />
      <Wrapper>
        <div className="guitar-container">
          <div className="guitar-image">
            <Image
              fluid={guitar.headerpicture.imageFile.childImageSharp.fluid}
              alt={guitar.headerpicture.altText}
            />
            <div className="roles">
              {roles.map(({ node: role }) => (
                <div key={role.name} className="role">
                  {role.name}
                </div>
              ))}
            </div>
          </div>
          <div className="guitar-info">
            <h2>
              {guitar.model}
            </h2>
            <h3>
                {guitar.brand}
            </h3>
            <p className="description">{guitar.description}</p>
            <p className="info">
                <strong>Key Features: </strong>
                {guitar.keyFeatures}
            </p>
            <p className="info">
                <strong>Price:</strong> €{guitar.priceRange}
            </p>
          </div>
        </div>
        <div className="guitar-pictures">
          {pictures.map((picture, i) => (
            <div key={i} className="guitar-picture">
              <Image
                fluid={picture.imageFile.childImageSharp.fluid}
                alt={picture.altText}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default GuitarTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
        guitar(id: $id, idType: ID) {
        roles {
          edges {
            node {
              name
            }
          }
        }
        guitar {
          brand
          model
          description
          priceRange
          keyFeatures
          headerpicture {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 60) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }pictures {
            picture3 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 50) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
            picture2 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 50) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
            picture1 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 50) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
          }
          id
        }
      }
    }
`
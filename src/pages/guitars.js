import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Guitar} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"

const GuitarsPage = () => {
  const {
    wpcontent: {
      page: {
        guitarsMeta: { guitarsPageDescription, guitarsPageBannerPicture },
      },
      guitars: { edges: guitars },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "guitars", idType: URI) {
          guitarsMeta {
            guitarsPageDescription
            guitarsPageBannerPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        guitars {
          edges {
            node {
              guitar {
                model
                brand
                headerpicture {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(quality: 50, grayscale: true) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Guitars" />
      <Wrapper guitarsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={guitarsPageBannerPicture.imageFile.childImageSharp.fluid}
            alt={guitarsPageBannerPicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are DC Guitars</h2>
          <p>{guitarsPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="guitars">
          <h2>Our Guitars</h2>
          <div className="guitar-items">
            {guitars.map(({ node: { guitar, slug } }) => (
              <Guitar to={`/${slug}`} key={slug}>
                <Image
                  fluid={guitar.headerpicture.imageFile.childImageSharp.fluid}
                  alt={guitar.headerpicture.altText}
                />
                <div className="guitar-info">
                  <p>
                    {guitar.brand}
                  </p>
                  <p>
                    {guitar.model}</p>
                </div>
              </Guitar>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default GuitarsPage
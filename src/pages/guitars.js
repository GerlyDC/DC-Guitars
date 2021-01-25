import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Wrapper, Image, BottomEdgeDownLeft, BottomEdgeDownRight, BottomEdgeUpRight, BottomEdgeUpLeft, Guitar} from "../pageStyles/pageStyles"
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
                  fluid(quality: 75) {
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
                      fluid(quality: 50) {
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
      <Wrapper guitarsColor={COLORS.BLACK} descriptionColor={COLORS.PRIMARY}>
        <div className="banner">
          <Image
            fluid={guitarsPageBannerPicture.imageFile.childImageSharp.fluid}
            alt={guitarsPageBannerPicture.altText}
          />
          <BottomEdgeDownLeft color={COLORS.BLACK}/><BottomEdgeDownRight color={COLORS.BLACK}/>
          </div>
        <div className="description">
          <br/>
          <br/>
          <h2>We are DC Guitars</h2>
          <p>{guitarsPageDescription}</p>
          <BottomEdgeUpLeft color={COLORS.TERTIARY}/><BottomEdgeUpRight color={COLORS.TERTIARY}/>
          <BottomEdgeDownLeft color={COLORS.TERTIARY}/><BottomEdgeDownRight color={COLORS.TERTIARY}/>
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
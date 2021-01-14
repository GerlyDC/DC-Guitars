import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper,Image, BottomEdgeDown, Guitar} from '../pageStyles/pageStyles'
import {COLORS} from '../constants'

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageDescription,
          homePageTitle,
          homePageBannerPicture,
          homePageFeaturedGuitars,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homeMeta {
            homePageDescription
            homePageTitle
            homePageBannerPicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            homePageFeaturedGuitars {
              ... on WPGraphql_Guitar {
                slug
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
              }
            }
          }
        }
      }
    }
  `)

  return(
    <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image 
          fluid={homePageBannerPicture.imageFile.childImageSharp.fluid} 
          alt={homePageBannerPicture.altText}/>
          <div className="inner-div">
            <p className="header-title">{homePageTitle}</p>
            <p className="heder-description">{homePageDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK}/>
      </div>
       <div className="guitars">
          <h2>Featured Guitars</h2>
          <div className="guitar-items">
            {homePageFeaturedGuitars.map(({guitar, slug}) => (
              <Guitar key={slug} to={`/${slug}`}>
                <Image
                  fluid={guitar.headerpicture.imageFile.childImageSharp.fluid}
                  alt={guitar.headerpicture.altText}
                />
                <div className="guitar-info">
                  <p>
                    {guitar.brand}
                  </p>
                  <p>{guitar.model}</p>
                </div>
              </Guitar>
            ))}
          </div>
      </div>
    </Wrapper>
  </Layout>
  )
}

export default IndexPage

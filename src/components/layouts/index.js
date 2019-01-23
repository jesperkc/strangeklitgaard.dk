//import './index.css';
import { css, Global } from "@emotion/core";
import { graphql, StaticQuery } from "gatsby";
import React from 'react';
import Helmet from 'react-helmet';

/*

https://www.linkedin.com/post-inspector/
https://cards-dev.twitter.com/validator

*/

const seo = {
  title: 'Jesper Strange Klitgaard Christiansen - Freelance frontend developer',
  description: 'Freelance frontend udvikler med 20+ års erfaring. Mit fokus ligger i arbejdet med HTML, CSS og JavaScript. React, Gatsby, LESS/SCSS.',
  url: 'http://www.strangeklitgaard.dk',
  siteName: 'Strange Klitgaard',
  social: {
    image: 'http://www.strangeklitgaard.dk/images/social.png',
    twitter: {
      user: '@jesperkc',
      title: 'Freelance frontend udvikler',
    }
  }
}

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
       query LayoutQuery {
         site {
           siteMetadata {
             title
           }
         }
       }
     `}
    render={data => (
      <>
        <Helmet>

          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="author" content="Jesper Strange Klitgaard Christiansen"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
          <meta name="robots" content="index, follow"/>
          <meta name="image" content={seo.social.image} />

          <meta property="og:url" content={seo.url} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:site_name" content={seo.siteName}/>
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.social.image} />
          <meta property="og:type" content="profile"/>
          <meta property="og:locale" content="profile"/>
          
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:creator" content={seo.social.twitter.user}/>
          <meta name="twitter:site" content={seo.social.twitter.user}/>
          <meta name="twitter:title" content={seo.social.twitter.title}/>
          <meta name="twitter:description" content={seo.description}/>
          <meta name="twitter:image" content={seo.social.image}/>
          <meta name="twitter:url" content={seo.url}/>
          
        </Helmet>
        <Global
          styles={css`
            @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,900');
            html, body, #root {
              width: 100%;
              height: 100%;
              padding: 0;
              margin: 0; 
              font-family: 'Source Sans Pro', sans-serif;
              line-height: 1.8;
              background-color: #f7f3f0;
            }
            * {
              box-sizing: border-box;
            }
            *:before {
              box-sizing: border-box;
            }
            *:after {
              box-sizing: border-box;
            }
          `}
        />
        <div>
          {children}
        </div>
      </>
    )}
  />
)

export default Layout

// export const query = graphql`
//   query SiteTitleQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `





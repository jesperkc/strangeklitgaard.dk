//import './index.css';
import { css, Global } from "@emotion/core";
import { graphql, StaticQuery } from "gatsby";
import React from 'react';
import Helmet from 'react-helmet';



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
        <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title} />

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





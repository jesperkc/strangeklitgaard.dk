//import './index.css';
import { css, Global } from "@emotion/core";
import React from 'react';
import Helmet from 'react-helmet';
import CursorHandlerComponent from '../cursor/cursor.component';
import { responsiveFont, settings } from "../grid/settings";


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

class CursorLayout extends React.Component {

  constructor() {
    super();

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  componentDidMount() {
    this.addEventListeners();
  }
  componentWillUnmount() {
    this.removeEventListeners();
  }
  addEventListeners() {
    document.querySelectorAll('[data-cursor]')
      .forEach(input => { input.addEventListener('mouseover', this.mouseEnter); input.addEventListener('mouseout', this.mouseLeave) });
  }
  removeEventListeners() {
    document.querySelectorAll('[data-cursor]')
      .forEach(input => { input.removeEventListener('mouseover', this.mouseEnter); input.removeEventListener('mouseout', this.mouseLeave) });
  }

  mouseEnter(el) {
    if (el.target.dataset.cursor) {
      console.log('mouseEnter', el.target.dataset.cursor);
    }
  }
  mouseLeave(el) {
    //console.log('mouseLeave', el.target);
  }
  render() {
    return (
      <>
        <CursorHandlerComponent />
        <Helmet>

          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="author" content="Jesper Strange Klitgaard Christiansen" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
          <meta name="robots" content="index, follow" />
          <meta name="image" content={seo.social.image} />

          <meta property="og:url" content={seo.url} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:site_name" content={seo.siteName} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.social.image} />
          <meta property="og:type" content="profile" />
          <meta property="og:locale" content="profile" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={seo.social.twitter.user} />
          <meta name="twitter:site" content={seo.social.twitter.user} />
          <meta name="twitter:title" content={seo.social.twitter.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.social.image} />
          <meta name="twitter:url" content={seo.url} />

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

            h1{
              margin-top: 0;
              ${responsiveFont(settings.typo.h1)};
            }
            h2{
              margin-top: 0;
              ${responsiveFont(settings.typo.h2)};
            }
            h3{
              margin-top: 0;
              ${responsiveFont(settings.typo.h3)};
            }
            h4{
              margin-top: 0;
              ${responsiveFont(settings.typo.h4)};
            }
            h5{
              margin-top: 0;
              ${responsiveFont(settings.typo.h5)};
            }
            h6{
              margin-top: 0;
              ${responsiveFont(settings.typo.h6)};
            }
            p{
              ${responsiveFont(settings.typo.p)};
            }
            input{
              ${responsiveFont(settings.typo.input)};
              padding: .5rem;
            }
            input[type=checkbox] {
              transform: scale(1.5);
            }
          `}
        />
        <div>
          {this.props.children}
        </div>
      </>
    )
  }
};

export default CursorLayout

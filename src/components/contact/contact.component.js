import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from 'react';
import Style from '../../style/style';
import Grid from '../grid/grid.component';

const Contact = ({ say }) => (
  <ContactWrapper>
    <Grid.Container css={container_css}>
      <Grid.Row>
        <Grid.Cell>
          <Style.OnVisibleText css={visible_css}>
            <Huge>{say}</Huge>
            <br />
            <div><Style.a href="mailto:jesper@strangeklitgaard.dk" target="_blank">jesper@strangeklitgaard.dk</Style.a></div>
            <br />
            <div><Style.a href="http://www.twitter.com/jesperkc" target="_blank">Twitter</Style.a></div>
            <div><Style.a href="http://www.codepen.io/jesperkc" target="_blank">CodePen</Style.a></div>
            <div><Style.a href="http://www.linkedin.com/in/jesperkc" target="_blank">LinkedIn</Style.a></div>
            <div><Style.a href="http://www.behance.com/jesperkc" target="_blank">Behance</Style.a></div>
            <div><Style.a href="http://www.dribbble.com/jesperkc" target="_blank">Dribbble</Style.a></div>
          </Style.OnVisibleText>
        </Grid.Cell>
      </Grid.Row>
    </Grid.Container>
  </ContactWrapper>
)


export const Huge = styled('div')`
  font-weight: 900;
  margin-left: -10px;
  line-height: .8;
  margin-bottom: 40px;
  letter-spacing: -5px;
  /* text-transform: uppercase; */

  @media (orientation: portrait){
    font-size: 27vw;
    @media (min-width: 550px){
      font-size: 13vw;
    }
  }
  @media (orientation: landscape){
    font-size: 27vh;
    @media (min-height: 400px){
      font-size: 13vw;
    }
  }
`;

const ContactWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip: rect(0, auto, auto, 0);
  clip-path: inset(0, auto, auto, 0);
`;

const visible_css = css`
  width: 60vw;
`;

const container_css = css`
  position: fixed;
  z-index: 1;
  top: 0;
  transform: translate3d(0,0,0);
`;

export default Contact;
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from 'react';
import Style from '../../style/style';
import Grid from '../grid/grid.component';
import { Huge } from '../hero/hero.component';

const Contact = ({ say }) => (
  <ContactWrapper>
    <Grid.Container css={container_css}>
      <Grid.Row>
        <Grid.Cell>
          <Style.OnVisibleText css={visible_css}>
            <Huge>{say}</Huge>
            <br />
            <div><Style.a href="mailto:jesper@strangeklitgaard.dk" target="_blank">jesper@strangeklitgaard.dk</Style.a></div>
            <div>+45 51 64 90 80</div>
            <br />
            <div><Style.a href="http://www.codepen.io/jesperkc" target="_blank">CodePen</Style.a></div>
            <div><Style.a href="http://www.behance.com/jesperkc" target="_blank">Behance</Style.a></div>
            <div><Style.a href="http://www.dribbble.com/jesperkc" target="_blank">Dribbble</Style.a></div>
            <div><Style.a href="http://www.linkedin.com/in/jesperkc" target="_blank">LinkedIn</Style.a></div>
            <div><Style.a href="http://www.twitter.com/jesperkc" target="_blank">Twitter</Style.a></div>
          </Style.OnVisibleText>
        </Grid.Cell>
      </Grid.Row>
    </Grid.Container>
  </ContactWrapper>
)


const ContactWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip: rect(0, auto, auto, 0);
`;

const visible_css = css`
  width: 60vw;
`;

const container_css = css`
  position: fixed;
  top: 0;
  
`;

export default Contact;
import styled from "@emotion/styled";
import React from 'react';
import Slider from 'react-over-scroll';
import Grid from '../grid/grid.component';


const Contact1 = ({ progress }) => (
  <Grid.Container progress={progress}>
    <div><a href="mailto:jesper@strangeklitgaard.dk" target="_blank">jesper@strangeklitgaard.dk</a></div>
    <div>+45 51 64 90 80</div>
    <div><a href="http://www.linkedin.com/in/jesperkc" target="_blank">linkedin.com/in/jesperkc</a></div>
    <div><a href="http://www.twitter.com/jesperkc" target="_blank">twitter.com/jesperkc</a></div>
  </Grid.Container>
)
const renderPages2 = (page, progress, prefix) => {
  const Content = typeof pages[page] === 'function' ? pages[page] : pages[pages.length - 1]
  return (
    <div>
      <div>
        <Content progress={progress} />
      </div>
      <footer>
        <div>{page + 1} / {pages.length}</div>
        <div
          style={{ width: `${progress}%` }}></div>
      </footer>
    </div>
  )
}

const pages = [Contact1]
const Contact = () => (
  <Slider factor={0.1} slides={pages.length}
    children={renderPages2}>
  </Slider>
)

const Huge = styled('div')`
  font-weight: 900;
  margin-left: -10px;
  line-height: .6;
  letter-spacing: -5px;
  /* font-style: italic; */

  @media (orientation: portrait){
    font-size: 14vw;
    @media (min-width: 550px){
      font-size: 80px;
    }
  }
  @media (orientation: landscape){
    font-size: 14vh;
    @media (min-height: 400px){
      font-size: 80px;
    }
  }
`;



export default Contact;
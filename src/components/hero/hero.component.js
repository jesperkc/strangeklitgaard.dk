import styled from "@emotion/styled";
import React from 'react';
import ScrollPercentage from 'react-scroll-percentage';
import Style from '../../style/style';
import Grid from '../grid/grid.component';
import Hi from './hi.component';

class Hero extends React.Component {

  constructor() {
    super();

    this.state = {
      normalClassName: '',
      offset: 0
    };

    this.scrollChange = this.scrollChange.bind(this);
  }

  scrollChange(percentage, inView) {
    // console.log(percentage, inView);
    this.setState({ offset: percentage - .5 });

    // if (percentage < .51) {
    //   this.setState({ normalClassName: '' });
    // } else {
    //   this.setState({ normalClassName: 'hidden' });
    // }
  }
  render() {

    return (
      <ScrollPercentage onChange={this.scrollChange} style={{ width: '100%' }}>
        {(percentage, inView) => (

          <Grid.Container>
            <Grid.Row>
              <Grid.Cell>
                <HeroWrapper>
                  {/* <Huge>HEJ</Huge>
          <Normal>Jeg er en freelance <br />
            front-end udvikler <br />
            med en passion for <br />
            god UX gennem god UI
          </Normal> */}
                  <Hi offset={this.state.offset} />
                  <Style.OnVisibleText offset={3} className={this.state.normalClassName}>
                    <Normal className={this.state.normalClassName}>I’m a front-end developer </Normal>
                    <Normal className={this.state.normalClassName}>with a passion for </Normal>
                    <Normal className={this.state.normalClassName}>great UX through great UI</Normal>
                  </Style.OnVisibleText>
                </HeroWrapper>
              </Grid.Cell>
            </Grid.Row>
          </Grid.Container>
        )}
      </ScrollPercentage>
    )
  }
}


const HeroWrapper = styled('div')`
  font-size: 2.3vw;
  letter-spacing: 5px;
  padding: 0 10vw;
  position: relative;
`;
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
const Normal = styled('div')`
  font-size: 16px;
  br {
    display: none;
  }
  text-transform: uppercase;

  @media (orientation: portrait){
    @media (min-width: 550px){
      font-size: 20px;
    }
    @media (min-height: 400px){
      br {
        display: initial;
      }
    }
  }
  @media (orientation: landscape){
    @media (min-width: 550px){
      br {
        display: initial;
      }
    }
    @media (min-height: 400px){
      font-size: 20px;
    }
  }

  opacity: ${props => props.css_hide ? 0 : 1};
`;



export default Hero;
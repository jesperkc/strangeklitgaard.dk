
import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import React from 'react';
import DeckComponent, { DeckWrapper } from './deck.component';

class DeckBestseller extends DeckComponent {

  constructor() {
    super();

    this.decks = [
      {
        name: 'BESTSELLER 7.75"',
        texture: '/skateboard-website/_0006_robotron-bestseller-775.jpg'
      },
      {
        name: 'BESTSELLER 8.1"',
        texture: '/skateboard-website/_0007_robotron-bestseller-81.jpg'
      },
      {
        name: 'BESTSELLER 8.3"',
        texture: '/skateboard-website/_0000_robotron-bestseller-83.jpg'
      }
    ];

    this.state.activeDeck = 1;
  }

  render() {

    return (
      <div>
        <DeckWrapper scrollChange={this.scrollChange}>
          <Wrapper>
            <Robot />
            <Info>
              <h2>Robotron Bestseller</h2>
              <ul>
                <li>width: 8.3"</li>
                <li>length: 32.25"</li>
                <li>wheelbase: 14.25"</li>
                <li>nose: 7.2"</li>
                <li>tail: 6.75"</li>
                <li>&nbsp;</li>
                <li>medium concave</li>
                <li>standard popsicle shape</li>
                <li>7-ply maple construction</li>
                <li>Bestseller series</li>
              </ul>
            </Info>
            <WrapperBG />
          </Wrapper>
        </DeckWrapper>
      </div>
    )
  }
}

export default DeckBestseller;

const Wrapper = styled.div`
  position: relative;
  height: 200vh;

  overflow: hidden;
`;


const BGanim = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const WrapperBG = styled.div`
  position: absolute;
  height: 300vh;
  width: 300vw;
  top: -50vh;
  left: -100vw;
  background-image: url(/skateboard-website/spiral.svg);
  background-size: contain;
  background-position: center;
  transform-origin: center;
  /* animation: ${BGanim} 10000ms infinite linear; */
`;

const Info = styled.div`
  position: absolute;
  z-index: 90;
  top: 8vh;
  right: 1vh;
  width: 45vh;
  min-height: 45vh;
  transform: rotate(10deg);
  background-color: yellow;
  padding: 1vh;
  h2{
    font-weight: bold;
  }
`;

const Robot = styled.div`
  position: absolute;
  z-index: 11;
  top: 20vh;
  left: 3vh;
  width: 80vh;
  height: 60vh;
  transform: rotate(-10deg);
  background-image: url(/skateboard-website/robotron-robot.svg);
  background-size: contain;
  background-position: center;

`;
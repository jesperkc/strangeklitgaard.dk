
import styled from "@emotion/styled";
import React from 'react';
import DeckComponent, { DeckWrapper } from './deck.component';

class DeckKisses extends DeckComponent {

  constructor() {
    super();


    this.decks = [
      {
        name: 'KISS SYBILLE & ZACH 8"',
        texture: '/skateboard-website/_0001_Robotron-kiss-sybille.jpg'
      },
      {
        name: 'KISS ANNA & MACAULAY 8.25"',
        texture: '/skateboard-website/_0002_robotron-kiss-macaulay.jpg'
      },
      {
        name: 'KISS SELMA & SARAH 8.3"',
        texture: '/skateboard-website/_0003_robotron-kiss-selma.jpg'
      },
    ];

    this.state.activeDeck = 2;
  }

  render() {

    return (
      <div className={this.state.showArrow ? 'show-arrow' : ''}>
        <DeckWrapper scrollChange={this.scrollChange}>
          <Wrapper>
            <ArrowRight onClick={this.activatePrevDeck} />
            <Info>
              <h2>Kiss series</h2>
            </Info>
            {/* <KissMacaulay />
            <KissSelma />
            <KissSybille /> */}
          </Wrapper>
        </DeckWrapper>
      </div>
    )
  }
}

export default DeckKisses;

const Wrapper = styled.div`
  position: relative;
  height: 200vh;
  background-color: red;
  /* background-image: url(/skateboard-website/kisses-bg.jpg); */
  background-size: cover;
  background-position: center;
`;


const ArrowRight = styled.div`
  position: fixed;
  z-index: 190;
  top: 50%;
  right: 1vh;
  width: 14vh;
  height: 25vh;
  background-image: url(/skateboard-website/arrow.svg);
  background-size: contain;
  background-position: center;

  transition: transform 500ms ease-in-out;
  transform: translate(150%, -50%);
  .show-arrow & {
    transform: translate(0%, -50%);
  }
`;

const Info = styled.div`
  position: absolute;
  z-index: 90;
  top: 8vh;
  right: 1vh;
  width: 45vh;
  transform: rotate(10deg);
  background-color: yellow;
  padding: 1vh;
  h2{
    font-weight: bold;
  }
`;

const sybille_width = 85;
const KissSybille = styled.div`
  position: absolute;
  z-index: 50;
  bottom: 4vh;
  left: 1vh;
  width: ${sybille_width}vh;
  height: ${sybille_width * .55}vh;
  transform: rotate(10deg);
  
  background-image: url(/skateboard-website/robotron-kiss-sybille-zach.jpg);
  background-size: cover;
  background-position: center;
`;

const macaulay_width = 85;
const KissMacaulay = styled.div`
  position: absolute;
  z-index: 50;
  top: 4vh;
  left: 1vh;
  width: ${macaulay_width}vh;
  height: ${macaulay_width * .55}vh;
  transform: rotate(10deg);
  
  background-image: url(/skateboard-website/robotron-kiss-macaulay.jpg);
  background-size: cover;
  background-position: center;
`;

const selma_width = 85;
const KissSelma = styled.div`
  position: absolute;
  z-index: 50;
  top: 40%;
  right: -1vh;
  width: ${selma_width}vh;
  height: ${selma_width * .55}vh;
  transform: rotate(-5deg);
  
  background-image: url(/skateboard-website/robotron-kiss-selma.jpg);
  background-size: cover;
  background-position: center;
`;
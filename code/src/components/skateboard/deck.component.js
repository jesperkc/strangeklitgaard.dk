
import styled from "@emotion/styled";
import React from 'react';
import { ReactBasicScroll } from 'react-basic-scroll';


class DeckComponent extends React.Component {

  constructor() {
    super();


    this.state = {
      activeDeck: 0,
      visible: false,
      showArrow: false,
    }
    this.decks = [];
    this.visiblility = 0;

    this.scrollChange = this.scrollChange.bind(this);
    this.activateNextDeck = this.activateNextDeck.bind(this);
    this.activatePrevDeck = this.activatePrevDeck.bind(this);

  }

  componentDidMount() {
    this.loadTextures();
  }

  activateNextDeck() {
    this.setActiveDeck(this.state.activeDeck < this.decks.length - 1 ? this.state.activeDeck + 1 : 0);
  }
  activatePrevDeck() {
    this.setActiveDeck(this.state.activeDeck === 0 ? this.decks.length - 1 : this.state.activeDeck - 1);
  }
  setActiveDeck(i) {
    this.props.spinDeck();
    this.setState({ activeDeck: i }, this.props.updateDeck(this.getActiveDeck(), this.visiblility));
  }

  getActiveDeck() {
    return this.decks[this.state.activeDeck];
  }

  loadTextures() {
    for (var i = 0; i < this.decks.length; i++) {
      var img = new Image();
      img.src = this.decks[i].texture;
      this.decks[i].textureimg = img;
    }
  }

  scrollChange(prop, progress) {
    this.setState({ visible: prop > 0, showArrow: progress > 50 && progress < 150 });
    if (this.visiblility != prop) {
      this.visiblility = prop;
      this.props.updateDeck(this.getActiveDeck(), this.visiblility);
    }
  }

  render() {

    return (
      <div></div>
    )
  }
}

export default DeckComponent;


export class DeckWrapper extends React.Component {

  render() {

    const deckconfig = {
      from: 'top-bottom',
      to: 'bottom-top',
      track: false,
      direct: true,
      inside: (instance, percentage, props) => this.props.scrollChange(props['--deg'] < 100 ? props['--deg'] : 100, props['--deg']),
      outside: (instance, percentage, props) => this.props.scrollChange(props['--deg'], props['--deg']),
      round: 1,
      props: {
        '--deg': {
          from: 0,
          to: 300
        }
      }
    };

    return (
      <div>
        {typeof window !== 'undefined' && ReactBasicScroll && <ReactBasicScroll config={deckconfig}>{this.props.children}</ReactBasicScroll>}
      </div>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  height: 200vh;

  background-image: url(/skateboard-website/robotron-kiss-sybille-zach.jpg);
  background-size: cover;
  background-position: center;

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
const SkaterSpacer = styled.div`
  position: relative;
  height: 50vh;
  margin-top: -25vh;
  margin-bottom: -25vh;
  z-index: 10;
`;
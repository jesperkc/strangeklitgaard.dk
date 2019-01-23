import { css } from "@emotion/core";
import React from 'react';
import { ReactComponent as LogoSVG } from '../../static/sk-logo-lines.svg';
import { LogoWrapper, logo_css } from './shared.component';

from 'react-emotion';

class LogoAnimated extends React.Component {


  constructor() {
    super();

    this.visible = true;
    this.easing = 'easeInOutQuad';
    this.duration = 500;
    this.delay = 500;


    //this.GetNextColor = this.GetNextColor.bind(this);
    //this.GetNextAlternateAnime = this.GetNextAlternateAnime.bind(this);
    this.GetNextAnime = this.GetNextAnime.bind(this);
  }
  componentDidMount() {
    //this.AnimeHideAlternates();
    this.GetNextAnime();
  }
  GetNextAnime() {
    setTimeout(() => {
      this.GetNextAnime();
    }, 2500);

    var r = Math.random();
    if (this.visible) {

      if (r >= .8) {
        this.AnimeHideOddEvenOffset();
      } else if (r >= .4) {
        this.AnimeHide();
      } else if (r >= .2) {
        this.AnimeHideInstant();
      } else {
        this.AnimeHideOddEven();
      }

    } else {
      if (r >= .8) {
        this.AnimeShowOddEvenOffset();
      } else if (r >= .4) {
        this.AnimeShow();
      } else if (r >= .2) {
        this.AnimeShowInstant();
      } else {
        this.AnimeShowOddEven();
      }

    }
  }

  AnimeShow() {
    this.TranslateBlockDefault(1, 10, NormalDirection);
    this.TranslateBlockDefault(2, 200, NormalDirection);
    this.TranslateBlockDefault(3, 400, NormalDirection);
    this.TranslateBlockDefault(4, 600, NormalDirection);

    this.visible = true;
  }

  AnimeHide() {
    this.TranslateBlockUp(1, 10, false, NormalDirection);
    this.TranslateBlockDown(2, 200, false, NormalDirection);
    this.TranslateBlockUp(3, 400, false, NormalDirection);
    this.TranslateBlockDown(4, 600, true, NormalDirection);

    this.visible = false;
  }

  AnimeShowOddEvenOffset() {
    this.TranslateBlockOddEvenOffsetDefault(1, 10);
    this.TranslateBlockOddEvenOffsetDefault(2, 200);
    this.TranslateBlockOddEvenOffsetDefault(3, 400);
    this.TranslateBlockOddEvenOffsetDefault(4, 600);

    this.visible = true;
  }
  AnimeHideOddEvenOffset() {
    this.TranslateBlockOddEvenUpOffset(1, 10, false);
    this.TranslateBlockOddEvenDownOffset(2, 200, false);
    this.TranslateBlockOddEvenUpOffset(3, 400, false);
    this.TranslateBlockOddEvenDownOffset(4, 600, true);

    this.visible = false;
  }

  AnimeShowOddEven() {
    this.TranslateBlockOddEvenDefault(1, 10);
    this.TranslateBlockOddEvenDefault(2, 200);
    this.TranslateBlockOddEvenDefault(3, 400);
    this.TranslateBlockOddEvenDefault(4, 600);

    this.visible = true;
  }
  AnimeHideOddEven() {
    this.TranslateBlockOddEvenUp(1, 10, false);
    this.TranslateBlockOddEvenDown(2, 200, false);
    this.TranslateBlockOddEvenUp(3, 400, false);
    this.TranslateBlockOddEvenDown(4, 600, true);

    this.visible = false;
  }

  AnimeShowInstant() {
    this.TranslateBlockDefault(1, 0, NormalDirectionFast, InstantDuration);
    this.TranslateBlockDefault(2, 0, NormalDirectionFast, InstantDuration);
    this.TranslateBlockDefault(3, 0, NormalDirectionFast, InstantDuration);
    this.TranslateBlockDefault(4, 0, NormalDirectionFast, InstantDuration);

    this.visible = true;
  }
  AnimeHideInstant() {
    this.TranslateBlockUp(1, 10, false, NormalDirectionFast, InstantDuration);
    this.TranslateBlockDown(2, 200, false, NormalDirectionFast, InstantDuration);
    this.TranslateBlockUp(3, 400, false, NormalDirectionFast, InstantDuration);
    this.TranslateBlockDown(4, 400, true, NormalDirectionFast, InstantDuration);

    this.visible = false;
  }


  SetAnimationClass(group, c) {
    var g = document.querySelector(`#g-${group}`);
    if (g) g.setAttribute('class', c);
  }
  TranslateBlockDefault(group, delay, direction, duration) {
    setTimeout(() => {
      this.SetAnimationClass(group, `${TranslateDefault} ${direction} ${duration}`);
    }, delay);
  }
  TranslateBlockDown(group, delay, alternate, direction, duration) {
    setTimeout(() => {
      if (alternate) {
        this.SetAnimationClass(group, `${TranslateBlockDownAlt} ${direction} ${duration}`);
      } else {
        this.SetAnimationClass(group, `${TranslateBlockDown} ${direction} ${duration}`);
      }
    }, delay);
  }
  TranslateBlockUp(group, delay, alternate, direction, duration) {
    setTimeout(() => {
      this.SetAnimationClass(group, `${TranslateBlockUp} ${direction} ${duration}`);
    }, delay);
  }

  // HideBlockInstantUp(group, delay, alternate) {
  //   setTimeout(() => {
  //     this.SetAnimationClass(group, `${TranslateBlockUp} ${NormalDirection} ${InstantDuration} ${OffsetColors}`);
  //   }, delay);
  // }

  TranslateBlockOddEvenUp(group, delay, alternate, cb) {
    setTimeout(() => {
      this.SetAnimationClass(group, `${TranslateBlockUp} ${OddEvenDirection} ${OffsetColors}`);
    }, delay);
  }
  TranslateBlockOddEvenDown(group, delay, alternate, cb) {
    setTimeout(() => {
      if (alternate) {
        this.SetAnimationClass(group, `${TranslateBlockDownAlt} ${OddEvenDirection} ${OffsetColors}`);
      } else {
        this.SetAnimationClass(group, `${TranslateBlockDown} ${OddEvenDirection} ${OffsetColors}`);
      }
    }, delay);
  }

  TranslateBlockOddEvenUpOffset(group, delay, alternate, cb) {
    setTimeout(() => {
      this.SetAnimationClass(group, `${TranslateBlockUp} ${OddEvenOffsetDirection}`);
    }, delay);
  }
  TranslateBlockOddEvenDownOffset(group, delay, alternate, cb) {
    setTimeout(() => {
      if (alternate) {
        this.SetAnimationClass(group, `${TranslateBlockDownAlt} ${OddEvenOffsetDirection}`);
      } else {
        this.SetAnimationClass(group, `${TranslateBlockDown} ${OddEvenOffsetDirection}`);
      }
    }, delay);
  }

  TranslateBlockOddEvenDefault(group, delay, cb) {
    setTimeout(() => {
      this.SetAnimationClass(group, `${TranslateDefault} ${OddEvenDirection} ${OffsetColors}`);
    }, delay);
  }
  TranslateBlockOddEvenOffsetDefault(group, delay, cb) {
    setTimeout(() => {
      this.SetAnimationClass(group, `${TranslateDefault} ${OddEvenOffsetDirection} ${OffsetColors}`);
    }, delay);
  }

  render() {

    return (<LogoWrapper color={this.props.color}>
      <LogoSVG className={logo_css} />
    </LogoWrapper>)
  }
}


const TranslateDefault = css`
  g polygon{
    transform: translateY(0) translateX(0);
    transition: all 500ms;
  }
`;
const TranslateBlockUp = css`
  g polygon{
    transform: translateY(-100px) translateX(50px);
    transition: all 500ms;
  }
`;
const TranslateBlockDown = css`
  g polygon{
    transform: translateY(100px) translateX(-50px);
    transition: all 500ms;
  }
`;
const TranslateBlockDownAlt = css`
  g polygon{
    transform: translateY(100px) translateX(50px);
    transition: all 500ms;
  }
`;


const InstantDuration = css`
  g polygon{
    transition: all 5ms;
  }
`;




const NormalDirection = css`
  g:nth-child(1) polygon{
    transition-delay: 0ms;
  }
  g:nth-child(2) polygon{
    transition-delay: 200ms;
  }
  g:nth-child(3) polygon{
    transition-delay: 400ms;
  }
  g:nth-child(4) polygon{
    transition-delay: 600ms;
  }
  g:nth-child(5) polygon{
    transition-delay: 800ms;
  }
`;

const NormalDirectionFast = css`
  g:nth-child(1) polygon{
    transition-delay: 0ms;
  }
  g:nth-child(2) polygon{
    transition-delay: 50ms;
  }
  g:nth-child(3) polygon{
    transition-delay: 100ms;
  }
  g:nth-child(4) polygon{
    transition-delay: 150ms;
  }
  g:nth-child(5) polygon{
    transition-delay: 200ms;
  }
`;

// const CenterDirection = css`
//   g:nth-child(1) polygon{
//     transition-delay: 0ms;
//   }
//   g:nth-child(2) polygon{
//     transition-delay: 200ms;
//   }
//   g:nth-child(3) polygon{
//     transition-delay: 400ms;
//   }
//   g:nth-child(4) polygon{
//     transition-delay: 200ms;
//   }
//   g:nth-child(5) polygon{
//     transition-delay: 0ms;
//   }
// `;
// const AlternateDirection = css`
//   g:nth-child(5) polygon{
//     transition-delay: 0ms;
//   }
//   g:nth-child(4) polygon{
//     transition-delay: 200ms;
//   }
//   g:nth-child(3) polygon{
//     transition-delay: 400ms;
//   }
//   g:nth-child(2) polygon{
//     transition-delay: 600ms;
//   }
//   g:nth-child(1) polygon{
//     transition-delay: 800ms;
//   }
// `;

const OddEvenDirection = css`
g:nth-child(1) polygon{
  transition-delay: 0ms;
}
g:nth-child(3) polygon{
  transition-delay: 200ms;
}
g:nth-child(5) polygon{
  transition-delay: 400ms;
}
g:nth-child(2) polygon{
  transition-delay: 600ms;
}
g:nth-child(4) polygon{
  transition-delay: 800ms;
}
`;

const OddEvenOffsetDirection = css`
g:nth-child(1) polygon{
  transition-delay: 300ms;
}
g:nth-child(3) polygon{
  transition-delay: 600ms;
}
g:nth-child(5) polygon{
  transition-delay: 300ms;
}
g:nth-child(2) polygon{
  transition-delay: 0ms;
}
g:nth-child(4) polygon{
  transition-delay: 0ms;
}
`;

const OffsetColors = css`
  /* g polygon:nth-child(1){
    opacity: 0;
  }
  g polygon:nth-child(2){
    opacity: 0;
  }
  }g polygon:nth-child(3){
    fill: #000;
  } */
`;





// const LogoWrapper = styled('div')`
//   pointer-events: all;
//   overflow: hidden;
//   /* background-color: pink; */
//   position: fixed;
//   left: 0;
//   top: 40px;
//   width: 100%;
//   font-size: 0;
//   svg{

//   }
//   polygon{
//     /* fill: ${props => props.color}; */
//   }
// `;

export default LogoAnimated;
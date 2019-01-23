import { css } from "@emotion/core";
import styled from "@emotion/styled";
import anime from 'animejs';
import React from 'react';
import { ReactComponent as LogoSVG } from '../../static/sk-logo-lines.svg';


class LogoAnimated extends React.Component {


  constructor() {
    super();

    this.visible = true;
    this.easing = 'easeInOutQuad';
    this.duration = 500;
    this.delay = 500;

    this.paths = {
      line11: '#g-1 g:nth-child(1) polygon',
      line12: '#g-1 g:nth-child(2) polygon',
      line13: '#g-1 g:nth-child(3) polygon',
      line14: '#g-1 g:nth-child(4) polygon',
      line15: '#g-1 g:nth-child(5) polygon',

      line21: '#g-2 g:nth-child(1) polygon',
      line22: '#g-2 g:nth-child(2) polygon',
      line23: '#g-2 g:nth-child(3) polygon',
      line24: '#g-2 g:nth-child(4) polygon',
      line25: '#g-2 g:nth-child(5) polygon',

      line31: '#g-3 g:nth-child(1) polygon',
      line32: '#g-3 g:nth-child(2) polygon',
      line33: '#g-3 g:nth-child(3) polygon',
      line34: '#g-3 g:nth-child(4) polygon',
      line35: '#g-3 g:nth-child(5) polygon',

      line41: '#g-4 g:nth-child(1) polygon',
      line42: '#g-4 g:nth-child(2) polygon',
      line43: '#g-4 g:nth-child(3) polygon',
      line44: '#g-4 g:nth-child(4) polygon',
      line45: '#g-4 g:nth-child(5) polygon',
    }

    //this.GetNextColor = this.GetNextColor.bind(this);
    //this.GetNextAlternateAnime = this.GetNextAlternateAnime.bind(this);
    this.GetNextAnime = this.GetNextAnime.bind(this);
  }
  componentDidMount() {
    //this.AnimeHideAlternates();
    this.GetNextAnime();
  }
  GetNextAnime() {
    if (this.visible) {
      var r = Math.random();
      if (r >= .7) {
        this.AnimeHide();
      } else if (r >= .4) {
        this.AnimeHideOddEven();
      } else {
        this.AnimeHideOdd();
      }
    } else {
      var r = Math.random();
      if (r >= .7) {
        this.AnimeShow();
      } else if (r >= .4) {
        this.AnimeShowOddEven();
      } else {
        this.AnimeShowOdd();
      }
    }
  }

  AnimeShow() {
    this.TranslateBlockDefault(1, 10);
    this.TranslateBlockDefault(2, 200);
    this.TranslateBlockDefault(3, 400);
    this.TranslateBlockDefault(4, 600, this.GetNextAnime);

    this.visible = true;
  }

  AnimeHide() {
    this.TranslateBlockUp(1, 10, false);
    this.TranslateBlockDown(2, 200, false);
    this.TranslateBlockUp(3, 400, false);
    this.TranslateBlockDown(4, 600, true, this.GetNextAnime);

    this.visible = false;
  }
  AnimeShowOdd() {
    this.TranslateBlockOddDefault(1, 10);
    this.TranslateBlockOddDefault(2, 200);
    this.TranslateBlockOddDefault(3, 400);
    this.TranslateBlockOddDefault(4, 600, this.GetNextAnime);

    this.visible = true;
  }
  AnimeHideOdd() {
    this.TranslateBlockOddUp(1, 10, false);
    this.TranslateBlockOddDown(2, 200, false);
    this.TranslateBlockOddUp(3, 400, false);
    this.TranslateBlockOddDown(4, 600, true, this.GetNextAnime);

    this.visible = false;
  }
  AnimeShowOddEven() {
    this.TranslateBlockOddEvenDefault(1, 10);
    this.TranslateBlockOddEvenDefault(2, 200);
    this.TranslateBlockOddEvenDefault(3, 400);
    this.TranslateBlockOddEvenDefault(4, 600, this.GetNextAnime);

    this.visible = true;
  }
  AnimeHideOddEven() {
    this.TranslateBlockOddEvenUp(1, 10, false);
    this.TranslateBlockOddEvenDown(2, 200, false);
    this.TranslateBlockOddEvenUp(3, 400, false);
    this.TranslateBlockOddEvenDown(4, 600, true, this.GetNextAnime);

    this.visible = false;
  }


  TranslateBlockDown(group, delay, alternate, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    if (alternate) {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(1) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(3) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(4) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(5) polygon`, offset))
        ;
    } else {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateDown(`#g-${group} g:nth-child(1) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(3) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(4) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(5) polygon`, offset))
        ;
    }
  }
  TranslateBlockOddEvenDown(group, delay, alternate, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    if (alternate) {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(4) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(1) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(3) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(5) polygon`, offset))
        ;
    } else {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateDown(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(4) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(1) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(3) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(5) polygon`, offset))
        ;
    }
  }
  TranslateBlockOddEvenUp(group, delay, alternate, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    if (alternate) {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(4) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(1) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(3) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(5) polygon`, offset))
        ;
    } else {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateUp(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(4) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(1) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(3) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(5) polygon`, offset))
        ;
    }
  }
  TranslateBlockOddDown(group, delay, alternate, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    if (alternate) {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateDownAlt(`#g-${group} g:nth-child(4) polygon`, offset))
        ;
    } else {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateDown(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateDown(`#g-${group} g:nth-child(4) polygon`, offset))
        ;
    }
  }
  TranslateBlockOddUp(group, delay, alternate, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    if (alternate) {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(4) polygon`, offset))
        ;
    } else {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateUp(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(4) polygon`, offset))
        ;
    }
  }
  TranslateBlockUp(group, delay, alternate, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    if (alternate) {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(1) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(3) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(4) polygon`, offset))
        .add(this.TranslateUpAlt(`#g-${group} g:nth-child(5) polygon`, offset))
        ;
    } else {
      timelineParameters
        .add({ targets: document, duration: delay + 300 + this.delay })
        .add(this.TranslateUp(`#g-${group} g:nth-child(1) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(2) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(3) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(4) polygon`, offset))
        .add(this.TranslateUp(`#g-${group} g:nth-child(5) polygon`, offset))
        ;
    }
  }
  TranslateBlockDefault(group, delay, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    timelineParameters
      .add({ targets: document, duration: delay + 300 + this.delay })
      .add(this.TranslateDefault(`#g-${group} g:nth-child(1) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(2) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(3) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(4) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(5) polygon`, offset))
      ;
  }
  TranslateBlockOddEvenDefault(group, delay, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    timelineParameters
      .add({ targets: document, duration: delay + 300 + this.delay })
      .add(this.TranslateDefault(`#g-${group} g:nth-child(2) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(4) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(1) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(3) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(5) polygon`, offset))
      ;
  }
  TranslateBlockOddDefault(group, delay, cb) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: this.duration,
      complete: (anim) => {
        cb && cb();
      }
    });
    var offset = '-=300';
    timelineParameters
      .add({ targets: document, duration: delay + 300 + this.delay })
      .add(this.TranslateDefault(`#g-${group} g:nth-child(2) polygon`, offset))
      .add(this.TranslateDefault(`#g-${group} g:nth-child(4) polygon`, offset))
      ;
  }
  TranslateDown(line, offset) {
    return { targets: line, translateY: [{ value: 100 }], translateX: [{ value: -50 }], offset: offset };
  }
  TranslateDownAlt(line, offset) {
    return { targets: line, translateY: [{ value: 100 }], translateX: [{ value: 50 }], offset: offset };
  }
  TranslateUp(line, offset) {
    return { targets: line, translateY: [{ value: -100 }], translateX: [{ value: 50 }], offset: offset };
  }
  TranslateUpAlt(line, offset) {
    return { targets: line, translateY: [{ value: -100 }], translateX: [{ value: -50 }], offset: offset };
  }
  TranslateDefault(line, offset) {
    return { targets: line, translateY: [{ value: 0 }], translateX: [{ value: 0 }], offset: offset };
  }
  render() {

    return (<LogoWrapper color={this.props.color}>
      <LogoSVG className={logo_css} />
    </LogoWrapper>)
  }
}

const logo_css = css`
  width: auto;
  height: 50px;
  margin-left: 40px;
  overflow: visible;
  position: relative;
`;

const LogoWrapper = styled('div')`
    overflow: hidden;
    /* background-color: pink; */
    position: fixed;
    left: 0;
    top: 40px;
    width: 100%;
    font-size: 0;
    svg{
      
    }
    polygon{
      fill: ${props => props.color};
    }
`;

export default LogoAnimated;
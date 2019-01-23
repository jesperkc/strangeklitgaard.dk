import { css } from "@emotion/core";
import styled from "@emotion/styled";
import anime from 'animejs';
import React from 'react';
import { ReactComponent as HISVG } from '../../static/hi.svg';

class Hi extends React.Component {

  constructor() {
    super();

    this.visible = true;
    this.easing = 'easeInOutQuad';
    this.duration = 1500;
    this.delay = 500;

    // this.colors = ['#1677E5', '#FF7E00', '#DF1AA4'];
    this.colors = ['#00ED82', '#DF1AA4', '#FF7E00'];

    this.state = {
      normalClassName: '',
    };

  }
  componentDidMount() {
    //this.AnimeHideAlternates();
    this.ReverseLine('#hi2');
    // this.SetColors('#hi1', 0);
    // this.SetColors('#hi2', 1);
    // this.SetColors('#hi3', 2);
    this.AnimateLine('#hi1', 400, 500);
    this.AnimateLine('#hi2', 500, 1000);
    this.AnimateLine('#hi3', 500, 1500);
  }
  SetColors(root, i) {
    document.querySelector(`${root} #h1`).style.stroke = this.colors[i];
    i++
    if (i > this.colors.length - 1) i = 0;
    document.querySelector(`${root} #h2`).style.stroke = this.colors[i];
    i++
    if (i > this.colors.length - 1) i = 0;
    document.querySelector(`${root} #h3`).style.stroke = this.colors[i];
    i++
    if (i > this.colors.length - 1) i = 0;
    document.querySelector(`${root} #i`).style.stroke = this.colors[i];
    i++
    if (i > this.colors.length - 1) i = 0;
    document.querySelector(`${root} #dot`).style.stroke = this.colors[i];
  }
  ReverseLine(root) {
    document.querySelector(`${root} #h1`).setAttribute('d', 'M13.25,0 L13.25,97');
    document.querySelector(`${root} #h2`).setAttribute('d', 'M81,48 L0,48');
    document.querySelector(`${root} #h3`).setAttribute('d', 'M68,0 L68,97');
    document.querySelector(`${root} #i`).setAttribute('d', 'M116.25,0 L116.25,97');
  }
  AnimateLine(root, duration, delay) {
    var timelineParameters = anime.timeline({
      loop: false,
      easing: this.easing,
      duration: duration,
      complete: (anim) => {
      }
    });
    var offset = '-=200';
    timelineParameters
      .add({ targets: document, duration: delay })
      .add({ targets: `${root} #h1`, strokeDashoffset: [anime.setDashoffset, 0], offset: offset })
      .add({ targets: `${root} #h2`, strokeDashoffset: [anime.setDashoffset, 0], offset: offset })
      .add({ targets: `${root} #h3`, strokeDashoffset: [anime.setDashoffset, 0], offset: offset })
      .add({ targets: `${root} #i`, strokeDashoffset: [anime.setDashoffset, 0], offset: offset })
      .add({ targets: `${root} #dot`, strokeDashoffset: [anime.setDashoffset, 0], offset: offset })
      ;
  }
  render() {

    return (
      <div className={hi_wrapper_css}>
        <HiDom id={'hi1'} css_offset_color={this.colors[0]} css_offset={this.props.offset} css_default_offset={0} />
        <HiDom id={'hi2'} css_absolute={'True'} css_offset_color={this.colors[1]} css_offset={this.props.offset * 1.5} css_default_offset={0} />
        <HiDom id={'hi3'} css_absolute={'True'} css_offset_color={this.colors[2]} css_offset={this.props.offset * 2} css_default_offset={0} />
      </div>
    )
  }
}

const hi_wrapper_css = css`
  isolation: isolate;
  position: relative;
`;
const HiDom = styled(HISVG)`
  mix-blend-mode: multiply;
  path,circle{
    mix-blend-mode: multiply;
    stroke: ${props => props.css_offset_color};
  }
  @supports not (mix-blend-mode: multiply) {
    path,circle {
      stroke: #000 !important;
    }
  }
  position: ${props => props.css_absolute ? 'absolute' : 'relative'};
  left: 0;
  top: ${props => props.css_offset ? `${(props.css_offset * 50) + props.css_default_offset}px` : `${(props.css_default_offset)}px`};
  /* filter: ${props => props.css_offset ? `blur(${(props.css_offset * 10) + props.css_default_offset}px)` : `none`}; */
  transform: translate3d(0, 0, 0);
  width: 200px;
  height: auto;
`;

export default Hi;
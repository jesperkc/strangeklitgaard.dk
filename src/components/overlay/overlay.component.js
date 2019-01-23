import styled from "@emotion/styled";
import React from 'react';
import LogoAnimated from '../logo/logo.animated.component';
import LogoFull from '../logo/logo.full.component';
import LogoStripes from '../logo/logo.stripes.component';

class Overlay extends React.Component {

  render() {

    return (<OverlayWrapper>
      {this.props.logo === 'animated' && <LogoAnimated color={this.props.color} />}
      {this.props.logo === 'full' && <LogoFull color={this.props.color} />}
      {this.props.logo === 'stripes' && <LogoStripes color={this.props.color} />}

      {/* <Footer color={this.props.color} /> */}
    </OverlayWrapper>)
  }
}


const OverlayWrapper = styled('div')`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100%;
    clip: rect(0, auto, auto, 0);
    pointer-events: none;
    z-index: 10;

`;

export default Overlay;
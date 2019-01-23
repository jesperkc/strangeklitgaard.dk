import styled from "@emotion/styled";
import React from 'react';
// import Overlay from '../overlay/overlay.component';

class Section extends React.Component {

  render() {

    return (<StyledSection backgroundColor={this.props.backgroundColor} color={this.props.color}>

      {/* <Overlay color={this.props.logoColor} logo={this.props.logo} /> */}
      {this.props.children}
    </StyledSection>)
  }
}



const StyledSection = styled('div')`
  display: flex;
  min-height: 100vh;
  /* justify-content: center;
  align-items: center; */
  padding: 80px 40px;
  position: relative;
  background-color: ${props => props.backgroundColor};
  background-blend-mode: soft-light;
  background-image: linear-gradient(45deg,#000,#bb8e55);
  /* background-attachment: fixed; */
  color: ${props => props.color};

  a{
    color: ${props => props.color};
    &:after{
      background-color: ${props => props.color};
    }
  }

`;

export default Section;
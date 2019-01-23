import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from 'react';
import Sticky from 'react-sticky-el';
import Style from '../../style/style';
import Grid from '../grid/grid.component';

export class CaseHeader extends React.Component {

  constructor() {
    super();

    this.state = {
      duration: 0.2,
      stickyClass: ''
    }
    //this.onFixedToggle = this.onFixedToggle.bind(this);
  }
  // static defaultProps = {
  //   className: ""
  // };
  // onChangeMode(oldMode, newMode) {
  //   console.log(oldMode, newMode);
  // }
  // componentDidMount() {

  //   console.log("componentDidMount", this.stickybox.getBoundingClientRect().top, this.stickybox.parentElement.classList, window.scrollY);
  // }
  // onFixedToggle(nonSticky) {
  //   console.log("nonSticky", nonSticky, this.stickybox.parentNode);
  //   if (this.stickybox.getBoundingClientRect().top < -100 && nonSticky === false) {
  //     console.log('Dont animate');
  //     //this.stickybox.parentElement.classList.add('dontanimate');
  //     this.setState({ stickyClass: 'dontanimate' });
  //   } else {
  //     this.setState({ stickyClass: '' });
  //   }
  //   console.log(this.stickybox.parentElement.classList);
  // }
  render() {
    const { style, title, url, description } = this.props;
    return (
      <Sticky boundaryElement=".StyledSection" hideOnBoundaryHit={false} className={headerContainer}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Cell justify={'center'} align={'center'}>
              <HeaderWrapper>
                <CaseTitle>{title}</CaseTitle>
                <CaseDescription>
                  <div>{description}</div>
                  <div><Style.a href={`http://${url}`} target="_blank">{url}</Style.a><br /></div>
                  <CaseTags>React, Gatsby, Emotion, SPA, Blazing fast</CaseTags>
                </CaseDescription>
              </HeaderWrapper>
            </Grid.Cell>
          </Grid.Row>
        </Grid.Container>
      </Sticky>
    );
  }
}

const HeaderWrapper = styled('div')`
  position: relative;
`;

const CaseTitle = styled('div')`
  transition: all .3s;
  
  word-break: break-word;
  line-height: 1;
  font-size: 34px;
  margin-top: 20px;

  @media (min-width: 350px){
    font-size: 11vw;
  }
  @media (min-width: 700px){
    font-size: 80px;
  }
  font-weight: bold;
  text-transform: uppercase;

`;
const CaseDescription = styled('div')`
  
  font-size: 16px;
  /* color: #888888; */
  line-height: 1.3;
  width: 100%;
  position: relative;
  bottom: 0;
  & > div{
    transform: translateY(20px);
    transition: all .3s;
    &:nth-child(1){
      transition-delay: 0s;
    }
    &:nth-child(2){
      transition-delay: .1s;
    }
    &:nth-child(3){
      transition-delay: .2s;
    }
  }
  .sticky & > div{
    transform: translateY(0px);
    opacity: 0;

    &:nth-child(1){
      transition-delay: .2s;
    }
    &:nth-child(2){
      transition-delay: .1s;
    }
    &:nth-child(3){
      transition-delay: 0s;
    }
    
  }
`;

const CaseTags = styled('div')`
  color: #888888;
  
`;

const headerContainer = css`
  display: flex;
  width: 100vw;
  height: 100vh;
  color: #000;
  z-index: 1;
`;


export default CaseHeader;
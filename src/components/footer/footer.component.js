import styled from "@emotion/styled";
import React from 'react';

class Footer extends React.Component {


  constructor() {
    super();

  }

  render() {

    return (<FooterWrapper color={this.props.color}>
      <div>jesper@strangeklitgaard.dk</div>
    </FooterWrapper>)
  }
}


const FooterWrapper = styled('div')`
    div{
      position: fixed;
      bottom: 40px;
      left: 40px;
    }
    color: ${props => props.color};
`;

export default Footer;
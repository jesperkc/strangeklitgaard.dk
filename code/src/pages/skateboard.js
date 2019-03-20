import styled from "@emotion/styled";
import React from 'react';
import Layout from '../components/layouts';
import SkateboardComponent from '../components/skateboard/skateboard.component';

const SkateboardPage = props => (
  <Wrapper>
    <Layout location={props.location}>
      <SkateboardComponent />
    </Layout>
  </Wrapper>
)

export default SkateboardPage


const Wrapper = styled.div`
  background-color: pink;
  overflow: hidden;
`;
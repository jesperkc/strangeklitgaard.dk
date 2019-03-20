import React from 'react';
import { Cell, CellGutter, Container, Row, Spacer } from '../components/grid/grid.component';
import Layout from '../components/layouts/';

const GridPage = props => (
  <Layout location={props.location}>

    <Spacer />
    <Container>
      <h1>Grid</h1>
      <Spacer />
      <Row>
        <Cell></Cell>
      </Row>
    </Container>
    <Spacer />
    <Container>
      <Row wrap={'wrap'}>
        <Cell><h1>Grid</h1></Cell>
        <Spacer.x1 break={'500px'}></Spacer.x1>
        <Cell></Cell>
      </Row>
    </Container>
    <Spacer.x2 />
    <Container>
      <Row wrap={'wrap'}>
        <Cell.x1></Cell.x1>
        <Spacer break={'500px'}></Spacer>
        <Cell.x1></Cell.x1>
      </Row>
    </Container>
    <Spacer />
    <Container>
      <Row>
        <Cell></Cell>
        <CellGutter.x1></CellGutter.x1>
        <Cell></Cell>
        <CellGutter.x3></CellGutter.x3>
        <Cell></Cell>
      </Row>
    </Container>
    <Container>
      <h1>First line of H1<br />second line</h1>
      <h2>First line of H2<br />second line</h2>
      <h3>First line of H3<br />second line</h3>
      <h4>First line of H4<br />second line</h4>
      <h5>First line of H5<br />second line</h5>
      <h6>First line of H6<br />second line</h6>
      <p>I like to enter the base font-size for paragraph text. Then I select from the surrounding values for headers and small text.<br />
        There are no rules. Just experiment and have fun. Try using the values for line-height, margins or whatever, and see what works.</p>
      <p>There are no rules. Just experiment and have fun. Try using the values for line-height, margins or whatever, and see what works.</p>
      <input type="text" placeholder="placeholder" value="Text input" />
      <input type="checkbox" />
      <Spacer.x3 />
    </Container>
  </Layout>
)

export default GridPage

import React from 'react';
import { Cell, CellGutter, Container, H1, P, Row, Spacer } from '../components/grid/grid.component';

const CursorPage = props => (
  <div>
    Grid

    <Container>
      <Row>
        <Cell></Cell>
      </Row>
    </Container>
    <Spacer />
    <Container>
      <Row>
        <Cell></Cell>
        <CellGutter.x1></CellGutter.x1>
        <Cell></Cell>
      </Row>
    </Container>
    <Spacer.x2 />
    <Container>
      <Row>
        <Cell.x1></Cell.x1>
        <CellGutter></CellGutter>
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
      <H1>H1</H1>
      <Spacer />
      <P>Paragraph stuff</P>
    </Container>
  </div>
)

export default CursorPage

import { Link } from "gatsby";
import React from 'react';
import { Container, Spacer } from '../components/grid/grid.component';
import CursorLayout from '../components/layouts/cursor.layout';


class CursorPage extends React.Component {

  constructor() {
    super();

  }

  render() {
    return (
      <CursorLayout location={this.props.location}>
        <Spacer />
        <Container data-cursor="plain">
          <h1>Cursor</h1>
          <h2>First line of H2<br />second line</h2>
          <h3>First line of H3<br />second line</h3>
          <h4>First line of H4<br />second line</h4>
          <h5>First line of H5<br />second line</h5>
          <h6>First line of H6<br />second line</h6>
          <p>There are no rules. <Link to="/cursor2/" data-cursor="hover">Link to page 2</Link>.</p>
          <p>I like to enter the base font-size for paragraph text. Then I select from the surrounding values for headers and small text.<br />
            There are no rules. Just experiment and have fun. Try using the values for line-height, margins or whatever, and see what works.</p>
          <p>There are no rules. Just experiment and have fun. Try using the values for line-height, margins or whatever, and see what works.</p>
          <input type="text" placeholder="placeholder" defaultValue="Text input" data-cursor="input" />
          <Spacer.x3 />
        </Container>
      </CursorLayout>
    )
  }
}

export default CursorPage

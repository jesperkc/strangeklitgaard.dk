import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { PureComponent } from 'react';
import { DefaultCursor, FocusCursor } from './cursors';

class CursorHandlerComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      x: -50,
      y: -50,
      active: true,
      cursor: undefined,
      click: false,
      cursorProps: {},
      cursorPersistance: 0,
      cursorClickPersistance: 400,
      leaving: false,
    };
    this.position = {
      x: -50,
      y: -50,
    }
    this.cursor = React.createRef();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleUpdateCursorPos = this.handleUpdateCursorPos.bind(this);
  }


  componentDidMount() {

    if (document.elementsFromPoint || document.msElementsFromPoint) {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mouseleave', this.handleMouseLeave);
      document.addEventListener('mouseenter', this.handleMouseEnter);
      var self = this;
      this.cursorPositionUpdater = setInterval(function () {
        self.handleUpdateCursorPos();
      }, 500);
    } else {
      document.body.classList.add('display-cursor');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseleave', this.handleMouseLeave);
    document.removeEventListener('mouseenter', this.handleMouseEnter);
    clearInterval(this.cursorPositionUpdater);
  }


  setLeaving(nextCursor) {
    // Always tell leaving
    this.setState(() => ({ leaving: true }));

    // Set timeout based on persistance
    setTimeout(() => {
      // Set next state (cursor, cursorProps)
      // Turn off leaving
      // Reset cursorpersist based on nextCursor
      this.setState(() => ({
        ...nextCursor,
        click: false,
        leaving: false,
      }));
    }, this.state.cursorPersistance);
  }

  setCursors(x, y) {

    let elFrompoints;
    if (document.elementsFromPoint) {
      elFrompoints = document.elementsFromPoint(x, y);
    } else if (document.msElementsFromPoint) {
      let IEelFrompoints = document.msElementsFromPoint(x, y);
      let newIEelFrompoints = [];
      if (IEelFrompoints) {
        for (var i = -1, l = IEelFrompoints.length; ++i !== l; newIEelFrompoints[i] = IEelFrompoints[i]);
      }
      if (newIEelFrompoints.length) {
        elFrompoints = newIEelFrompoints;
      }
    }
    if (elFrompoints != null) {
      const { cursor } = this.state;

      // Get element based on mouse point coordinates from list of elements on mouse point
      const cursors = elFrompoints
        .filter(function (element) { return element && element.dataset && element.dataset.cursor })
        .map(function (element) {
          return {
            cursor: element.dataset.cursor,
            cursorPersistance: element.dataset.cursorPersistance
              ? element.dataset.cursorPersistance
              : 0,
            cursorClickPersistance: element.dataset.cursorClickPersistance
              ? element.dataset.cursorClickPersistance
              : 400,
            cursorProps: element.dataset.cursorProps
              ? JSON.parse(element.dataset.cursorProps)
              : {},
          }
        });

      // Check if element contains data-cursor
      const nextCursor =
        cursors.length > 0 && cursors[0].cursor
          ? cursors[0]
          : {
            cursor: undefined,
            cursorProps: undefined,
            cursorPersistance: 0,
            cursorClickPersistance: 400,
          };


      // Set leaving if nextCursor is a different cursor
      if (nextCursor.cursor !== cursor) this.setLeaving(nextCursor);
    }
  }

  sendClick() {
    this.setState(() => ({ click: true }));
    setTimeout(() => {
      this.setState(() => ({ click: false }));
    }, this.state.cursorClickPersistance);
  }

  handleMouseDown() {
    // Send click
    this.sendClick();
  }

  handleMouseMove(event) {
    const { x, y } = event;

    this.position = { x: x, y: y };

    this.cursor.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

  handleMouseEnter() {
    this.setState(() => ({ active: true }));
  }

  handleMouseLeave() {
    this.setState(() => ({ active: false }));
  }

  handleUpdateCursorPos() {
    const { x, y } = this.position;
    this.setCursors(x, y);
  }


  renderCursor() {
    const { cursor, leaving, cursorProps, click } = this.state;
    const defaultProps = { leaving, cursorProps, click };
    switch (cursor) {
      case 'focus':
        return <FocusCursor {...defaultProps} />;
      case 'none':
        return <div />;
      default:
        return <DefaultCursor {...defaultProps} />;
    }
  }

  render() {
    const { active } = this.state;
    return (
      <CursorWrapper active={active} ref={this.cursor} className={cursor_wrapper_css}>
        <div>{this.renderCursor()}</div>
      </CursorWrapper>
    );
  }
}

const CursorWrapper = styled.div`
    display: none;
    @media (pointer: fine) {
        opacity: ${props => (props.active ? 1 : 0)};
        /* transform: ${props =>
    `translateX(${props.x}px) translateY(${props.y}px)`} */
    transform: translateZ(0);
    }
`;

const cursor_wrapper_css = css`

    display: none;
    @media (pointer: fine) {
        
        display: block;
        transition: opacity 0.4s;
        position: fixed;
        width: 1px;
        height: 1px;
        overflow: visible;
        
        z-index: 1000;
        pointer-events: none;
        will-change: transform opacity top left;
        > div {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .display-cursor & {
      display: none;
    }
`;

export default CursorHandlerComponent;

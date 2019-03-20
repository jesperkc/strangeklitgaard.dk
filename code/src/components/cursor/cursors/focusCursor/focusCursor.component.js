
import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import React from 'react';

const FocusCursor = ({ leaving, click, cursorProps }) => {
  return (
    <Cursor {...{ leaving, click }}>
      <CursorLetters {...{ leaving, click }}>
        {cursorProps.text}
      </CursorLetters>
    </Cursor>
  );
};

const sizes = {
  default: '100px',
  leaving: '26px',
};

const CursorAnimateIn = keyframes`
    0% {
        width: ${sizes.leaving};
        height: ${sizes.leaving};
    }
    100% {
        width: ${sizes.default};
        height: ${sizes.default};
    }
`;

const CursorAnimateOut = keyframes`
    0% {
        width: ${sizes.default};
        height: ${sizes.default};
    }
    100% {
        width: ${sizes.leaving};
        height: ${sizes.leaving};
    }
`;

const CursorAnimateClick = keyframes`
    0% {
        width: ${sizes.default};
        height: ${sizes.default};
    }
    40% {
        width: ${sizes.leaving};
        height: ${sizes.leaving};
    }
    100% {
        width: ${sizes.leaving};
        height: ${sizes.leaving};
    }
`;

const RippleAnimation = keyframes`
    0% {
        border-width: 1px;
        width: 10px;
        height: 10px;
    }
    20% {
        opacity: 1;
    }
    40% {
        border-width: 1px;
    }
    100% {
        border-width: 4px;
        width: 70px;
        height: 70px;
        opacity: 0;
    }
`;

const Cursor = styled.div`
    border-radius: 100%;
    width: ${props => (props.leaving ? sizes.leaving : sizes.default)};
    height: ${props => (props.leaving ? sizes.leaving : sizes.default)};
    animation-duration: ${props => {
    if (props.leaving) return 200;
    if (props.click) return 200;
    return 300;
  }}ms;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-name: ${props => {
    if (props.leaving) return CursorAnimateOut;
    if (props.click) return CursorAnimateClick;
    return CursorAnimateIn;
  }};
    animation-fill-mode: forwards;
    will-change: width height;

   
    &::after {
        content: '';
        z-index: -1;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #000;
        
        border-radius: 100%;
        animation-duration: 400ms;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-name: ${props => (props.click ? RippleAnimation : 'none')};
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    }
`;

const CursorLettersAnimateIn = keyframes`
    0% {
        font-size: 0.5em;
        top: calc(50% - 10px);
        opacity: 0;
    }
    100% {
        font-size: 1em;
        top: 50%;
        opacity: 1;
    }
`;

const CursorLettersAnimateOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        font-size: 0.25em;
    }
`;

const CursorLettersAnimateClick = keyframes`
    0% {
        opacity: 1;
    }
    10% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

const CursorLetters = styled.div`
    position: absolute;
    opacity: ${props => (props.leaving ? 1 : 0)};
    top: 50%;
    left: 50%;
    text-transform: lowercase;
    transform: translate(-50%, -50%);
    animation-delay: ${props => (props.leaving ? 0 : 100)}ms;
    animation-delay: ${props => {
    if (props.leaving) return 0;
    if (props.click) return 0;
    return 100;
  }}ms;
    animation-duration: ${props => {
    if (props.leaving) return 150;
    if (props.click) return 400;
    return 200;
  }}ms;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-name: ${props => {
    if (props.leaving) return CursorLettersAnimateOut;
    if (props.click) return CursorLettersAnimateClick;
    return CursorLettersAnimateIn;
  }};
`;

export default FocusCursor;

import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import React from 'react';

const DefaultCursor = ({ leaving, click }) => {
  return <Cursor {...{ leaving, click }} />;
};

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
        width: 80px;
        height: 80px;
        opacity: 0;
    }
`;

const Cursor = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border: 1px solid;
    border-radius: 100%;
    pointer-events: none;
    
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid;
        
        opacity: 0;
        border-radius: 100%;
        animation-duration: 400ms;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-name: ${props => (props.click ? RippleAnimation : 'none')};
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    }
`;

export default DefaultCursor;

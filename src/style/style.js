import styled from "@emotion/styled";
import OnVisible from 'react-on-visible';

const my_a = styled('a')`
  text-decoration: none;
  display: inline-block;
  position: relative;
  color: #000;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
const my_ul = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;

  li{
    margin: 10px 0;
  }
`;

const OnVisibleText = styled(OnVisible)`
  & > *:not([data-ignore-transition]){
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
    opacity: 0.01;
    transform: translateY(40px);
    transition-delay: ${props => `${1 + (props.offset || 0)}s`};
    
  }
  /* & > * > *{
      transition: transform 0.5s ease-out, opacity 0.5s ease-out;
      opacity: 0.01;
      transform: translateY(40px);
      transition-delay: ${props => `${1 + (props.offset || 0)}s`};
    } */

  & > *:nth-child(1){
    transition-delay: ${props => `${0.1 + (props.offset || 0)}s`};
  }
  & > *:nth-child(2){
    transition-delay: ${props => `${0.2 + (props.offset || 0)}s`};
  }
  & > *:nth-child(3){
    transition-delay: ${props => `${0.3 + (props.offset || 0)}s`};
  }
  & > *:nth-child(4){
    transition-delay: ${props => `${0.4 + (props.offset || 0)}s`};
  }
  & > *:nth-child(5){
    transition-delay: ${props => `${0.5 + (props.offset || 0)}s`};
  }
  & > *:nth-child(6){
    transition-delay: ${props => `${0.6 + (props.offset || 0)}s`};
  }
  & > *:nth-child(7){
    transition-delay: ${props => `${0.7 + (props.offset || 0)}s`};
  }
  & > *:nth-child(8){
    transition-delay: ${props => `${0.8 + (props.offset || 0)}s`};
  }
  & > *:nth-child(9){
    transition-delay: ${props => `${0.9 + (props.offset || 0)}s`};
  }
  & > *:nth-child(10){
    transition-delay: ${props => `${1 + (props.offset || 0)}s`};
  }
/*   
  & > * {
    & > *:nth-child(1){
    transition-delay: ${props => `${0.1 + (props.offset || 0)}s`};
  }
  & > *:nth-child(2){
    transition-delay: ${props => `${0.2 + (props.offset || 0)}s`};
  }
  & > *:nth-child(3){
    transition-delay: ${props => `${0.3 + (props.offset || 0)}s`};
  }
  & > *:nth-child(4){
    transition-delay: ${props => `${0.4 + (props.offset || 0)}s`};
  }
  & > *:nth-child(5){
    transition-delay: ${props => `${0.5 + (props.offset || 0)}s`};
  }
  & > *:nth-child(6){
    transition-delay: ${props => `${0.6 + (props.offset || 0)}s`};
  }
  & > *:nth-child(7){
    transition-delay: ${props => `${0.7 + (props.offset || 0)}s`};
  }
  & > *:nth-child(8){
    transition-delay: ${props => `${0.8 + (props.offset || 0)}s`};
  }
  & > *:nth-child(9){
    transition-delay: ${props => `${0.9 + (props.offset || 0)}s`};
  }
  & > *:nth-child(10){
    transition-delay: ${props => `${1 + (props.offset || 0)}s`};
  }
  } */

  &.visible *{
    opacity: 1;
    transform: translateY(0px);
  }
  &.visible.hidden *{
    transition-delay: 0s;
    opacity: 0;
  }
`;

const Style = {
  a: my_a,
  ul: my_ul,
  OnVisibleText: OnVisibleText
};

export default Style;
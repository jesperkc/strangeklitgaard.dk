
import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const logo_css = css`
  width: auto;
  margin-left: 20px;
  height: 20px;
  @media (min-width: 700px){
    height: 30px;
  }
  overflow: visible;
  position: relative;
`;

export const LogoWrapper = styled('div')`
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 20px;
  @media (min-width: 700px){
    top: 30px;
  }
  width: 100%;
  font-size: 0;

    polygon{
        fill: ${props => props.color};
    }
`;

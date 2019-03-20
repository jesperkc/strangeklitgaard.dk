import styled from "@emotion/styled";
import { responsiveParam, responsiveWidth, settings } from './settings';





// Grid

export const Container = styled("div")`
  //border: 1px solid red;

  ${responsiveParam('margin', settings.grid.containerMarginMin, settings.grid.containerMargin)}
  
  ${settings.scaleAboveDesktop === true ? `
  ` : `
  
  @media (min-width: ${settings.baseWidth + (settings.baseWidth * (settings.grid.containerMargin / settings.baseWidth) * 2)}px){
    margin: 0 auto !important;
  }
  max-width: ${settings.baseWidth}px;
  `}
`;

// Row
export const Row = styled("div")`
  ${responsiveParam('margin', -settings.grid.containerMarginMin, -settings.grid.containerMargin)}
  ${responsiveParam('padding', settings.grid.containerMarginMin, settings.grid.containerMargin)}
  display: flex;
  flex-wrap: ${props => props.wrap};
`;



export const Cell = styled("div")`
  min-height: 80px;
  border: 1px solid green;
  flex: 1 1 auto;
`;

for (var i = 1; i < settings.grid.rows + 1; i++) {
  Cell[`x${i}`] = styled("div")`
  min-height: 80px;
  border: 1px solid green;
  flex: 1 1 auto;
  max-width: ${i * (100 / settings.grid.rows)}%;
`;
}

export const CellGutter = styled("div")`
  flex: 1 1 auto;
`;

for (var i = 1; i < 4 + 1; i++) {
  CellGutter[`x${i}`] = styled("div")`
    ${responsiveWidth('width', settings.spacers.min * i, settings.spacers.max * i)}
  `;
}



export const Spacer = styled("div")`
  ${responsiveWidth('width', settings.spacers.min, settings.spacers.max)}
  ${responsiveWidth('height', settings.spacers.min, settings.spacers.max)}
  @media (max-width: ${props => props.break}){
    width: 100%;
  }
`;
for (var i = 1; i < settings.spacers.count + 1; i++) {
  Spacer[`x${i}`] = styled("div")`
    ${responsiveWidth('width', settings.spacers.min * i, settings.spacers.max * i)}
    ${responsiveWidth('height', settings.spacers.min * i, settings.spacers.max * i)}

    @media (max-width: ${props => props.break}){
      width: 100%;
    }
  `;
}

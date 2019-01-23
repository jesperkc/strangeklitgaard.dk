import styled from "@emotion/styled";

// Settings
const baseDesktopWidth = 1200;
const scaleAboveDesktop = true;
const useRem = false;

// Grid
const rows = 12;
const containerMaxWidth = 1400;
const containerMargin = 50;
const containerMarginMin = 30;

// Spacers
const spacers = 4;
const spaceMin = 10;
const spaceMax = 20;
//

// Helper functions
const fontSize = size => useRem ? `${size / 16}rem` : `${size}px`;
const fontSizeInBetween = size => useRem ? `calc(1rem + ${(size - 16) / baseDesktopWidth * 100}vw)` : `${size / baseDesktopWidth * 100}vw`;

const responsiveFontSize = (minFontSize, maxFontSize) => `
    font-size: ${fontSize(minFontSize)};
    
    @media (min-width: ${minFontSize / (maxFontSize / baseDesktopWidth * 100) * 100}px) {
        font-size: ${fontSizeInBetween(maxFontSize)};
    }
    ${scaleAboveDesktop ? `
    ` : `
    @media (min-width: ${baseDesktopWidth}px) {
        font-size: ${fontSize(maxFontSize)};
    }
    `}
`;

const responsiveParam = (param, min, max) => `
    ${param}: 0 ${min}px;
    
    @media (min-width: ${min / (max / baseDesktopWidth * 100) * 100}px) {
        ${param}: 0 ${max / baseDesktopWidth * 100}vw;
    }
    ${scaleAboveDesktop ? `
    ` : `
    @media (min-width: ${baseDesktopWidth}px) {
        ${param}: 0 ${max}px;
    }
    `}
`;
const responsiveWidth = (param, min, max) => `
    ${param}: ${min}px;
    
    @media (min-width: ${min / (max / baseDesktopWidth * 100) * 100}px) {
        ${param}: ${max / baseDesktopWidth * 100}vw;
    }
    ${scaleAboveDesktop ? `
    ` : `
    @media (min-width: ${baseDesktopWidth}px) {
        ${param}: ${max}px;
    }
    `}
`;


//

// Grid
const Grid = {}

export const Container = styled("div")`
  //border: 1px solid red;

  ${responsiveParam('margin', containerMarginMin, containerMargin)}
  
  ${scaleAboveDesktop ? `
  ` : `
  
  @media (min-width: ${baseDesktopWidth + (baseDesktopWidth * (containerMargin / baseDesktopWidth) * 2)}px){
    margin: 0 auto !important;
  }
  max-width: ${baseDesktopWidth}px;
  `}
`;
Grid.container = Container;

export const Row = styled("div")`
  ${responsiveParam('margin', -containerMarginMin, -containerMargin)}
  ${responsiveParam('padding', containerMarginMin, containerMargin)}
  display: flex;
`;



export const Cell = styled("div")`
  min-height: 80px;
  border: 1px solid green;
  flex: 1 1 auto;
`;

for (var i = 1; i < rows + 1; i++) {
  Cell[`x${i}`] = styled("div")`
  min-height: 80px;
  border: 1px solid green;
  flex: 1 1 auto;
  max-width: ${i * (100 / rows)}%;
`;
}

export const CellGutter = styled("div")`
  flex: 1 1 auto;
`;

for (var i = 1; i < 4 + 1; i++) {
  CellGutter[`x${i}`] = styled("div")`
    ${responsiveWidth('width', spaceMin * i, spaceMax * i)}
  `;
}


export const Spacer = styled("div")`
  ${responsiveWidth('height', spaceMin, spaceMax)}
  background-color: rgba(0,0,0,.05);
`;
for (var i = 1; i < spacers + 1; i++) {
  Spacer[`x${i}`] = styled("div")`
    ${responsiveWidth('height', spaceMin * i, spaceMax * i)}
    background-color: rgba(0,0,0,.05);
  `;
}

export const H1 = styled("div")`
  ${responsiveFontSize(30, 80)};
`;

export const P = styled("div")`
  ${responsiveFontSize(16, 18)};
`;


export default Grid;
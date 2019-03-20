
// Settings
export const settings = {
  baseWidth: 1200,
  scaleAboveDesktop: true,
  useRem: false,

  grid: {
    rows: 12,
    containerMaxWidth: 1400,
    containerMargin: 50,
    containerMarginMin: 30
  },
  spacers: {
    count: 4,
    min: 10,
    max: 20
  },
  typo: {
    h1: {
      min: 70 * .6,
      max: 70,
      height: 1.2,
      weight: 600,
    },
    h2: {
      min: 60 * .6,
      max: 60,
      height: 1.1,
      weight: 300,
    },
    h3: {
      min: 40 * .6,
      max: 40,
      height: 1,
      weight: 300,
    },
    h4: {
      min: 30 * .6,
      max: 30,
      height: 1,
      weight: 300,
    },
    h5: {
      min: 26 * .6,
      max: 26,
      height: 1,
      weight: 300,
    },
    h6: {
      min: 20 * .6,
      max: 20,
      height: 1,
      weight: 300,
    },
    p: {
      min: 18,
      max: 20,
      height: 1.3,
      weight: 300,
    },
    input: {
      min: 16,
      max: 20,
      height: 1.3,
      weight: 300,
    }
  }
}



// Helper functions
const fontSize = size => settings.useRem ? `${size / 16}rem` : `${size}px`;
const fontSizeInBetween = size => settings.useRem ? `calc(1rem + ${(size - 16) / settings.baseWidth * 100}vw)` : `${size / settings.baseWidth * 100}vw`;

/*

letter-spacing: x.xxem;
word-spacing: x.xxem;
text-transform: uppercase;

text-rendering: optimizeLegibility

*/
export const responsiveFont = ({ min, max, height, weight }) => `
    font-size: ${fontSize(min)};
    line-height: ${height};
    font-weight: ${weight};
    margin-top: 1.6rem;
    margin-bottom: .8rem;

    @media (min-width: ${min / (max / settings.baseWidth * 100) * 100}px) {
        font-size: ${fontSizeInBetween(max)};
    }
    ${settings.scaleAboveDesktop === true ? `
    ` : `
    @media (min-width: ${settings.baseWidth}px) {
        font-size: ${fontSize(max)};
    }
    `}
`;

export const responsiveParam = (param, min, max) => `
    ${param}: 0 ${min}px;
    
    @media (min-width: ${min / (max / settings.baseWidth * 100) * 100}px) {
        ${param}: 0 ${max / settings.baseWidth * 100}vw;
    }
    ${settings.scaleAboveDesktop === true ? `
    ` : `
    @media (min-width: ${settings.baseWidth}px) {
        ${param}: 0 ${max}px;
    }
    `}
`;
export const responsiveWidth = (param, min, max) => `
    ${param}: ${min}px;
    
    @media (min-width: ${min / (max / settings.baseWidth * 100) * 100}px) {
        ${param}: ${max / settings.baseWidth * 100}vw;
    }
    ${settings.scaleAboveDesktop === true ? `
    ` : `
    @media (min-width: ${settings.baseWidth}px) {
        ${param}: ${max}px;
    }
    `}
`;


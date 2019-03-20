import styled from "@emotion/styled";
import { responsiveFont, settings } from "./settings";


export const H1 = styled("h1")`
  margin-top: 0;
  ${responsiveFont(settings.typo.h1)};
`;

export const H2 = styled("h2")`
  margin-top: 0;
  ${responsiveFont(settings.typo.h2)};
`;

export const H3 = styled("h3")`
  margin-top: 0;
  ${responsiveFont(settings.typo.h3)};
`;

export const H4 = styled("h4")`
  margin-top: 0;
  ${responsiveFont(settings.typo.h4)};
`;

export const H5 = styled("h5")`
  margin-top: 0;
  ${responsiveFont(settings.typo.h5)};
`;

export const H6 = styled("h6")`
  margin-top: 0;
  ${responsiveFont(settings.typo.h6)};
`;

export const P = styled("p")`
  ${responsiveFont(settings.typo.p)};
`;

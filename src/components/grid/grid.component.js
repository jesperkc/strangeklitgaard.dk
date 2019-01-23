import styled from "@emotion/styled";



const Container = styled('div')`
  min-height: 100%;
  width: 90vw;
  left: 5vw;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  padding: 0 40px;
`;

const Row = styled('div')`
  display: flex;
  min-height: 100%;
  min-width: 100%;
`;

const Cell = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  max-width: 100%;
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
`;

const CellSpacer = styled('div')`
  flex: 1;
`;

const Grid = {
  Container,
  Row,
  Cell,
  CellSpacer
};

export default Grid;
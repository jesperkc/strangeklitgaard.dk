// import React from 'react';
// import styled from "@emotion/styled";
// import Grid from '../grid/grid.component';

// class CaseSection extends React.Component {

//   constructor() {
//     super();

//     this.state = {
//       fixedTop: false,
//       offset: 0
//     };

//     this.scrollChange = this.scrollChange.bind(this);
//   }

//   scrollChange(percentage, inView) {
//     if (inView) {
//       console.log(percentage, inView);
//     }
//     //this.setState({ offset: percentage - .5 });

//     if (percentage >= .5) {
//       this.setState({ normalClassName: '' });
//     } else {
//       this.setState({ normalClassName: 'hidden' });
//     }
//   }
//   render() {

//     return (<StyledSection backgroundColor={this.props.backgroundColor} color={this.props.logoColor}>
//       {/* <StickyContainer
//         className="container"
//       > */}
//       {/* <Sticky>
//           {({ style }) => (
//             <CaseDetails style={{ ...style }} title={this.props.title} />
//           )}

//         </Sticky> */}

//       <CaseContents />
//       <CaseContents />
//       <CaseContents />
//       <CaseContents />
//       {/* </StickyContainer> */}


//     </StyledSection>)
//   }
// }

// const CaseDetails = ({ title }) => (
//   <WhiteContainer>
//     <Grid.Container>
//       <div>{title}</div>
//       <div>Case description</div>
//     </Grid.Container>
//   </WhiteContainer>
// )
// const CaseContents = ({ progress }) => (
//   <Grid.Container progress={progress}>
//     <img src="https://cdn.dribbble.com/users/746931/screenshots/5156964/arquito_concept_1.jpg" />
//   </Grid.Container>
// )


// const WhiteContainer = styled('div')`
// /* display: flex; */
// height: 20vh;
// width: 100vw;
// padding: 80px 40px;
// top: 0;
// background-color: #fff;
// color: ${props => props.color};
// `;

// const StyledSection = styled('div')`
// /* display: flex; */
// min-height: 100vh;
// /* justify-content: center;
// align-items: center; */
// /* padding: 80px 40px; */
// position: relative;
// background-color: ${props => props.backgroundColor};
// background-blend-mode: soft-light;
// background-image: linear-gradient(45deg,#000,#bb8e55);
// /* background-attachment: fixed; */
// color: ${props => props.color};
// `;

// export default CaseSection;
import styled from "@emotion/styled";
import React from 'react';
import Contact from '../components/contact/contact.component';
import HiScroll from '../components/contact/hi-scroll.component';
// import Hero from '../components/hero/hero.component';
import Layout from '../components/layouts/';
import Section from '../components/section/section.component';

const colorCombinations = [
  ['#17A1A0', '#0E2750', 'hej'],
  ['#f772a1', '#076250', 'hey.'],
  ['#5f0e8c', '#FCD02C', 'hola..'],
  ['#B1DADE', '#AD184F', 'hello..'],
  ['#FB635A', '#B9DFE8', 'hi'],
]

const getSay = () => {
  const says = [
    'HEJ',
    'HI',
    'HOLA',
    'HELLO',
  ]
  //return 'SAY HI.'
  return 'SAY ' + says[Math.floor(Math.random() * says.length)];
}

const IndexPage = props => (
  <Layout location={props.location}>
    {/* <Section backgroundColor={'#fff'} logoColor={'#000'} logo={''}>
      <Hero />
    </Section> */}
    {/* <CaseSection backgroundColor={'transparent'} logoColor={'#fff'} logo={'full'} title={'Kontrapunkt'} description={'Corporate website'} url={'kontrapunkt.com'}></CaseSection>
    <CaseSection backgroundColor={'#5DD39E'} logoColor={'#BCE784'} logo={'stripes'} title={'Bunker One'} description={'Corporate website'} url={'bunkerone.com'}></CaseSection>
    <CaseSection backgroundColor={'#348AA7'} logoColor={'#5DD39E'} logo={'full'} title={'Danish Crown'} description={'Design hub'}></CaseSection> */}
    {/* <Section backgroundColor={'#BCE784'} logoColor={'#fff'} logo={'stripes'} title={'Case 2'}></Section>
    <Section backgroundColor={'#348AA7'} logoColor={'#BCE784'} logo={'full'} title={'Case 2'} marginBottom={'40vh'}></Section> */}
    <Section backgroundColor={'#f7f3f0'} color={'#000'} logoColor={'#000'} logo={'full'}><Contact say={'Say hej!'} /></Section>
    {/* <Section backgroundColor={'#000'} color={'#fff'} logoColor={'#000'} logo={'full'}><HiScroll say={'Say hi!'} /></Section> */}
    {colorCombinations.map((color) => <Section key={color} backgroundColor={color[0]} color={color[1]} logoColor={'#000'} logo={'full'}><Contact say={`Say ${color[2]}`} /></Section>)}
    <Section backgroundColor={'#000'} color={'#fff'} logoColor={'#000'} logo={'full'}><Contact say={'Say hi!'} /></Section>
    <BG></BG>
  </Layout>
)

const BG = styled('div')`
  position: fixed;
  top: 0;
  /* background-image: linear-gradient(45deg, red, blue); */
`;

export default IndexPage

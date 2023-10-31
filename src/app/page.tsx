import Image from 'next/image'
import styles from './page.module.scss'
import Contact from '@/components/contact.component'
import Section from '@/components/section.component'

export default function Home() {
  const colorCombinations = [
    ['#17A1A0', '#0E2750', 'hej'],
    ['#f772a1', '#076250', 'hey.'],
    ['#5f0e8c', '#FCD02C', 'hola..'],
    ['#B1DADE', '#AD184F', 'hello..'],
    ['#FB635A', '#B9DFE8', 'hi'],
  ]

  const getSay = () => {
    const says = ['HEJ', 'HI', 'HOLA', 'HELLO']
    //return 'SAY HI.'
    return 'SAY ' + says[Math.floor(Math.random() * says.length)]
  }

  return (
    <main className={styles.main}>
      <Section
        backgroundColor={'#f7f3f0'}
        color={'#000'}
        logoColor={'#000'}
        logo={'full'}
      >
        <Contact say={'Say hej!'} />
      </Section>
      {colorCombinations.map((color) => (
        <Section
          key={color}
          backgroundColor={color[0]}
          color={color[1]}
          logoColor={'#000'}
          logo={'full'}
        >
          <Contact say={`Say ${color[2]}`} />
        </Section>
      ))}
      <Section
        backgroundColor={'#000'}
        color={'#fff'}
        logoColor={'#000'}
        logo={'full'}
      >
        <Contact say={'Say hi!'} />
      </Section>
    </main>
  )
}

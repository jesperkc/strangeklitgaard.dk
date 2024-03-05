import styles from './page.module.scss'
import Contact from '@/components/contact.component'
import Section from '@/components/section.component'
import Badge from '@/components/badge.component-cloth'
import ClientsScene from '@/components/clients.component'

export default function Home() {
  const colorCombinations = [
    ['#17A1A0', '#0E2750', 'hej'],
    ['#f772a1', '#076250', 'hey'],
    ['#5f0e8c', '#FCD02C', 'hola'],
    ['#B1DADE', '#AD184F', 'hello'],
    ['#FB635A', '#B9DFE8', 'hi'],
  ]

  const getSay = () => {
    const says = ['HEJ', 'HI', 'HOLA', 'HELLO']
    //return 'SAY HI.'
    return 'SAY ' + says[Math.floor(Math.random() * says.length)]
  }
  // Hey there! I'm [Your Name], a frontend developer who's all about creating exciting websites with a strong focus on accessibility. I'm passionate about making the web a more inclusive and engaging place for everyone.

  // Hey there, I'm Jesper, a passionate frontend developer who thrives on the challenge of crafting websites that are both accessible and incredibly exciting. With a deep love for code and a keen eye for design, I'm on a mission to make the web a more user-friendly and visually captivating place.
  return (
    <main className={styles.main}>
      {/* <ClientsScene /> */}
      {/* <Contact say={'Say hej!'} /> */}
      {/* <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.cell}>
              <div className={styles.contactinner}>

                <h1 className={styles.huge}>Yo</h1>
                <br />
              </div>
            </div>
          </div>
        </div> */}

      {/* <Badge /> */}
      {/* <Section
        // backgroundColor={'#f7f3f0'}
        backgroundColor={'#0c2547'}
        color={'#dddddd'}
        logoColor={'#000'}
        logo={'full'}
      >
        <div className={styles.contactwrapper}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.cell}>
                <div className={styles.contactinner}>
                  <h1 className={styles.huge}>Hi</h1>
                  <br />
                  <h2 style={{ width: '50%' }}>
                    I'm Jesper, a passionate frontend developer who thrives on
                    the challenge of crafting websites that are both accessible
                    and incredibly exciting. With a deep love for code and a
                    keen eye for design, I'm on a mission to make the web a more
                    user-friendly and visually captivating place.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section> */}

      {/* {colorCombinations.map((color) => (
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
      </Section> */}
    </main>
  )
}

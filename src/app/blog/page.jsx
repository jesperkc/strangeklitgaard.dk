import styles from '../page.module.scss'
import LabHewro from '@/components/lab-hero.component'
import Section from '@/components/section.component'

import { meta as containerqueries_meta } from '../../../pages/blog/css-container-queries.mdx'
import { meta as wcag_meta } from '../../../pages/blog/wcag/page.mdx'

export default function Home() {
  const colorCombinations = [
    ['#17A1A0', '#0E2750', 'hej'],
    ['#f772a1', '#076250', 'hey'],
    ['#5f0e8c', '#FCD02C', 'hola'],
    ['#B1DADE', '#AD184F', 'hello'],
    ['#FB635A', '#B9DFE8', 'hi'],
  ]

  const posts = [containerqueries_meta, wcag_meta]

  return (
    <main className={styles.main}>
      <Section
        backgroundColor={'#f7f3f0'}
        color={'#000'}
        logoColor={'#000'}
        logo={'full'}
      >
        <LabHewro title={'Go bag'} />
      </Section>

      {posts.map((post) => (
        <Section
          key={post}
          backgroundColor={post.backgroundColor}
          color={post.color}
          logoColor={'#000'}
          logo={'full'}
        >
          <LabHewro {...post} link={`/blog/${post.slug}`} />
        </Section>
      ))}
    </main>
  )
}

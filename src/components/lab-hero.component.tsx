import Link from 'next/link'
import React from 'react'
import styles from '../app/page.module.scss'

const LabHewro = ({ title, desc, link }: any) => (
  <div className={styles.contactwrapper}>
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.cell}>
          <div className={styles.contactinner}>
            {link && (
              <Link href={link}>
                <h1 className={styles.huge}>{title}</h1>
                <p>{desc}</p>
              </Link>
            )}
            {!link && (
              <>
                <h1 className={styles.huge}>{title}</h1>
                <p>{desc}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default LabHewro

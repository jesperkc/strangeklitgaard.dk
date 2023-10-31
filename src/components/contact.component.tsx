import React from 'react'
import styles from '../app/page.module.scss'

const Contact = ({ say }: any) => (
  <div className={styles.contactwrapper}>
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.cell}>
          <div className={styles.contactinner}>
            <div className={styles.huge}>{say}</div>
            <br />
            <div>
              <a href="mailto:jesper@strangeklitgaard.dk" target="_blank">
                jesper@strangeklitgaard.dk
              </a>
            </div>
            <br />
            <div>
              <a href="http://www.twitter.com/jesperkc" target="_blank">
                Twitter
              </a>
            </div>
            <div>
              <a href="http://www.codepen.io/jesperkc" target="_blank">
                CodePen
              </a>
            </div>
            <div>
              <a href="http://www.linkedin.com/in/jesperkc" target="_blank">
                LinkedIn
              </a>
            </div>
            <div>
              <a href="http://www.behance.com/jesperkc" target="_blank">
                Behance
              </a>
            </div>
            <div>
              <a href="http://www.dribbble.com/jesperkc" target="_blank">
                Dribbble
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Contact

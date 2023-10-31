'use client'

import React from 'react'
import styles from '../app/page.module.scss'
// import Overlay from '../overlay/overlay.component';
import { use100vh } from 'react-div-100vh'

export default function Section(props: any) {
  const height = use100vh()
  const halfHeight = height ? height : '100vh'
  const style = {
    '--backgroundcolor': props.backgroundColor,
    '--color': props.color,
    height: halfHeight,
  } as React.CSSProperties

  return (
    <div className={styles.section} style={style}>
      {props.children}
    </div>
  )
}

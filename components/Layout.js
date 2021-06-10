import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Layout(props){
    const router = useRouter();
    return (
        <div className={styles.container}>
          <div className={styles.circle}></div>
          <div className={styles.contentHeader}>
            <img src={`/images/nobg.png`} className={styles.mainLogo}></img>
            <span className={styles.txtTitle}>
              GlueToken&nbsp;
              <span style={{color: 'gold', display: 'flex', alignItems: 'center'}}>
                C<img src={`/images/gg.png`}  alt=""
                className={styles.txtO} />in
              </span> 
            </span>
          </div>

          <div className={styles.navbar}>
            <span className={router.pathname=="/all"?styles.active:null} onClick={()=>router.push("/all")}>เหรียญทั้งหมด</span>
            <span className={router.pathname=="/"?styles.active:null} onClick={()=>router.push("/")}>มาแรงในช่วงเวลานี้</span>
          </div>

          {props.children}
      </div>
    );
}

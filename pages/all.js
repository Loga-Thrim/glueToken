import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function Home(props) {
    const router = useRouter();
    const [list, setList] = useState([]);

    useEffect(()=>{
        axios({
            method: "GET",
            url: "https://api.cnhnt.cc/public/getAllCoinsApproved?from=0&size=20"
        }).then(res=>{
          res.data.res.forEach((item, index)=>{
            const lNew = new Date(1 * item.launchDate).getTime();
            const nNew = new Date().getTime();

            if(nNew > lNew) var milisec_diff = nNew - lNew;
            else var milisec_diff = lNew - nNew;

            var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
            var date_diff = new Date( milisec_diff );
            //console.log(days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds")

            if(lNew < nNew) res.data.res[index]["diff"] = "" + days + " วัน "+ date_diff.getHours() + " ชั่วโมง";
            else res.data.res[index]["diff"] = "เปิดตัวในอีก " + days + " วัน "+ date_diff.getHours() + " ชั่วโมง";

            res.data.res[index].launchDate = new Date(1 * item.launchDate).toUTCString();
          })
          setList(res.data.res);
        })
    }, [])

    return(
        <Layout>
          <div className={styles.content}>
            <div className={styles.boxTableHead}>
              <div></div>
              <span></span>
              <div className={styles.marketCap}>
                <b>มูลค่าตลาด ฿(1:32)</b>
              </div>
              <div className={styles.time}>
                <b>เวลาเปิดตัว</b>
              </div>
            </div>
            {
              list.map((item, index)=>
              <div key={index}>
                <div className={styles.boxTable} onClick={()=>router.push(`/detail/${item.id}-all`)}>
                    <div><img src={item.logo} className={styles.logo} alt="" /></div>
                    <span>{item.name}</span>
                    <div className={styles.marketCap}>
                      <span>{(item.marketCap * 32).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}฿</span>
                      <span>{(item.marketCap).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$</span>
                    </div>
                    <div className={styles.time}>
                      <span>{item.diff}</span>
                      <span className={styles.launchDate}>{item.launchDate}</span>
                    </div>
                    {/* <div><button type="button" className={styles.btnVote}>{item.votesCount}</button></div> */}
                </div>
                <div style={{background: 'rgba(0, 0, 0, .1)', padding: .1, width: '90%', position: 'relative',
                marginLeft: 'auto', marginRight: 'auto'}}></div>
              </div>
              )
            }
          </div>
        </Layout>
    );
}

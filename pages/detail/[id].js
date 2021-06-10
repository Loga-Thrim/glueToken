import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Detail.module.css';
import Copy from 'react-copy-to-clipboard';

import { AiOutlineCopy } from 'react-icons/ai';
import { BsCheckAll } from 'react-icons/bs';

export default function Detail(){
    const router = useRouter();
    const id = router.query.id ? router.query.id.split("-") : [];
    const [list, setList] = useState({});
    const [copied, setCopied] = useState(false);

    useEffect(()=>{
        if(id.length > 0) axios.get(`https://api.cnhnt.cc/public/getCoinById/${id[0]}`).then(res=>{
            if(res.status === 200) setList(res.data.res[0]);
        })
    }, [id])

    useEffect(()=>{
        if(copied) setTimeout(()=>setCopied(false), 1000)
    }, [copied])

    return (
        <div className={styles.container}>
            <div className={styles.divBack}>
                <button type="button" onClick={()=>router.push(id[1]=='all'?`/all`:'/')} 
                className={styles.btnBack}>{`<--`} Back to home</button>
            </div>
            <div className={styles.content}>
                <div className={styles.panelLeft}>
                    <img src={list ? list.logo : null} className={styles.logo} alt="" /> <br/><br/>
                    <span className={styles.txtName}>{list ? list.name : null}</span> 
                    <span className={styles.txtSymbol}>{list ? list.symbol : null}</span>
                    <br/><br/>
                    {
                        list ? list.links ? list.links.map((item, index)=>
                            <a href={item.value} target="blank" className={styles.btnSocial}>{item.name}</a>
                        )
                    : null : null}

                    <br/><br/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;{list ? list.description : null}</span> <br/><br/>
                    <span>
                        <span className={styles.txtMarketCap}>& Market Cap</span>
                        <span className={styles.txtMarketCapValue}>
                            &nbsp;&nbsp;{list ? list.marketCap ? (list.marketCap).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : null : null}$
                        </span>
                    </span> <br/><br/>
                    <span>
                        <span className={styles.txtPrice}>$ Price</span> 
                        <span className={styles.txtPriceValue}>&nbsp;&nbsp;{list ? list.price : null}$</span>
                    </span> <br/>
                </div>

                <span style={{padding: '0 1%'}}></span>

                <div className={styles.panelRight}>
                    {
                        list ? list.contracts ? list.contracts.map((item, index)=>
                            <>
                            <h2 className={styles.contractsName}>{item.name}</h2>
                            <div className={styles.boxToken}>
                                <span>{item.value}</span> &nbsp;
                                <Copy text={item.value} onCopy={()=>setCopied(true)}>
                                    {
                                        copied ? <BsCheckAll size={20}></BsCheckAll> : 
                                        <span className={styles.btnCopy}>
                                            <AiOutlineCopy size={20}></AiOutlineCopy>
                                        </span>
                                    }
                                </Copy>
                            </div>
                            <br/><br/>
                            </>
                        ) : null : null
                    }
                </div>
            </div>
        </div>
    );
}
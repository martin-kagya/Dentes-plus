import React from "react"
import styles from './Shop.module.css'
import  candid  from '/shop/candid-7YBRhk5NVV8-unsplash.jpg'
import  candidpack  from '/shop/candid-33AM1lbWadc-unsplash.jpg'
import invisalign from '/shop/candid-FDuefSgoO8E-unsplash.jpg'
import listerine from '/shop/mishaal-zahed-KDJ1TbLDoOo-unsplash.jpg'
import  drugs  from '/shop/the-tonik-5Lbyao5bzbc-unsplash.jpg'
import { useEffect, useState } from "react"

export default function Shop(){
    const shopInventory = [
        {
            name: 'Candid whitener',
            price: '250GHC',
            image: candid
        },
        {
            name: 'Candid Pack',
            price: '400GHC',
            image: candidpack
        },
        {
            name: 'Invisalign',
            price: '180GHC',
            image: invisalign
        },
        {
            name: 'Listerine Mouthwash',
            price: '200GHC',
            image: listerine
        }
    ]
    return(
        <>
            <div>
                <h2>DENTES+</h2>
                <div className={styles.container}>
                    {shopInventory.map((item,cindex) => {
                        return(
                            <div key={cindex}>
                                <img src={item.image}></img>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
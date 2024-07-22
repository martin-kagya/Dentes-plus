import React from "react"
import styles from './Shop.module.css'
import  candid  from '/shop/candid-7YBRhk5NVV8-unsplash.jpg'
import  candidpack  from '/shop/candid-33AM1lbWadc-unsplash.jpg'
import invisalign from '/shop/candid-FDuefSgoO8E-unsplash.jpg'
import listerine from '/shop/mishaal-zahed-KDJ1TbLDoOo-unsplash.jpg'
import { HiOutlineShoppingBag } from "react-icons/hi";
import Button from '../button/Button'
import  drugs  from '/shop/the-tonik-5Lbyao5bzbc-unsplash.jpg'
import {motion} from 'framer-motion'
import { useEffect, useState } from "react"

function Shop(){
    const [cartAdd, setCartAdd] = useState(0)
    const [total, setTotal] = useState(0)
    function AddToCart(price){
        setCartAdd(cartAdd + 1)
        setTotal(prevTotal => prevTotal + price)
        console.log(total)
    }
    function RemoveFromCart(price){
        if(cartAdd && total){
            setCartAdd(cartAdd - 1);
            setTotal(prevTotal => prevTotal - price)
        }
        console.log(total)
    }
    const shopInventory = [
        {
            name: 'Candid whitener',
            description: '',
            price: 250,
            image: candid
        },
        {
            name: 'Candid Pack',
            description: '',
            price: 400,
            image: candidpack
        },
        {
            name: 'Invisalign',
            description: '',
            price: 180,
            image: invisalign
        },
        {
            name: 'Listerine Mouthwash',
            description: 'BEST SELLER',
            price: 200,
            image: listerine
        }
    ]
    const fadeIn = {
        initial: {
            opacity: 0,
            y: 80
        },
        animate: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.25 * index,
                duration: 0.5
            }
        })
    }
    return(
        <>
            <div>
                <div className={styles.subcontainer}>
                    <p className={styles.header}>DENTES+</p>
                    <div className={styles.cartContainer}>
                        <HiOutlineShoppingBag size={25} className={styles.cartIcon}/>
                        {cartAdd > 0 && <span className={styles.badge}>{cartAdd}</span>}
                    </div>
                </div>
                <div className={styles.container}>
                    {shopInventory.map((item,cindex) => {
                        return(
                            <motion.div
                                variants={fadeIn}
                                initial='initial'
                                whileInView='animate'
                                viewport={{
                                    once: false
                                }}
                                custom={cindex}
                                key={cindex} 
                                className={styles.polaroid}
                                >
                                <img src={item.image}></img>
                                <div className={styles.info}>
                                    <div>
                                        <p className={styles.ItemName}>{item.name}</p>
                                        <p className={styles.describe}>{item.description}</p>
                                        <p>{item.price}GHC</p>
                                    </div>
                                    <div className={styles.cart}>
                                        <button onClick={() => AddToCart(item.price)}>+</button>
                                        <button onClick={() => RemoveFromCart(item.price)}>-</button>
                                    </div>
                                    
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Shop;
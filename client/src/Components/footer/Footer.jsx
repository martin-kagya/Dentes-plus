import React, { useState } from 'react'
import styles from './Footer.module.css'

function Footer(){
    const groupMembers = [{
        name: "Runny",
        indexNumber: "7111721"
    },
    {
        name: "Jesse", 
        indexNumber: "7108721"
    },
    {
            name: "Martin",
            indexNumber: "7089721"
    },
    {
            name: "Sedem",
            indexNumber: "7091521"
    },
    {
            name: "Shankara",
            indexNumber: "7090621"
    },
    {
            name: "Iddriss", 
            indexNumber: "71039721"
    },
    {
            name: "Daveroy",
            indexNumber: "7093321"
    },
    {
            name: "Asare Kodua",
            indexNumber: "7110321"
    },
    {
            name: "Seedorf",
            indexNumber: "7107211"
    },
    {
            name: "Patrick",
            indexNumber: "7095821"
    },
    {
            name: "William",
            indexNumber: "7095521"
    },
    {
            name: "Nasir",
            indexNumber: "7112021"
    }

]
    return(
        <div className={styles.footer}>
            <div className={styles.group}>
            {
                groupMembers.map(member => {
                    return(
                        <div className={styles.name}>
                            <a>{member.name}</a>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Footer;
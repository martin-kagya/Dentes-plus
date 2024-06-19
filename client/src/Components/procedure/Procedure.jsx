import React, { useState } from "react";
import styles from "./Procedure.module.css";
import { IoIosAddCircle } from "react-icons/io";

function Procedure() {
    const [visibleId, setVisibleId] = useState(null);

    const listItem = [
        {
            id: 1,
            title: "COSMETIC AND ELECTIVE DENTISTRY",
            about: "Get ready to smile like you mean it",
            subservices: ["COSMETIC DENTISTRY", "DIGITAL SMILE DESIGN", "TEETH WHITENING", "PORCELAIN VENEERS", "INVISALIGN", "DENTAL IMPLANTS"]
        },
        {
            id: 2,
            title: "PREVENTIVE & GENERAL DENTISTRY",
            about: "Stabilize and maintain for a lifetime of healthy smiles",
            subservices: ["DENTAL CLEANINGS", "DENTAL EXAMS", "SEALANTS"],
        },
        {
            id: 3,
            title: "RESTORATIVE DENTISTRY",
            about: "Get your smile back to its best",
            subservices: ["CROWNS", "BRIDGES", "DENTURES", "ROOT CANALS"]
        }
    ];

    const toggleVisibility = (id) => {
        setVisibleId(visibleId === id ? null : id);
    };

    const list = listItem.map(procedure => (
        <li key={procedure.id} className={styles.procedureItem}>
            <div className={styles.procedureHeader}>
                <p>{procedure.title}</p>
                <IoIosAddCircle size={20} onClick={() => toggleVisibility(procedure.id)} />
            </div>
        </li>
    ));

    return (
        <div className={visibleId ? styles.blurBackground : ''}>
            <section className={styles.container}>
                <h3>LEARN MORE ABOUT THE PROCEDURES WE OFFER</h3>
                <ul>{list}</ul>
            </section>
            {visibleId && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h4>{listItem.find(item => item.id === visibleId).title}</h4>
                        <p>{listItem.find(item => item.id === visibleId).about}</p>
                        <ul>
                            {listItem.find(item => item.id === visibleId).subservices.map(subservice => (
                                <li key={subservice}>{subservice}</li>
                            ))}
                        </ul>
                        <button className={styles.closeButton} onClick={() => setVisibleId(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Procedure;

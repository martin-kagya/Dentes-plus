import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    const groupMembers = [
        { name: "Runny", indexNumber: "7111721" },
        { name: "Jesse", indexNumber: "7108721" },
        { name: "Martin", indexNumber: "7089721" },
        { name: "Sedem", indexNumber: "7091521" },
        { name: "Shankara", indexNumber: "7090621" },
        { name: "Iddriss", indexNumber: "7139721" },
        { name: "Daveroy", indexNumber: "7093321" },
        { name: "Asare Kodua", indexNumber: "7110321" },
        { name: "Seedorf", indexNumber: "7107211" },
        { name: "Patrick", indexNumber: "7095821" },
        { name: "William", indexNumber: "7095521" },
        { name: "Nasir", indexNumber: "7112021" }
    ];

    // Function to split array into chunks
    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    // Split groupMembers into 3 columns
    const columns = chunkArray(groupMembers, Math.ceil(groupMembers.length / 3));

    return (
        <div className="wrapper" id='contact'>
            <footer className={styles.footer}>
                <div className={styles.group}>
                    {columns.map((column, colIndex) => (
                        <div key={colIndex} className={styles.column}>
                            {column.map((member, index) => (
                                <div key={index} className={styles.footerStyle}>
                                    <div className={styles.name}>
                                        <a>{member.name}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={styles.copyright}>
                    <p>&copy; 2024 DENTES PLUS. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

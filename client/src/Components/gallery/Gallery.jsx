import React from 'react';
import styles from './Gallery.module.css';

const images = [
  '/images/enis-yavuz-QT7ytJJwAnY-unsplash.jpg',
  '/images/jonathan-borba-hl6uG9cHW5A-unsplash.jpg',
  '/images/kari-bjorn-photography-yJsMOVwazRU-unsplash.jpg',
  '/images/jonathan-borba-v_2FRXEba94-unsplash.jpg',
  '/images/quang-tri-nguyen-Xi1odIx4i2s-unsplash.jpg',
];

const Gallery = () => {
  return (
    <div className={styles.parent}>
      <div className={`${styles.div1} ${styles.first}`}>
        <img src={images[0]} style={{ borderRadius: 0, width: '100%', height: '100%' }} alt="Image 1" />
        <div className={styles.overlay}>
          <div className={styles.overlayText}>DENTAL PRODUCTS</div>
        </div>
      </div>
      <div className={`${styles.div2} ${styles.first}`}>
        <img src={images[1]} style={{ borderRadius: 0, width: '100%', height: '100%' }} alt="Image 2" />
        <div className={styles.overlay}>
          <div className={styles.overlayText}>DENTAL CHECKUPS</div>
        </div>
      </div>
      <div className={`${styles.div3} ${styles.first}`}>
        <img src={images[2]} style={{ borderRadius: 0, width: '100%', height: '100%' }} alt="Image 3" />
        <div className={styles.overlay}>
          <div className={styles.overlayText}>MODERN EQUIPMENTS</div>
        </div>
      </div>
      <div className={`${styles.div4} ${styles.first}`}>
        <img src={images[3]} style={{ borderRadius: 0, width: '100%', height: '100%' }} alt="Image 4" />
        <div className={styles.overlay}>
          <div className={styles.overlayText}>DENTAL ANALYSIS</div>
        </div>
      </div>
      <div className={`${styles.div6} ${styles.first}`}>
        <img src={images[4]} style={{ borderRadius: 0, width: '100%', height: '100%' }} alt="Image 5" />
        <div className={styles.overlay}>
          <div className={styles.overlayText}>TOOTH EXTRACTION</div>
        </div>
      </div>
      <div className={styles.div8}>DENTES PLUS</div>
    </div>
  );
};

export default Gallery;

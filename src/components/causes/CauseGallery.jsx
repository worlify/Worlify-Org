import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import styles from '../../styles/CausePage.module.css';

export default function CauseGallery({ gallery, causeTitle }) {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>FIELD VISUALS</span>
          <h2 className={styles.sectionTitle}>{causeTitle} Impact Gallery</h2>
          <p className={styles.sectionSubtitle}>
            Moments of hope, transformation, and direct impact documented from our work in the field.
          </p>
        </div>

        {/* Gallery Grid (Desktop) / Touch Scroll (Mobile) */}
        <div className={styles.galleryGrid}>
          {gallery.map((item, idx) => (
            <div 
              key={idx} 
              className={styles.galleryCard}
              onClick={() => setSelectedImg(item)}
            >
              <img 
                src={item.url} 
                alt={item.caption || causeTitle} 
                className={styles.galleryImg}
                loading="lazy"
              />
              <div className={styles.galleryOverlay}>
                <span className={styles.galleryCaption}>{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div className={styles.lightboxModal} onClick={() => setSelectedImg(null)}>
          <div 
            className={styles.lightboxContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.lightboxCloseBtn}
              onClick={() => setSelectedImg(null)}
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>
            <img 
              src={selectedImg.url} 
              alt={selectedImg.caption} 
              className={styles.lightboxImg} 
            />
            <div className={styles.lightboxCaption}>{selectedImg.caption}</div>
          </div>
        </div>
      )}
    </section>
  );
}

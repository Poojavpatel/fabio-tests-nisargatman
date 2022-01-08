import React, {useState, useEffect} from 'react';
import styles from './ImageModal.module.scss';
import Loader from "react-loader-spinner";

function ImageModal({showModal, modalData, setShowModal}) {

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        setShowModal(false);
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])

  if(!showModal) return <></>;
  return (
    <>
      <div 
        className={styles['overlay']}
        onClick={() => setShowModal(false)}
      >
        <div className={styles['modalContent']}>
          <img 
            src={modalData} 
            alt="cat" 
            className={styles['cat']}
          />
        </div>
      </div>
    </>
  )
}
export default ImageModal;
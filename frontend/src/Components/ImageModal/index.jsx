import React, {useEffect} from 'react';
import styles from './ImageModal.module.scss';
const noop = () => {};

function ImageModal({showModal = false, imageUrl = "", setShowModal = noop}) {

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
            src={imageUrl} 
            alt="cat" 
            className={styles['cat']}
          />
        </div>
      </div>
    </>
  )
}
export default ImageModal;
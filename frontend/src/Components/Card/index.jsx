import React, {useState} from 'react';
import styles from './Card.module.scss';
import Loader from "react-loader-spinner";
import CONSTANTS from './constants'
const noop = () => {};

function CardList({cardData = {}, handleDrag = noop, handleDrop = noop, setShowModal = noop, setImageUrl = noop}) {
  const {imageMap} = CONSTANTS;
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      className={styles['card']}
      id={cardData.id}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={(e) => handleDrag(e, cardData)}
      onDrop={(e) => handleDrop(e, cardData)}
      onClick={() => {
        setShowModal(true);
        setImageUrl(imageMap[cardData.type]);
      }}
    >
      {
        !loaded && 
        <div className={styles['loader']}>
          <Loader
            loading={true}
            error={false}
            type="TailSpin"
            color="#A763CA"
            height={50}
            width={50}
          />
        </div>
      }
      <img 
        src={imageMap[cardData.type]} 
        alt="cat" 
        className={styles['cat']}
        style={{display : loaded ? 'inline-block' : 'none'}}
        onLoad={() => {
          setLoaded(true);
        }}
      />
      <div className={styles['title']}>{cardData.title}</div>
    </div>
  )
}
export default CardList;
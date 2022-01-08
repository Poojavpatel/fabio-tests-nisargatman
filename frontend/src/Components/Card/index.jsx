import React, {useState, useEffect} from 'react';
import styles from './Card.module.scss';
import Loader from "react-loader-spinner";
const noop = () => {};

function CardList({cardData = noop, handleDrag = noop, handleDrop = noop, setShowModal = noop, setModalData = noop}) {
  const imageMap = {
    'bank-draft': 'https://i.pinimg.com/564x/16/ca/b1/16cab153397fc070d5369635ba891e8d.jpg',
    'bill-of-lading' : 'https://static.india.com/wp-content/uploads/2015/11/089.jpg?impolicy=Medium_Resize&w=1200&h=800',
    'invoice': 'https://www.rd.com/wp-content/uploads/2020/07/35_No-regrets-1.jpg?fit=700,700',
    'bank-draft-2': 'https://wallpaper.dog/large/10737523.jpg',
    'bill-of-lading-2' : 'https://i.redd.it/i1unzy2wpz311.png'
  };
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      className={styles['card']}
      id={cardData.id}
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={(e) => handleDrag(e, cardData)}
      onDrop={(e) => handleDrop(e, cardData)}
      onClick={() => {
        setShowModal(true);
        setModalData(imageMap[cardData.type]);
      }}
    >
      <div className={styles['title']}>{cardData.title}</div>
      {
        !loaded && 
        <div className={styles['loader']}>
          <Loader
            loading={true}
            error={false}
            type="TailSpin"
            color="#7b2db7"
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
    </div>
  )
}
export default CardList;
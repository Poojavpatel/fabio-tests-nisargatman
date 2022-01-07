import React, {useState, useEffect} from 'react';
import styles from './Card.module.scss';

function CardList({cardData, handleDrag, handleDrop}) {

  const imageMap = {
    'bank-draft': 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
    'bill-of-lading' : 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
    'invoice': 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',
    'bank-draft-2': 'https://media.giphy.com/media/13HBDT4QSTpveU/giphy.gif',
    'bill-of-lading-2' : 'https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif'
  }

  return (
    <div 
      className={styles['card']}
      id={cardData.id}
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={(e) => handleDrag(e, cardData)}
      onDrop={(e) => handleDrop(e, cardData)}
    >
      <div className={styles['title']}>{cardData.title}</div>
      <img src={imageMap[cardData.type]} alt="cat" className={styles['cat']}/>
    </div>
  )
}
export default CardList;
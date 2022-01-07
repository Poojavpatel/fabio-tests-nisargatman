import React, {useState, useEffect} from 'react';
import Card from '../Card';
import documentJson from '../../Static/documents.json'; 
import styles from './CardList.module.scss';

function CardList({}) {
  const [cards, setCards] = useState([]);
  const [draggingCardPosition, setDraggingCardPosition] = useState(null);
  const [draggingCardId, setDraggingCardId] = useState(null);

  const handleDrag = (e, cardData) => {
    setDraggingCardId(e.currentTarget.id);
    setDraggingCardPosition(cardData.position);
  }
  const handleDrop = (e, cardData) => {
    let reordered = [];
    cards.forEach(card => {
      if(card.id == draggingCardId) {
        card.position = cardData.position;
      };
      if(card.id == e.currentTarget.id) {
        card.position = draggingCardPosition;
      };
      reordered.push(card);
    });
    setCards(reordered);
  }

  useEffect(() => {
    setCards(documentJson);
  }, []);

  return (
    <div className={styles['cardsWrapper']}>
      <h1>Cats As Documents</h1>
      <div className={styles['cardlist']}>
      {
        cards && cards.length > 0 && 
        cards.sort((a,b) => a.position - b.position)
        .map((card, index) => (
          <Card
            key={index}
            cardData={card}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        ))
      }
      </div>
    </div>
  )
}
export default CardList;
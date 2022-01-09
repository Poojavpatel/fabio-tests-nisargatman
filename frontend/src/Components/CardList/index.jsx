import React, {useState, useEffect} from 'react';
import Card from '../Card';
import documentJson from '../../Static/documents.json'; 
import styles from './CardList.module.scss';
import ImageModal from "../ImageModal"
import axios from 'axios';

function CardList() {
  const [cards, setCards] = useState([]);
  const [draggingCardPosition, setDraggingCardPosition] = useState(null);
  const [draggingCardId, setDraggingCardId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleDrag = (e, cardData) => {
    setDraggingCardId(e.currentTarget.id);
    setDraggingCardPosition(cardData.position);
  }
  const handleDrop = (e, cardData) => {
    const toPosition = draggingCardPosition;
    const fromPosition = cardData.position;
    let reordered = [];
    cards.forEach(card => {
      if(card.id == draggingCardId) {
        card.position = fromPosition;
      };
      if(card.id == e.currentTarget.id) {
        card.position = toPosition;
      };
      reordered.push(card);
    });
    setCards(reordered);
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/getDocuments')
    .then(response => {
      setCards(response.data);
      // setCards(documentJson);
    })
    .catch(e => console.log('Error in fetching api', e))
  }, []);

  if(!(cards && cards.length)) return <div>No Cards to display</div>

  return (
    <div className={styles['cardsWrapper']}>
      <h1>Cats As Documents</h1>
      <div className={styles['cardlist']}>
      {
        cards.sort((a,b) => a.position - b.position)
        .map((card, index) => (
          <Card
            key={index}
            cardData={card}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            setShowModal={setShowModal}
            setImageUrl={setImageUrl}
          />
        ))
      }
      <ImageModal
        showModal={showModal}
        imageUrl={imageUrl}
        setShowModal={setShowModal}
      />
      </div>
    </div>
  )
}
export default CardList;
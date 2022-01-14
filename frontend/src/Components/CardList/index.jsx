import React, {useState, useEffect} from 'react';
import Card from '../Card';
import documentJson from '../../Static/documents.json'; 
import styles from './CardList.module.scss';
import ImageModal from "../ImageModal"
import axios from 'axios';
import useInterval from "../../hooks/useInterval";
import Loader from "react-loader-spinner";
import config from "../../config/index";
import moment from 'moment';

function CardList() {
  const [cards, setCards] = useState([]);
  const [draggingCardPosition, setDraggingCardPosition] = useState(null);
  const [draggingCardId, setDraggingCardId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [positionsChanged, setPositionsChanged] = useState(false);
  const [updatingPosition, setUpdatingPosition] = useState(false);
  const [lastSaved, setLastSaved] = useState(moment().format("DD/MM/YYYY HH:mm:ss"));

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
    setPositionsChanged(true);
  }

  const updatePositions = () => {
    const positiondata = {};
    cards.forEach(card => {
      positiondata[card.id] = card.position;
    })
    setUpdatingPosition(true);
    axios.post(config.url.updateDocuments, positiondata, {
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
      setPositionsChanged(false);
      const currentTime = moment().format("DD/MM/YYYY HH:mm:ss");
      setLastSaved(currentTime);
    })
    .catch(e => console.log('Error in fetching api', e))
    .finally(setUpdatingPosition(false))
  }

  const checkAndUpdatePositions = () => {
    if(!positionsChanged) return false;
    updatePositions();
  }
 
  useInterval(() => {
    checkAndUpdatePositions()
  }, 5000);

  useEffect(() => {
    axios.get(config.url.getDocuments)
    .then(response => {
      setCards(response.data);
      // setCards(documentJson);
    })
    .catch(e => console.log('Error in fetching api', e))
  }, []);

  if(!(cards && cards.length)) return <div>No Cards to display</div>

  return (
    <>
    <div className={styles['cardsWrapper']}>
      <div className={styles['header']}>
        <h1 className={styles['title']}>Happy Cat Day!</h1>
        <div className={styles['position']}>
          {updatingPosition ? 
            <>
              <span>Updating Positions</span>
              <Loader
                loading={true}
                error={false}
                type="TailSpin"
                color="#fff"
                height={15}
                width={15}
                style={{display: 'inline-block', marginLeft: '12px'}}
              /> 
            </> 
            : <span>Time since last save {moment(moment().diff(moment(lastSaved, "DD/MM/YYYY HH:mm:ss"))).format('mm:ss')}</span>
          }
        </div>
      </div>
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
    </>
  )
}
export default CardList;
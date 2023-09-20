import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsForLearning } from '../../store/reducers/deckSlice';
import { Link } from 'react-router-dom';


const DeckDetail = ({deck, onBack}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const allCardsInDeck = useSelector((state) => state.deck.allCardsInDeck);
    const cardsInReview = useSelector((state) => state.deck.cardsInReview);
    const newCardsForLearning = useSelector((state) => state.deck.newCardsForLearning);

    useEffect(() => {
        if (deck) {
            dispatch(getCardsForLearning(deck._id, user._id));
        }
    }, [deck, dispatch]);


  return (
    <div>
        {deck && (
            <div>
            <h1>{deck.name}</h1>
            <h2>Total Cards</h2>
            <p>{allCardsInDeck ? allCardsInDeck.length : 0}</p>
            <h2>Review</h2>
            <p>{cardsInReview ? cardsInReview.length : 0}</p>
            <h2>New</h2>
            <p>{newCardsForLearning ? newCardsForLearning.length : 0}</p>
            <Link to={`/decks/${deck._id}/study`}>
                <button>Study</button>
            </Link>
            <button onClick={onBack}>Back to Decks</button>
          </div>
        )}
    </div>
  )
}

export default DeckDetail;
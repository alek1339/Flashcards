import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsForLearning } from '../../store/reducers/deckSlice';
import Card from '../../components/card/Card';
import { useParams } from 'react-router-dom';
import DeckStudyReview from '../../components/deckStudyReview/DeckStudyReview';

const StudyDeck = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const newCardsForLearning = useSelector((state) => state.deck.newCardsForLearning);
    const { deckId } = useParams();
  
    useEffect(() => {
      if (deckId) {
        dispatch(getCardsForLearning(deckId, user._id));
      }
    }, [deckId, dispatch, user._id]);
  
    return (
      <DeckStudyReview cards={newCardsForLearning}/>
    )
};

export default StudyDeck;

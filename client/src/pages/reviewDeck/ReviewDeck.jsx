import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardsForLearning } from '../../store/reducers/deckSlice';
import { useParams } from 'react-router-dom';

import DeckStudyReview from '../../components/deckStudyReview/DeckStudyReview';

import { REVIEW_MODE } from '../../constants/modes';

const Review = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cardsInReview = useSelector((state) => state.deck.cardsInReview);
  const [filteredCardsInReview, setFilteredCardsInReview] = useState(cardsInReview);

  const { deckId } = useParams();
  const mode = REVIEW_MODE;

  useEffect(() => {
    if (deckId && user) {
      dispatch(getCardsForLearning(deckId, user._id));
    }
  }, [deckId, dispatch, user]);

  const removeCardFromReview = (cardId) => {
    const updatedCards = filteredCardsInReview.filter((card) => card._id !== cardId);
    setFilteredCardsInReview(updatedCards);
  };

  return (
    <DeckStudyReview cards={filteredCardsInReview} mode={mode} onCardReviewed={removeCardFromReview}/>
  )
}

export default Review
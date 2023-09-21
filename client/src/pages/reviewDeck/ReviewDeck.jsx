import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardsForLearning } from '../../store/reducers/deckSlice';
import { useParams } from 'react-router-dom';

import DeckStudyReview from '../../components/deckStudyReview/DeckStudyReview';

const Review = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cardsInReview = useSelector((state) => state.deck.cardsInReview);
  const state = useSelector((state) => state);
  const { deckId } = useParams();
console.log('state', state);
  useEffect(() => {
    if (deckId) {
      dispatch(getCardsForLearning(deckId, user._id));
    }
  }, [deckId, dispatch, user._id]);

  return (
    <DeckStudyReview cards={cardsInReview}/>
  )
}

export default Review
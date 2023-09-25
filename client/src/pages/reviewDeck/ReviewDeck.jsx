import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardsForLearning } from '../../store/reducers/deckSlice';
import { useParams } from 'react-router-dom';

import DeckStudyReview from '../../components/deckStudyReview/DeckStudyReview';

import { REVIEW_MODE } from '../../constants/modes';

const Review = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cardsInReview = useSelector((state) => state.deck.cardsInReview);
  const { deckId } = useParams();
  const mode = REVIEW_MODE;

  useEffect(() => {
    if (deckId) {
      dispatch(getCardsForLearning(deckId, user._id));
    }
  }, [deckId, dispatch, user._id]);

  return (
    <DeckStudyReview cards={cardsInReview} mode={mode}/>
  )
}

export default Review
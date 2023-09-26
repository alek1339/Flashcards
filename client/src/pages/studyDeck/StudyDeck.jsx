import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsForLearning } from '../../store/reducers/deckSlice';
import { useParams } from 'react-router-dom';
import DeckStudyReview from '../../components/deckStudyReview/DeckStudyReview';
import { STUDY_MODE } from '../../constants/modes';

const StudyDeck = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const newCardsForLearning = useSelector((state) => state.deck.newCardsForLearning);
    const { deckId } = useParams();
    const mode = STUDY_MODE;
  
    useEffect(() => {
      if (deckId) {
        dispatch(getCardsForLearning(deckId, user._id));
      }
    }, [deckId, dispatch, user._id]);
  
    return (
      <DeckStudyReview cards={newCardsForLearning} mode={mode}/>
    )
};

export default StudyDeck;

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsForLearning } from '../../store/reducers/deckSlice';
import { useParams } from 'react-router-dom';
import DeckStudyReview from '../../components/deckStudyReview/DeckStudyReview';
import { STUDY_MODE } from '../../constants/modes';

const StudyDeck = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const newCardsForLearning = useSelector((state) => state.deck.newCardsForLearning);
    const [filteredCardsInLearning, setFilteredCardsInLearning] = useState(newCardsForLearning);
    const { deckId } = useParams();
    const mode = STUDY_MODE;
  
    useEffect(() => {
      if (deckId && user) {
        dispatch(getCardsForLearning(deckId, user._id));
      }
    }, [deckId, dispatch, user]);

    const removeCardFromLearning = (cardId) => {
      const updatedCards = filteredCardsInLearning.filter((card) => card._id !== cardId);
      setFilteredCardsInLearning(updatedCards);
    }
  
    return (
      <DeckStudyReview cards={filteredCardsInLearning} mode={mode} onCardReviewed={removeCardFromLearning} />
    )
};

export default StudyDeck;

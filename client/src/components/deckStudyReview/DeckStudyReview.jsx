
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsForLearning } from "../../store/reducers/deckSlice";
import Card from "../card/Card";
import { useParams } from "react-router-dom";

const DeckStudyReview = ({cards}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { deckId } = useParams();
    const studyCards = cards;
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const cardsInReview = useSelector((state) => state.deck.cardsInReview);
    const newCardsForLearning = useSelector((state) => state.deck.newCardsForLearning);
    const numCardsToStudy = 20;
  
    useEffect(() => {
      if (deckId) {
        dispatch(getCardsForLearning(deckId, user._id));
      }
    }, [deckId, dispatch, user._id]);
  
    // useEffect(() => {
    //   const newStudyCards = [...newCardsForLearning.slice(0, numCardsToStudy), ...cardsInReview];
    //   setStudyCards(newStudyCards);
    // }, [newCardsForLearning, cardsInReview]);
  
    const nextCard = () => {
      if (currentCardIndex < studyCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        // Handle when there are no more cards to study
        // You can show a message or take any other action
      }
    };
  
    return (
      <div>
        <Card card={studyCards[currentCardIndex]} />
        <button onClick={nextCard}>Next Card</button>
      </div>
    );
}

export default DeckStudyReview;
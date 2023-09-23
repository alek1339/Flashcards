
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsForLearning } from "../../store/reducers/deckSlice";
import Card from "../card/Card";
import { useParams } from "react-router-dom";

const DeckStudyReview = ({cards}) => {
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState("");
    const user = useSelector((state) => state.auth.user);
    const { deckId } = useParams();
    const studyCards = cards;
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
    useEffect(() => {
      if (deckId) {
        dispatch(getCardsForLearning(deckId, user._id));
      }
    }, [deckId, dispatch, user._id]);
  
    const nextCard = () => {
      if (currentCardIndex < studyCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        // Handle when there are no more cards to study
        // You can show a message or take any other action
      }
    };

    const handleCancel = () => {
        window.location.href = `/`;
    };

    const handleAnswer = (e) => {
        e.preventDefault();
        setAnswer(e.target.value);
    }

    const handleCorrect = () => {
        // TODO: dispatch(updateCard(studyCards[currentCardIndex]._id, {answer: answer}));
        nextCard();
    };

    const handleIncorrect = () => {
      // TODO: dispatch(updateCard(studyCards[currentCardIndex]._id, {answer: answer}));
      nextCard();
    }

    const handleCheck = () => {
      // TODO: Check if answer is correct
      // TODO: dispatch(updateCard(studyCards[currentCardIndex]._id, {answer: answer}));
      nextCard();
    }
  
    return (
      <div>
        <Card card={studyCards[currentCardIndex]} />
        <textarea onClick={handleAnswer}></textarea>
        <button onClick={handleCheck}>Check</button>
        <button onClick={handleCorrect}>Correct</button>
        <button onClick={handleIncorrect}>Incorrect</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
}

export default DeckStudyReview;
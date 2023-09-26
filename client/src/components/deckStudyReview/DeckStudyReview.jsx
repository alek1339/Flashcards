import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsForLearning } from "../../store/reducers/deckSlice";
import Card from "../card/Card";
import { useParams } from "react-router-dom";
import { isCorrectSentence } from "../../utils/sentenceCorrector";

import {
  createReview,
  updateReviewAction,
} from "../../store/reducers/reviewSlice";

import PropTypes from "prop-types";

import { STUDY_MODE, REVIEW_MODE } from "../../constants/modes";

const DeckStudyReview = ({ cards, mode }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");
  const user = useSelector((state) => state.auth.user);
  const cardsInReview = useSelector((state) => state.deck.cardsInReview);
  const { deckId } = useParams();
  const studyCards = cards;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const studyMode = STUDY_MODE;
  const reviewMode = REVIEW_MODE;

  useEffect(() => {
    if (deckId) {
      dispatch(getCardsForLearning(deckId, user._id));
    }
  }, [deckId, dispatch, user._id]);

  useEffect(() => {
    resetValues();
  }, [currentCardIndex]);

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
  };

  const handleCorrect = () => {
    // TODO: dispatch(updateCard(studyCards[currentCardIndex]._id, {answer: answer}));
    if (mode === studyMode) {
      dispatch(
        createReview({
          cardId: studyCards[currentCardIndex]._id,
          userId: user._id,
          isCorrectGuess: true,
        })
      );
    } else if (mode === reviewMode) {
      // TODO: repetition is needed to uncomment this line
      dispatch(updateReviewAction({
        cardId: studyCards[currentCardIndex]._id, 
        userId: user._id, 
        isCorrectGuess: false, 
        repetitions: studyCards[currentCardIndex].repetitions + 1,
      },studyCards[currentCardIndex].reviewId));
    }

    nextCard();
  };

  const handleIncorrect = () => {
    // TODO: repetition is needed to uncomment this line
    dispatch(updateReviewAction({
      cardId: studyCards[currentCardIndex]._id, 
      userId: user._id, 
      isCorrectGuess: false, 
      repetitions: studyCards[currentCardIndex].repetitions + 1,
    },studyCards[currentCardIndex].reviewId));
    nextCard();
  };

  const handleCheck = () => {
    setIsCorrect(isCorrectSentence(answer, studyCards[currentCardIndex].back));
    setIsFlipped(true);
  };

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const resetValues = () => {
    setAnswer("");
    setIsFlipped(false);
    setIsCorrect(false);
  };

  return (
    <div>
      <Card card={studyCards[currentCardIndex]} />
      <textarea value={answer} onChange={handleAnswer}></textarea>
      {isFlipped && <p>{studyCards[currentCardIndex].back}</p>}
      {isFlipped && isCorrect && <p>Correct!</p>}
      {isFlipped && !isCorrect && <p>Incorrect!</p>}
      <button onClick={handleCheck}>Check</button>
      <button onClick={handleCorrect}>Correct</button>
      <button onClick={handleIncorrect}>Incorrect</button>
      <button onClick={handleFlip}>Flip</button>
      <button onClick={nextCard}>Next</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

DeckStudyReview.propTypes = {
  cards: PropTypes.array,
  mode: PropTypes.string,
};

export default DeckStudyReview;

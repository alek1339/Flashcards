import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsForLearning } from "../../store/reducers/deckSlice";
import Card from "../card/Card";
import { useParams } from "react-router-dom";
import { isCorrectSentence } from "../../utils/sentenceCorrector";
import TextareaInput from "../textAreaInput/TextAreaInput";

import {
  createReview,
  updateReviewAction,
} from "../../store/reducers/reviewSlice";

import PropTypes from "prop-types";

import { STUDY_MODE, REVIEW_MODE } from "../../constants/modes";

import "./DeckStudyReview.scss";

const DeckStudyReview = ({ cards, mode }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state) => state.auth.user);
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
    } else if (currentCardIndex === studyCards.length - 1) {
      setCurrentCardIndex(0);
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
    if (mode === studyMode) {
      dispatch(
        createReview({
          cardId: studyCards[currentCardIndex]._id,
          userId: user._id,
          isCorrectGuess: true,
        })
      );
    } else if (mode === reviewMode) {
      dispatch(
        updateReviewAction(
          {
            cardId: studyCards[currentCardIndex]._id,
            userId: user._id,
            isCorrectGuess: false,
            repetitions: studyCards[currentCardIndex].repetitions + 1,
          },
          studyCards[currentCardIndex].reviewId
        )
      );
    }

    const updatedStudyCards = studyCards.filter(
      (card) => card !== studyCards[currentCardIndex]
    );
    setCurrentCardIndex(0);

    if (updatedStudyCards.length === 0) {
      window.location.href = `/`;
    }

    nextCard();
  };

  const handleIncorrect = () => {
    if (mode === reviewMode) {
      dispatch(
        updateReviewAction(
          {
            cardId: studyCards[currentCardIndex]._id,
            userId: user._id,
            isCorrectGuess: false,
            repetitions: studyCards[currentCardIndex].repetitions + 1,
          },
          studyCards[currentCardIndex].reviewId
        )
      );
    }

    if (currentCardIndex === studyCards.length - 1) {
      setCurrentCardIndex(0);
    }

    nextCard();
  };

  const handleCheck = () => {
    setIsCorrect(isCorrectSentence(answer, studyCards[currentCardIndex].back));
    setIsFlipped(true);
    setIsChecked(true);
  };

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const resetValues = () => {
    setAnswer("");
    setIsFlipped(false);
    setIsCorrect(false);
    setIsChecked(false);
  };

  return (
    <div className='deckstudyreview-container'>
      <div onClick={handleFlip}>
        <Card card={studyCards[currentCardIndex]} />
      </div>
      <TextareaInput value={answer} onChange={handleAnswer} />
      {isFlipped && <p>{studyCards[currentCardIndex].back}</p>}
      {isChecked && isCorrect && <p>Correct!</p>}
      {isChecked && !isCorrect && <p>Incorrect!</p>}
      {!isFlipped && <button onClick={handleCheck}>Check</button>}

      {isFlipped && (
        <>
          <button onClick={handleCorrect}>Correct</button>
          <button onClick={handleIncorrect}>Incorrect</button>
        </>
      )}

      {!isFlipped && <button onClick={handleFlip}>Flip</button>}

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

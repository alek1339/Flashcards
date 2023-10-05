import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsForLearning } from "../../store/reducers/deckSlice";
import Card from "../card/Card";
import { useParams } from "react-router-dom";
import { isCorrectSentence } from "../../utils/sentenceCorrector";
import TextareaInput from "../textAreaInput/TextAreaInput";
import CustomModal from "../customModal/CustomModal";

import {
  createReview,
  updateReviewAction,
} from "../../store/reducers/reviewSlice";

import { BUTTONS } from "../../constants/buttonClasses";
import { TEXT_AREA } from "../../constants/textAreaClasses";

import PropTypes from "prop-types";

import { STUDY_MODE, REVIEW_MODE } from "../../constants/modes";
import Button from "../button/Button";

import "./DeckStudyReview.scss";

const DeckStudyReview = ({ cards, mode, onCardReviewed }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const { deckId } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const studyMode = STUDY_MODE;
  const reviewMode = REVIEW_MODE;
  const primaryButton = BUTTONS.PRIMARY;
  const secondaryButton = BUTTONS.SECONDARY;
  const largeTextArea = TEXT_AREA.LARGE;
  const msg =
    reviewMode === mode
      ? "All cards has been reviewed!"
      : "All cards has been studied";
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (deckId && user) {
      dispatch(getCardsForLearning(deckId, user._id));
    }
  }, [deckId, dispatch, user]);

  useEffect(() => {
    if (cards.length === 0) {
      setIsModalOpen(true);
    }
  }, [cards]);

  useEffect(() => {
    resetValues();
  }, [currentCardIndex]);

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (currentCardIndex === cards.length - 1) {
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
          cardId: cards[currentCardIndex]._id,
          userId: user._id,
          isCorrectGuess: true,
        })
      );
    } else if (mode === reviewMode) {
      dispatch(
        updateReviewAction(
          {
            cardId: cards[currentCardIndex]._id,
            userId: user._id,
            isCorrectGuess: false,
            repetitions: cards[currentCardIndex].repetitions + 1,
          },
          cards[currentCardIndex].reviewId
        )
      );
    }
    onCardReviewed(cards[currentCardIndex]._id);

    setCurrentCardIndex(0);
    resetValues();
  };

  const onCloseModal = () => {
    window.location.href = `/`;
  };

  const handleIncorrect = () => {
    if (mode === reviewMode) {
      dispatch(
        updateReviewAction(
          {
            cardId: cards[currentCardIndex]._id,
            userId: user._id,
            isCorrectGuess: false,
            repetitions: cards[currentCardIndex].repetitions + 1,
          },
          cards[currentCardIndex].reviewId
        )
      );
    }

    if (currentCardIndex === cards.length - 1) {
      setCurrentCardIndex(0);
    }

    nextCard();
    resetValues();
  };

  const handleCheck = () => {
    setIsCorrect(isCorrectSentence(answer, cards[currentCardIndex].back));
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
    <div className="deckstudyreview-container">
      <div className="deckstudyreview-container__card" onClick={handleFlip}>
        <Card card={cards[currentCardIndex]} onClick={handleFlip} />
      </div>
      <TextareaInput
        value={answer}
        onChange={handleAnswer}
        className={largeTextArea}
      />
      {isFlipped && (
        <p className="flashcard-back-txt">
          {cards[currentCardIndex] && cards[currentCardIndex].back}
        </p>
      )}
      {isChecked && (isCorrect ? <p>Correct!</p> : <p>Incorrect!</p>)}

      <div className="deckstudyreview-container__buttons">
        {!isFlipped && (
          <Button
            onClick={handleCheck}
            label={"Check"}
            className={primaryButton}
          />
        )}

        {isFlipped && (
          <>
            <Button
              onClick={handleCorrect}
              label={"Correct"}
              className={primaryButton}
            />
            <Button
              onClick={handleIncorrect}
              label={"Incorrect"}
              className={secondaryButton}
            />
          </>
        )}

        {!isFlipped && (
          <Button
            onClick={handleFlip}
            label={"Flip"}
            className={primaryButton}
          />
        )}

        <Button onClick={nextCard} label={"Next"} className={primaryButton} />
        <Button
          onClick={handleCancel}
          label={"Cancel"}
          className={secondaryButton}
        />
      </div>
      {isModalOpen && (
        <CustomModal
          message={msg}
          onClose={onCloseModal}
          closeLabel={"Go to your Decks!"}
        />
      )}
    </div>
  );
};

DeckStudyReview.propTypes = {
  cards: PropTypes.array,
  mode: PropTypes.string,
  onCardReviewed: PropTypes.func,
};

export default DeckStudyReview;

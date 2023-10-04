import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCardsForLearning } from "../../store/reducers/deckSlice";
import { Link } from "react-router-dom";
import PropTypes, { shape, string } from "prop-types";
import Button from "../button/Button";

import { BUTTONS } from "../../constants/buttonClasses";

import "./DeckDetail.scss";

const DeckDetail = ({ deck, onBack }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allCardsInDeck = useSelector((state) => state.deck.allCardsInDeck);
  const cardsInReview = useSelector((state) => state.deck.cardsInReview);
  const [isReviewButtonDisabled, setIsReviewButtonDisabled] = useState(true);
  const [isStudyButtonDisabled, setIsStudyButtonDisabled] = useState(true);
  const primaryButton = BUTTONS.PRIMARY;
  const secondaryButton = BUTTONS.SECONDARY;

  const newCardsForLearning = useSelector(
    (state) => state.deck.newCardsForLearning
  );

  useEffect(() => {
    if (deck) {
      dispatch(getCardsForLearning(deck._id, user._id));
    }
  }, [deck, dispatch, user._id]);

  useEffect(() => {
    if (newCardsForLearning.length > 0) {
      setIsStudyButtonDisabled(false);
    }
  }, [newCardsForLearning]);

  useEffect(() => {
    if (cardsInReview.length > 0) {
      setIsReviewButtonDisabled(false);
    }
  }, [cardsInReview]);

  return (
    <div className='deckdetail-container'>
      {deck && (
        <div>
          <h1>{deck.name}</h1>
          <h2>Total Cards</h2>
          <p>{allCardsInDeck ? allCardsInDeck.length : 0}</p>
          <h2>Review</h2>
          <p>{cardsInReview ? cardsInReview.length : 0}</p>
          <Link to={`/decks/${deck._id}/review`}>
            <Button isDisabled={isReviewButtonDisabled} label={"Review"} className={primaryButton}/>
          </Link>
          <h2>New</h2>
          <p>{newCardsForLearning ? newCardsForLearning.length : 0}</p>
          <Link className={'study-btn'} to={`/decks/${deck._id}/study`}>
            <Button isDisabled={isStudyButtonDisabled}  label={"Study"} className={primaryButton} />
          </Link>
          <Button onClick={onBack} label={"Back"} className={secondaryButton} />
        </div>
      )}
    </div>
  );
};

DeckDetail.propTypes = {
  deck: shape({
    name: string,
  }),
  onBack: PropTypes.func.isRequired,
};

export default DeckDetail;

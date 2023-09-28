import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createCard } from "../../store/reducers/cardSlice";
import { useDispatch } from "react-redux";
import CustomModal from "../customModal/CustomModal";

import "./CreateCard.scss";

const CreateCard = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deckId, setDeckId] = useState("");
  const decks = useSelector((state) => state.deck.decks);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleCreateCard = () => {
    dispatch(createCard({ front: front, back: back, deckId: deckId }))
    .then((response) => {
        setMessage("Card Created");
        setShowModal(true);
        setFront("");
        setBack("");
        setDeckId("");
        })
        .catch((error) => {
            setMessage("Card Created failed");
            setShowModal(true);
        });
  };

  const handleSelectDeck = (e) => {
    setDeckId(e.target.value);
  };

  const handleClose = () => {
    setShowModal(false);
    setMessage("");
  };

  return (
    <div>
      <h1>Create Card</h1>
      <textarea
        type="text"
        placeholder="Front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Back"
        value={back}
        onChange={(e) => setBack(e.target.value)}
      />
      {
        <select onChange={handleSelectDeck}>
          <option value="">Select Deck</option>
          {decks.map((deck) => (
            <option key={deck._id} value={deck._id}>
              {deck.name}
            </option>
          ))}
        </select>
      }
      <button onClick={handleCreateCard}>Create Card</button>
      {showModal && <CustomModal message={message} onClose={handleClose} />}
    </div>
  );
};

export default CreateCard;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createDeck } from "../../store/reducers/deckSlice";
import { useDispatch } from "react-redux";
import CustomModal from "../customModal/CustomModal";

import "./CreateDeck.scss";

const CreateDeck = () => {
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [deckName, setDeckName] = useState("");
  const dispatch = useDispatch();

  const handleCreateDeck = () => {
    dispatch(createDeck({ name: deckName, userId: user._id }))
      .then((response) => {
        setMessage("Deck Created");
        setShowModal(true);
        setDeckName("");
      })
      .catch((error) => {
        console.error("Deck creation failed", error);
      });
  };


  const handleClose = () => {
    setShowModal(false);
    setMessage("");
  }

  return (
    <div>
      <h1>Create Deck</h1>
      <input
        type="text"
        placeholder="Deck Name"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <button onClick={handleCreateDeck}>Create Deck</button>
      {showModal && (
        <CustomModal message={message} onClose={handleClose} />
      )}
    </div>
  );
};

export default CreateDeck;

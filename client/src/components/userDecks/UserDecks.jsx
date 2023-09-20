import React from 'react';
import { useSelector } from 'react-redux';

import './UserDecks.scss';

const UserDecks = ({onDeckClick}) => {
    const user = useSelector((state) => state.auth.user);
    const decks = useSelector((state) => state.deck.decks);

  return (
        <>
            <h1>My Decks</h1>
            {user && decks && decks.length > 0 && decks.map((deck) => (
              <div className='deck-container' key={deck._id}>
                <h3 
                onClick={
                    () => onDeckClick(deck)
                }>
                    {deck.name}
                </h3>
              </div>
            ))}
        </>
  )
}

export default UserDecks;
import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import { createDeck } from '../../store/reducers/deckSlice';
import { useDispatch } from 'react-redux';

import './CreateDeck.scss';

const CreateDeck = () => {
    const user = useSelector((state) => state.auth.user);
    const [deckName, setDeckName] = useState('');
    const dispatch = useDispatch();

    const handleCreateDeck = () => {
        console.log('create deck', user);
        dispatch(createDeck({ name: deckName, userId: user._id }));
    }

  return (
    <div>
        <h1>Create Deck</h1>
        <input
            type='text'
            placeholder='Deck Name'
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
        />
        <button onClick={handleCreateDeck}>Create Deck</button>
    </div>
  )
}

export default CreateDeck;
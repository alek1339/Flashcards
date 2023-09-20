import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { createCard } from '../../store/reducers/cardSlice';
import { useDispatch } from 'react-redux';

import './CreateCard.scss';

const CreateCard = () => {
    const user = useSelector((state) => state.auth.user);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [deckId, setDeckId] = useState('');
    const decks = useSelector((state) => state.deck.decks);
    const dispatch = useDispatch();

    console.log('decks', decks);

    const handleCreateCard = () => {
        console.log('create card', user);
        dispatch(createCard({ front: front, back: back, deckId: deckId }));
    }

    const handleSelectDeck = (e) => {
        console.log('select deck', e.target.value);
        setDeckId(e.target.value);
    }
    

  return (
    <div>
        <h1>Create Card</h1>
        <textarea
            type='text'
            placeholder='Front'
            value={front}
            onChange={(e) => setFront(e.target.value)}
        />
        <textarea
            type='text'
            placeholder='Back'
            value={back}
            onChange={(e) => setBack(e.target.value)}
        />
        {
            <select onChange={handleSelectDeck}>
                <option value=''>Select Deck</option>
                {decks.map((deck) => (
                    <option key={deck._id} value={deck._id}>{deck.name}</option>
                ))}
            </select>
        }
        <button onClick={handleCreateCard}>Create Card</button>
    </div>
  )
}

export default CreateCard;
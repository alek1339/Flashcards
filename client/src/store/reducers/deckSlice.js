import { createSlice } from '@reduxjs/toolkit';

const deckSlice = createSlice({
    name: 'deck',
    initialState: {
        deck: {},
        decks: [],
        cardsInReview: [],
        newCardsForLearning: [],
        error: null,
    },
    reducers: {
        setDeck: (state, action) => {
            state.deck = action.payload;
        },
        setCardsForLearning: (state, action) => {
            state.cardsInReview = action.payload.cardsInReview;
            state.newCardsForLearning = action.payload.newCardsForLearning;
        },
        setDecks: (state, action) => {
            console.log(action.payload);
            state.decks = action.payload;
        },
        updateDeckFailure: (state, action) => {
            state.error = action.payload;
        },
        updateDeckSuccess: (state, action) => {
            state.deck = action.payload;
            state.error = null;
        },
    },
});

export const getDecks = (id) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/deck/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        console.log(data);
        dispatch(setDecks(data));
    } catch (error) {
        console.error('Deck retrieval failed', error);
    }
}

// Get cards in review and new cards for learning
export const getCardsForLearning = (deckId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/deck/decks/${deckId}/cards-for-learning`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        dispatch(setCardsForLearning(data));
    } catch (error) {
        console.error('Cards for learning retrieval failed', error);
    }
}


export const createDeck = (formData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:1000/deck', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        dispatch(setDeck(data));
    } catch (error) {
        console.error('Deck creation failed', error);
    }
}

export const updateDeck = (formData, id) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/deck/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        dispatch(updateDeckSuccess(data));
    } catch (error) {
        console.error('Deck update failed', error);
        dispatch(updateDeckFailure(error));
    }
}

export const getDeck = (id) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/deck/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        dispatch(setDeck(data));
    } catch (error) {
        console.error('Deck retrieval failed', error);
    }
}

export const { setDeck, updateDeckFailure, updateDeckSuccess, setDecks, setCardsForLearning } = deckSlice.actions;

export default deckSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const deckSlice = createSlice({
    name: 'deck',
    initialState: {
        deck: {},
        decks: [],
        error: null,
    },
    reducers: {
        setDeck: (state, action) => {
        state.deck = action.payload;
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

export const { setDeck, updateDeckFailure, updateDeckSuccess, setDecks } = deckSlice.actions;

export default deckSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        card: null,
    },
    reducers: {
        setCard: (state, action) => {
        state.card = action.payload;
        },
        clearCard: (state) => {
        state.card = null;
        },
    },
    });

export const { setCard, clearCard } = cardSlice.actions;

export const getCard = (cardId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/card/${cardId}`);
        const data = await response.json();
        dispatch(setCard(data));
    } catch (error) {
        console.error('Card fetch failed', error);
    }
};

export const createCard = (cardData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:1000/card/', {
            method: 'POST',
            body: JSON.stringify(cardData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        dispatch(setCard(data));
    } catch (error) {
        console.error('Card creation failed', error);
    }
};

export const updateCard = (cardData) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/card/${cardData._id}`, {
            method: 'PUT',
            body: JSON.stringify(cardData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        dispatch(setCard(data));
    } catch (error) {
        console.error('Card update failed', error);
    }
};

export const deleteCard = (cardId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/card/${cardId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        dispatch(clearCard());
    } catch (error) {
        console.error('Card deletion failed', error);
    }
};

export default cardSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    error: null,
  },
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    updateReview: (state, action) => {
      const updatedReview = action.payload;
      const index = state.reviews.findIndex((review) => review.id === updatedReview.id);
      if (index !== -1) {
        state.reviews[index] = updatedReview;
      }
    },
    reviewFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const createReview = (formData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:1000/review', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    dispatch(addReview(data));
  } catch (error) {
    console.error('Review creation failed', error);
    dispatch(reviewFailure(error));
  }
};

export const updateReviewAction = (formData, id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:1000/review/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    dispatch(updateReview(data));
  } catch (error) {
    console.error('Review update failed', error);
    dispatch(reviewFailure(error));
  }
};

export const { addReview, updateReview, reviewFailure } = reviewSlice.actions;

export default reviewSlice.reducer;

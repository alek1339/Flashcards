import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {},
        error: null,
    },
    reducers: {
        setProfile: (state, action) => {
        state.profile = action.payload;
        },
        updateProfileFailure: (state, action) => {
        state.error = action.payload;
        },
        updateProfileSuccess: (state, action) => {
        state.profile = action.payload;
        state.error = null;
        },
    },
});

export const createProfile = (formData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:1000/profile', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        dispatch(setProfile(data));
    } catch (error) {
        console.error('Profile creation failed', error);
    }
};

export const updateProfile = (formData, id) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/profile/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        console.error('Profile update failed', error);
        dispatch(updateProfileFailure(error));
    }
};

export const getProfile = (id) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:1000/profile/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.status === 404) {
            // TODO: If the profile doesn't exist (HTTP 404)
            console.warn('Profile not found');
          } else if (response.ok) {
            const data = await response.json();
            // Check if the response data is a valid profile object
            if (data && typeof data === 'object') {
              dispatch(setProfile(data));
            } else {
              console.warn('Invalid profile data received');
              // TODO: dispatch an action to handle invalid data
            }
          } else {
            console.error('Profile fetch failed with status:', response.status);
            // TODO: Optionally dispatch an action to handle other error cases
          }
    }
    catch (error) {
        console.error('Profile fetch failed', error);
    }
}

export const { setProfile, updateProfileFailure, updateProfileSuccess } = profileSlice.actions;

export default profileSlice.reducer;
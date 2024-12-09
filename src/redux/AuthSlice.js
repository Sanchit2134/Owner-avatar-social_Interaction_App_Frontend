import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        suggestedUser: [], // Ensure this is an array
        userProfile: null,
        selectedUser: null
    }, 
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;    
        },
        setSuggestedUser: (state, action) => {
            state.suggestedUser = Array.isArray(action.payload) ? action.payload : []; // Ensure payload is an array
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    }
});

export const { setAuthUser, setSuggestedUser, setUserProfile, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
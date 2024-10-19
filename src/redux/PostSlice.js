import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],   
        selectedPost: null,
    },
    reducers:{
        setPost: (state,action)=>{
            state.post = action.payload;
        },
        setSelectedPost: (state,action)=>{
            state.selectedPost = action.payload;
        }
    }
})
export const {setPost, setSelectedPost} = PostSlice.actions;
export default PostSlice.reducer;
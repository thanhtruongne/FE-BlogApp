import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    categories: [],
    error: '',
    loading: true,
}


const category = createSlice({
    name : "category",
    initialState,
    reducers : {
        getCategory : (state,payload) => {
           state.categories = payload
        },
    }
})

export const { getCategory   } = category.actions

export default category.reducer
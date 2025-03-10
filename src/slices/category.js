import { createSlice } from '@reduxjs/toolkit'

    
const initialState = {
    categories: null,
    error: '',
}




const categorySlice = createSlice({
    name : "category",
    initialState,
    reducers : {
        getCategory : (state,action) => {
           state.categories = action.payload
        },
    }
})

export const { getCategory  } = categorySlice.actions

export default categorySlice.reducer
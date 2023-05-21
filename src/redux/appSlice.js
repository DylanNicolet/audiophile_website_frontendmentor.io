import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'appState',
  initialState: {
    screenWidth: window.innerWidth,
  },
  reducers: {
    /*increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },*/
    updateState: (state, action) => {
      state.screenWidth = action.payload.screenWidth
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateState } = appSlice.actions

export default appSlice.reducer
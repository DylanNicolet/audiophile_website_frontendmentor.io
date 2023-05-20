import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'appState',
  initialState: {
    homepageActive: false,
    theme: "numbers",
    playerNumber: "1",
    gridSize: "4x4",
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
      state.homepageActive = action.payload.homepageActive
      state.theme = action.payload.theme
      state.playerNumber = action.payload.playerNumber
      state.gridSize = action.payload.gridSize
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateState } = appSlice.actions

export default appSlice.reducer
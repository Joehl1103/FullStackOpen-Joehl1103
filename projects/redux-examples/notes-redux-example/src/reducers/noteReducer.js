import { createSlice, current } from '@reduxjs/toolkit'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      console.log('action payload in noteReducer', action)
      return action.payload
    }
  },
})

export const {
  createNote,
  toggleImportanceOf,
  appendNote,
  setNotes } = noteSlice.actions
export default noteSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const reducerSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = reducerSlice.actions
export default reducerSlice.reducer

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

export const setAndRemoveNotification = (content, time) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}
export default reducerSlice.reducer

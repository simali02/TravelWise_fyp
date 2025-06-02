import { createSlice } from '@reduxjs/toolkit'

const initialState = {id:"", email: "", username:"" }

const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
        state.id = action.payload.id
        state.email = action.payload.email
        state.name = action.payload.name
    },
    unSetUserToken: (state, action) => {
        state.id = action.payload.id
        state.email = action.payload.email
        state.name = action.payload.name
    }
  },
})

export const { setUserInfo, unSetUserToken } = userSlice.actions
export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Tokens } from 'models/tokensModel'
import type { RootState } from '..'

const createInitState = (): Tokens => ({
  accessToken: '',
  refreshToken: '',
})

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: createInitState(),
  reducers: {
    setTokens(_, action: PayloadAction<Tokens>) {
      return action.payload
    },
    setAccessToekn(state, action: PayloadAction<Pick<Tokens, 'accessToken'>>) {
      state.accessToken = action.payload.accessToken
    },
    clearTokens() {
      return createInitState()
    },
  },
})

export const tokensSelector = (state: RootState) => state.auth
export const accessTokenSelector = (state: RootState) => state.auth.accessToken
export const refreshTokenSelector = (state: RootState) => state.auth.refreshToken

export const { setTokens, setAccessToekn, clearTokens } = authSlice.actions
export const authReducer = authSlice.reducer

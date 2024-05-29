import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    coins: 0,
  },

  reducers: {
    increment: (state) => {
      // Redux Toolkit позволяет нам писать "мутабельную" логику в reducer'ах.
      // Это не изменяет состояние(state) напрямую, потому что внутри используется библиотека Immer,
      // которая следит за изменениями в "черновом state" и создает новое
      // неизменное состояние на основе этих изменений
      state.coins += 1
    },
    decrement: (state) => {
      state.coins -= 1
    },
    incrementByAmount: (state, action) => {
      state.coins += action.payload
    },
  },
})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer

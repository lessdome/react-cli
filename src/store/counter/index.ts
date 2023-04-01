import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const name = 'counter'

const delay = (timer?: number) => new Promise<undefined>(resolve => setTimeout(() => resolve(undefined), timer ?? 1000))

export const asyncAdd = createAsyncThunk(`${name}/asyncAdd`, async () => {
  await delay()
})

export const asyncReduce = createAsyncThunk(`${name}/asyncReduce`, async () => {
  await delay()
})

export const asyncNums = createAsyncThunk(`${name}/asyncNums`, async (num: number) => {
  await delay()

  return num
})

const counterReducer = createSlice({
  name,
  initialState: {
    counter: 0,
  },
  reducers: {
    add: state => {
      state.counter++
    },
    reduce: state => {
      state.counter--
    },
    nums: (state, action) => {
      state.counter = action.payload
    },
  },
  extraReducers: builder =>
    builder
      .addCase(asyncAdd.fulfilled, state => {
        state.counter++
      })
      .addCase(asyncReduce.fulfilled, state => {
        state.counter--
      })
      .addCase(asyncNums.fulfilled, (state, {payload}) => {
        state.counter = payload
      }),
})

export const {
  reducer,
  actions: {add, reduce, nums},
} = counterReducer

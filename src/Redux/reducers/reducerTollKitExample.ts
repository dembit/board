import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './../redux'






export const getPost =  createAsyncThunk<list[]>(
  'post/getPost', 
async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
  return (await (response.json())) as list[]
}
 )



interface list {
  userId: number,
  id: number,
  title: string,
  body:  string
}
// Define the initial state using that type
const initialState = {
  value: 0,
  list: [] as list[],
  status: ""
}

// Define a type for the slice state
type CounterStateType = typeof initialState

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase( getPost.pending, (state, action) => {
        state.status = "loading"
      }).addCase( getPost.fulfilled, (state, action) => {
      
        state.list = action.payload
        state.status = "success"
      }).addCase(getPost.rejected, (state, action) => {
        state.status = "reject"
      })
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counterSlice.value

export default counterSlice.reducer
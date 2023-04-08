import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const QuizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    userAns: (state, action) => {
      state[action.payload.id] = action.payload.isCorrect;
    },
  },
});

export const { userAns } = QuizzesSlice.actions;
export default QuizzesSlice.reducer;

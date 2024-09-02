import { createSlice } from '@reduxjs/toolkit';

interface ListItem {
  id: number;
  color: string;
}

const generateRandomColor = (): string => {
  return "#" + Math.floor(Math.random()*16777215).toString(16)
};

const listSlice = createSlice({
  name: 'list',
  initialState: [] as ListItem[],
  reducers: {
    addItem: (state) => {
      const newItem: ListItem = {
        id: Date.now(),
        color: generateRandomColor(),
      };
      state.unshift(newItem);
    },
    removeItem: (state) => {
      state.pop();
    },
  },
});

export const { addItem, removeItem } = listSlice.actions;
export default listSlice.reducer;

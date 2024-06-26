import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: { list: [] },
    reducers: {
        addTodo: (state, action) => {
            state.list.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload.id);
        },
        updateStatus: (state, action) => {
            const updatedAt = new Date().toLocaleString();
            state.list = state.list.map(todo =>
                todo.id === action.payload.id ? { ...todo, isDone: true, updatedAt } : todo
            );
        },
        updateTodo: (state, action) => {
            const { id, name } = action.payload;
            state.list = state.list.map(todo =>
                todo.id === id ? { ...todo, name } : todo
            );
        }
    }
});

export const { addTodo, removeTodo, updateStatus, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;

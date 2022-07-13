import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../Constants/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  todo: [],
};

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  const response = await axios.get(`${api}/todos`);
  console.log(response);
  return response.data;
});

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (val, setInputVal) => {
    const response = await axios.post(`${api}/todos/add`, {
      todo: val,
      completed: false,
      userId: 5,
    });
    return response.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addMoreTodo(state, action) {
      console.log(action.payload);
      state.todo = [action.payload, ...state.todo];
    },
    deleteTodo(state, action) {
      state.todo = state.todo.filter((item) => {
        return item.id !== action.payload.id;
      });
    },
    loadingStart(state, action) {
      state.loading = true;
    },
    loadingEnd(state, action) {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodo.pending, (state, action) => {
        console.log("pending fetch");
        toast.warning("pending fetch");
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        console.log("succeeded", action.payload);
        state.todo = action.payload.todos;
        toast.success("Success fetch");
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        console.log("failed", action.error);
        toast.error(action.error.message);
      })
      // add todo case
      .addCase(addTodo.pending, (state, action) => {
        console.log("pending add");
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log("succeeded", action.payload);
        state.todo = [action.payload, ...state.todo];
        state.loading = false;
        toast.success("Todo add successfully");
      })
      .addCase(addTodo.rejected, (state, action) => {
        console.log("failed", action);
        toast.error(action.error.message);
        state.loading = false;
      });
  },
});

// const deleteTodo = (id) => {
//   return async (dispatch) => {
//     await axios
//       .delete(`${api}/todos/${id}`)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error, "error");
//       });
//   };
// };

// const updateTodo = (id) => {
//   return async (dispatch) => {
//     await axios
//       .delete(`${api}/todos/${id}`)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error, "error");
//       });
//   };
// };

export const { getAllTodo, addMoreTodo, deleteTodo, loadingStart, loadingEnd } =
  todoSlice.actions;
export default todoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { api } from "../Constants/apiUrl";
import axios from "axios";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    todo: [],
  },
  reducers: {
    getAllTodo(state, action) {
      state.todo = action.payload.todos;
    },
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
});

const getTodoFromApi = (val) => {
  return async (dispatch) => {
    await axios
      .get(`${api}/todos`)
      .then((response) => {
        console.log(response.data);
        dispatch(getAllTodo(response.data));
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
};

const addTodo = (val, setInputVal) => {
  return async (dispatch) => {
    dispatch(loadingStart());
    await axios
      .post(`${api}/todos/add`, {
        todo: val,
        completed: false,
        userId: 5,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addMoreTodo(response.data));
        dispatch(loadingEnd());
        setInputVal("");
      })
      .catch((error) => {
        console.log(error, "error");
        dispatch(loadingEnd());
      });
  };
};

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
export { getTodoFromApi, addTodo };
export default todoSlice.reducer;

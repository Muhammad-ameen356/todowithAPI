import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  // getTodoFromApi,
  fetchTodo,
} from "../../store/Reducers/todoReducer";
import "./Home.css";
import SyncLoader from "react-spinners/SyncLoader";

import { AiFillDelete } from "react-icons/ai";

const Home = () => {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");
  const { todo, loading } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(inputVal, setInputVal))
      .then((response) => {
        console.log("first", response.payload);
        setInputVal("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };
  return (
    <div className="todo_mainContainer">
      <div className="todo_box">
        <h3>Todo App</h3>
        <form onSubmit={handleSubmit}>
          <div className="todo_input">
            <input
              type="text"
              placeholder="Add your New Todo"
              onChange={(e) => setInputVal(e.target.value)}
              value={inputVal}
              required
            />
            {loading ? (
              <div style={{ marginLeft: 15, marginRight: 15 }}>
                <SyncLoader size={10} color="#cc4" />
              </div>
            ) : (
              <button type="submit"> Add</button>
            )}
          </div>
        </form>
        <div className="todo_body">
          {todo &&
            todo.map((item, index) => {
              return item?.completed ? (
                <div key={index} className="todo_item_disable">
                  <s>{item?.todo}</s>
                  <div
                    className="deleteBtn"
                    onClick={() => handleDeleteTodo(item?.id)}
                  >
                    <AiFillDelete />
                  </div>
                </div>
              ) : (
                <div key={index} className="todo_item">
                  {item?.todo}
                  <div
                    className="deleteBtn"
                    onClick={() => handleDeleteTodo(item?.id)}
                  >
                    <AiFillDelete />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;

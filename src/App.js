import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [items_arr, setItems_arr] = useState([]);
  const [editInput_arr, setEditInput_arr] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("todo", JSON.stringify(items_arr));
  }, [items_arr]);

  useEffect(() => {
    const itemArr = JSON.parse(sessionStorage.getItem("todo"));
    setItems_arr(itemArr);
    <TodoList
      items_arr={items_arr}
      setItems_arr={setItems_arr}
      editInput_arr={editInput_arr}
      setEditInput_arr={setEditInput_arr}
    />;
  }, []);

  return (
    <div className="container">
      <form action="#">
        <label htmlFor="task">Tasks: </label>
        <input
          id="task"
          className="todo-list"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <div className="add-center">
          <button onClick={(e) => addToList(e)} type="button">
            + Add
          </button>
        </div>
      </form>
      <div id="list-data">
        <TodoList
          items_arr={items_arr}
          setItems_arr={setItems_arr}
          editInput_arr={editInput_arr}
          setEditInput_arr={setEditInput_arr}
        />
      </div>
    </div>
  );

  function addToList(e) {
    setItems_arr([...items_arr, { item: todo, edited: false }]);
    console.log(items_arr);
    setEditInput_arr([...editInput_arr, todo]);
    setTodo("");
  }
}

function TodoList({
  items_arr,
  editInput_arr,
  setItems_arr,
  setEditInput_arr,
}) {
  return (
    <>
      {items_arr?.map((data, index) => {
        return (
          <div key={index} className="list">
            <span>{data?.item}</span>
            <i
              onClick={() => removeListData(index)}
              className="fa fa-light fa-trash"
            ></i>
            <i
              onClick={() => editBtnClicked(index)}
              className="fa fa-light fa-pen"
            ></i>
            {data.edited ? (
              <>
                <input
                  value={editInput_arr[index]}
                  className="edited-text"
                  type="text"
                  onChange={(e) => handleChange(e, index)}
                />
                <button onClick={() => itemEdited(index)} className="done">
                  Done
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </>
  );

  function editBtnClicked(index) {
    let updatedList = [...items_arr];
    updatedList[index].edited = true;
    setItems_arr(updatedList);
  }
  function handleChange(e, index) {
    let editedList = [...editInput_arr];
    editedList[index] = e.target.value;
    setEditInput_arr(editedList);
  }
  function itemEdited(index) {
    let updatedList = [...items_arr];
    updatedList[index].item = editInput_arr[index];
    updatedList[index].edited = false;
    setItems_arr(updatedList);
  }
  function removeListData(index) {
    const newArr = items_arr.filter((item, ind) => ind != index);
    setItems_arr(newArr);
    const newInputArr = editInput_arr.filter((item, ind) => ind != index);
    setEditInput_arr(newInputArr);
  }
}

export default App;

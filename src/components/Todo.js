import { useEffect, useState } from "react";
import "./Todo.css";
import Toastr from "../hooks/Toastr";

const notify = Toastr();

function Todo() {
  const [todo, setTodo] = useState("");
  const [items_arr, setItems_arr] = useState([]);
  const [checker, setChecker] = useState(0);
  const [editInput_arr, setEditInput_arr] = useState([]);

  useEffect(() => {
    const itemArr = JSON.parse(sessionStorage.getItem("todo"));
    const editedArr = JSON.parse(sessionStorage.getItem("todoEdited"));
    if (itemArr) {
      setItems_arr(itemArr);
      setEditInput_arr(editedArr);
    }
    setChecker(1);
  }, []);

  useEffect(() => {
    if (checker === 1) {
      sessionStorage.setItem("todo", JSON.stringify(items_arr));
      sessionStorage.setItem("todoEdited", JSON.stringify(editInput_arr));
    }
  }, [items_arr, checker]);

  return (
    <>
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
            <button
              className="addBtn"
              onClick={(e) => addToList(e)}
              type="button"
            >
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
            // notify={notify}
          />
        </div>
      </div>
    </>
  );

  function addToList(e) {
    if (todo !== "") {
      setItems_arr([...items_arr, { item: todo, edited: false }]);
      setEditInput_arr([...editInput_arr, todo]);
      setTodo("");
    } else {
      notify("Please Enter Anything !!");
    }
  }
}
function TodoList({
  items_arr,
  editInput_arr,
  setItems_arr,
  setEditInput_arr,
  // notify,
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
              <div className="flex">
                <input
                  value={editInput_arr[index]}
                  className="edited-text"
                  type="text"
                  onChange={(e) => handleChange(e, index)}
                />
                <button onClick={() => itemEdited(index)} className="done">
                  Done
                </button>
              </div>
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
    if (editInput_arr[index]) {
      let updatedList = [...items_arr];
      updatedList[index].item = editInput_arr[index];
      updatedList[index].edited = false;
      setItems_arr(updatedList);
    } else {
      notify("Please Enter Anything !!");
    }
  }
  function removeListData(index) {
    const newArr = items_arr.filter((item, ind) => ind !== index);
    setItems_arr(newArr);
    const newInputArr = editInput_arr.filter((item, ind) => ind !== index);
    setEditInput_arr(newInputArr);
  }
}
export default Todo;
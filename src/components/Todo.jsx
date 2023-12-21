import { useEffect, useState } from "react";
import "./Todo.css";
import Toastr from "../hooks/Toastr";

const notify = Toastr();

function Todo() {
  const [todo, setTodo] = useState("");
  const [items_arr, setItems_arr] = useState([]);

  useEffect(() => {
    const itemArr = JSON.parse(sessionStorage.getItem("todo"));
    if (itemArr) {
      setItems_arr(itemArr);
    }
  }, []);

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
          />
        </div>
      </div>
    </>
  );

  function addToList(e) {
    if (todo !== "") {
      let updatedArr = [
        ...items_arr,
        { item: todo, edited: false, editedData: todo },
      ];
      setItems_arr(updatedArr);
      setTodo("");
      sessionStorage.setItem("todo", JSON.stringify(updatedArr));
    } else {
      notify("Please Enter Anything !!");
    }
  }
}
function TodoList({
  items_arr,
  setItems_arr,
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
                  value={data.editedData}
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
    let updatedList = [...items_arr];
    updatedList[index]["editedData"] = e.target.value;
    setItems_arr(updatedList);
  }
  function itemEdited(index) {
    if (items_arr[index].editedData) {
      let updatedList = [...items_arr];
      updatedList[index].item = updatedList[index].editedData;
      updatedList[index].edited = false;
      setItems_arr(updatedList);
      sessionStorage.setItem("todo", JSON.stringify(updatedList));
    } else {
      notify("Please Enter Anything !!");
    }
  }
  function removeListData(index) {
    const newArr = items_arr.filter((item, ind) => ind !== index);
    setItems_arr(newArr);
    sessionStorage.setItem("todo", JSON.stringify(newArr));
  }
}
export default Todo;

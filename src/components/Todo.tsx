import React, { useEffect, useState, ChangeEvent, useContext } from "react";
import "./Todo.css";
import Toastr from "../hooks/Toastr";
import { ThemeContext } from "../hooks/context.ts";

type TodoItem = string;
interface Item {
  item: string;
  edited: boolean;
  editedData: string;
}
interface TodoProps {}
interface TodoListProps {
  itemsArr: Item[];
  setItemsArr: React.Dispatch<React.SetStateAction<Item[]>>;
}
export type Theme = string;

const notify = Toastr();

function Todo({}: TodoProps) {
  const theme = useContext(ThemeContext);
  const [todo, setTodo] = useState<TodoItem>("");
  const [itemsArr, setItemsArr] = useState<Item[]>([]);

  useEffect(() => {
    const itemArr: Item[] = JSON.parse(sessionStorage.getItem("todo") || "[]");
    if (itemArr) {
      setItemsArr(itemArr);
    }
    console.log(theme);
  }, []);

  const addToList = () => {
    if (todo !== "") {
      const updatedArr: Item[] = [
        ...itemsArr,
        { item: todo, edited: false, editedData: todo },
      ];
      setItemsArr(updatedArr);
      setTodo("");
      sessionStorage.setItem("todo", JSON.stringify(updatedArr));
    } else {
      notify("Please Enter Anything !!");
    }
  };

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
            <button className="addBtn" onClick={addToList} type="button">
              + Add
            </button>
          </div>
        </form>
        <div id="list-data">
          <TodoList itemsArr={itemsArr} setItemsArr={setItemsArr} />
        </div>
      </div>
    </>
  );
}

function TodoList({ itemsArr, setItemsArr }: TodoListProps) {
  const removeListData = (index: number) => {
    const newArr = itemsArr.filter((item, ind) => ind !== index);
    setItemsArr(newArr);
    sessionStorage.setItem("todo", JSON.stringify(newArr));
  };

  const editBtnClicked = (index: number) => {
    let updatedList = [...itemsArr];
    updatedList[index].edited = true;
    setItemsArr(updatedList);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let updatedList = [...itemsArr];
    updatedList[index]["editedData"] = e.target.value;
    setItemsArr(updatedList);
  };

  const itemEdited = (index: number) => {
    if (itemsArr[index].editedData) {
      let updatedList = [...itemsArr];
      updatedList[index].item = updatedList[index].editedData;
      updatedList[index].edited = false;
      setItemsArr(updatedList);
      sessionStorage.setItem("todo", JSON.stringify(updatedList));
    } else {
      notify("Please Enter Anything !!");
    }
  };

  return (
    <>
      {itemsArr?.map((data, index) => (
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
      ))}
    </>
  );
}

export default Todo;

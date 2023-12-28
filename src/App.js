import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./components/Todo.tsx";
import { ThemeContext } from "./hooks/context.ts";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("White");
  return (
    <>
      <button onClick={() => changeTheme()} type="submit">
        Theme - {theme}
      </button>
      <ThemeContext.Provider value={theme}>
        <Todo />
      </ThemeContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );

  function changeTheme() {
    if(theme === "White"){
      setTheme("Dark");
      document.body.style.backgroundColor = "#004242";
      document.body.style.color = "white";
    }else{
      setTheme("White");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    } 
  }
}

export default App;

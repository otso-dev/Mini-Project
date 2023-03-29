import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import { reset } from "./styles/Global/reset";
import TodoList from "./pages/ToDoList/TodoList";
import UserInfomation from "./pages/UserInfomation/UserInfomation";
function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path="/TodoList" Component={TodoList} />
        <Route path="/UserInfomation" Component={UserInfomation} />
      </Routes>
    </>
  );
}

export default App;

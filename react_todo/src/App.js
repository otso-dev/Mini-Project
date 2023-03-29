import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import { reset } from "./styles/Global/reset";
import TodoList from "./pages/ToDoList/TodoList";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import Menu from "./components/Menu/Menu";
// import UserInfomation from "./pages/UserInfomation/UserInfomation";
function App() {
  return (
    <>
      <Global styles={reset} />
      <TodoContainer>
        <Menu />
        <Routes>
          <Route path="/" Component={TodoList} />
        </Routes>
      </TodoContainer>
    </>
  );
}

export default App;

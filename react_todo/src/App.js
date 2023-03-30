import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import { reset } from "./styles/Global/reset";
import TodoList from "./pages/ToDoList/TodoList";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home/Home";
import WeekList from "./pages/WeekList/WeekList";
import { AnimatePresence } from "framer-motion";
// import UserInfomation from "./pages/UserInfomation/UserInfomation";
function App() {
  return (
    <>
      <Global styles={reset} />
      <TodoContainer>
        <AnimatePresence>
          <Menu />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/todo" Component={TodoList} />
            <Route path="/weeklist" Component={WeekList} />
          </Routes>
        </AnimatePresence>
      </TodoContainer>
    </>
  );
}

export default App;

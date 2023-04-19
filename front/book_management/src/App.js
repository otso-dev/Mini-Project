import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Callback from "./study/Callback";
import PromiseStudys from "./study/PromiseStudys";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/callback" Component={Callback} />
        <Route path="/promise" Component={PromiseStudys} />
      </Routes>
    </>
  );
}

export default App;

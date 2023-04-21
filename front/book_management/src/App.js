import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import Callback from "./study/Callback";
// import PromiseStudys from "./study/PromiseStudys";
import Main from "./pages/Main/Main";
import AuthRouteReactQuery from "./components/Routes/AuthRoute/AuthRouteReactQuery";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route
          exact
          path="/login"
          element={<AuthRouteReactQuery path="/login" element={<Login />} />}
        />
        <Route
          path="/register"
          element={
            <AuthRouteReactQuery path="/register" element={<Register />} />
          }
        />
        <Route
          path="/"
          element={<AuthRouteReactQuery path="/" element={<Main />} />}
        />
      </Routes>
    </>
  );
}

export default App;

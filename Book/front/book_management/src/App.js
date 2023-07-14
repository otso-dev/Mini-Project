import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import Callback from "./study/Callback";
// import PromiseStudys from "./study/PromiseStudys";
import Main from "./pages/Main/Main";
import AuthRouteReactQuery from "./components/Routes/AuthRoute/AuthRouteReactQuery";
import BookDetail from "./pages/BookDetail/BookDetail";
import Bookregister from "./pages/Admin/BookRegister/Bookregister";
import LikeBooks from "./pages/LikeBooks/LikeBooks";
import RentalBooks from "./pages/RentalBooks/RentalBooks";

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
        <Route path="/" element={<Main />} />
        <Route
          path="/register"
          element={<AuthRouteReactQuery path="/register" element={<Register />} />}
        />
        <Route path="/" element={<AuthRouteReactQuery path="/" element={<Main />} />} />
        <Route
          path="/book/:bookId"
          element={<AuthRouteReactQuery path="/book" element={<BookDetail />} />}
        />
        <Route
          path="/admin/book/register"
          element={<AuthRouteReactQuery path="/admin/book/register" element={<Bookregister />} />}
        />
        <Route path="/like/books" element={<LikeBooks />} />
        <Route path="/rental/books" element={<RentalBooks />} />
      </Routes>
    </>
  );
}

export default App;

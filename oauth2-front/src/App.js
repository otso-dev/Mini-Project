import { Route, Routes } from "react-router-dom";
import NotFound from "./page/NotFound/NotFound";
import Login from "./page/Login/Login";
import OAuth2Register from "./page/Register/OAuth2Register";
import OAuth2Merge from "./page/OAuth2Merge/OAuth2Merge";
import Index from "./page/INDEX/Index";
import OAuth2Login from "./page/Login/OAuth2Login";
import AuthRoute from "./components/AuthRoute";
import PostRegister from "./page/Posts/PostRegister";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthRoute path={"/"} element={<Index />} />} />

        <Route path="/mypage" element={<AuthRoute path={"/mypage"} element={<Index />} />} />
        <Route path="/post/register" element={<AuthRoute path={"/post/register"} element={<PostRegister />} />} />

        <Route path="/auth/login" element={<AuthRoute path={"/auth/login"} element={<Login />} />} />
        <Route path="/auth/register" />
        <Route
          path="/auth/oauth2/login"
          element={<AuthRoute path={"/auth/oauth2/login"} element={<OAuth2Login />} />}
        />
        <Route
          path="/auth/oauth2/register"
          element={<AuthRoute path={"/auth/oauth2/register"} element={<OAuth2Register />} />}
        />
        <Route
          path="/auth/oauth2/merge"
          element={<AuthRoute path={"/auth/oauth2/merge"} element={<OAuth2Merge />} />}
        ></Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

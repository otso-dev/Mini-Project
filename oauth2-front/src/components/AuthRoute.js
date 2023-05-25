import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { authenticationState } from "../store/atoms/AuthAtoms";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({ path, element }) => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const navigate = useNavigate();
  const authenticated = useQuery(
    ["authenticated"],
    async () => {
      const option = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      return await axios.get("http://localhost:8080/auth/authenticated", option);
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          if (response.data) {
            setAuthState(true);
            console.log("테스트");
          }
        }
      },
    }
  );

  console.log(authState + "테스트 ");
  const authenticatedPaths = ["/mypage", "/user", "/post"];
  const authPath = "/auth";

  if (authenticated.isLoading) {
    return <></>;
  }

  if (authState && path.startsWith(authPath)) {
    return element;
  }

  if (!authState && authenticatedPaths.filter((authenticatedPath) => path.startsWith(authenticatedPath)).length > 0) {
    navigate("/auth/login");
  }
  return element;
};

export default AuthRoute;

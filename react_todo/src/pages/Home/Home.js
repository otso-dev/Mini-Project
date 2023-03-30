/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

const HomeContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 5px;
  background-color: #454545;
`;
const HomeTitle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
  height: 30%;
  & h1 {
    text-align: center;
    font-size: 50px;
    font-weight: 400;
    color: #ffff66;
  }
`;

const HomeDate = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
  & p {
    text-align: center;
    font-size: 50px;
    font-weight: 400;
    color: #ffff66;
  }
`;

const HomeTime = css`
  width: 100%;
  height: 30%;
  & p {
    text-align: center;
    font-size: 50px;
    font-weight: 400;
    color: #ffff66;
  }
`;

const Home = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1.0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ height: "100%" }}
      >
        <div css={HomeContainer}>
          <div css={HomeTitle}>
            <h1>TODO LIST</h1>
          </div>
          <div css={HomeDate}>
            <p>{time.toLocaleDateString()}</p>
          </div>
          <div css={HomeTime}>
            <p>{time.toLocaleTimeString()}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;

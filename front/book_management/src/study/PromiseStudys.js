import React from "react";

const PromiseStudys = () => {
  const a = new Promise((resolve, reject) => {
    console.log("promise 호출");
    if (1 !== 1) {
      resolve();
    } else {
      throw new Error("오류 입니다.");
    }
  });

  const clickHandloer = () => {
    a.then(() => {
      console.log("1번 then 호출");
      return new Promise((resolve, rejcet) => {
        resolve("리턴 ");
      });
    })
      .catch((error) => {
        console.log(error);
      })
      .then(b);
  };

  const b = (str) => {
    console.log(str);
  };

  return (
    <div>
      <button onClick={clickHandloer}>버튼</button>
    </div>
  );
};

export default PromiseStudys;

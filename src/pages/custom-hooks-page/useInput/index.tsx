/*
 * @Author: cosyer
 * @Date: 2020-02-21 22:11:16
 * @Description: useInput custom hooks
 * @LastEditors: cosyer
 * @LastEditTime: 2020-04-10 21:45:20
 */

import React from "react";
import useInput from "../../custom-hooks/useInput";

const useInputDemo = () => {
  const value = useInput("cosyer");

  return (
    <div className="use-input">
      <p>current name: {value.value}</p>
      <input {...value} />
    </div>
  );
};

export default useInputDemo;

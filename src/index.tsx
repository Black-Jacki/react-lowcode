/**
 * react-lowcode Framework
 * @author zyh
 * @version 1.0
 * @since 2023/2/24
 */
import React from "react";
import dva from "./utils/dva";
import {Provider} from "react-redux";

export default function () {
  return (
    <Provider store={dva.store}>

    </Provider>
  );
};
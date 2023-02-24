/**
 * 返回一些通用变量和函数的hook
 * @author zyh
 * @version 1.0
 * @since 2023/1/29
 */
import React from "react";
import {message, notification, Modal} from "antd";
import dayjs from "dayjs";
import createElement from "../utils/createElement";
import request from "@/app/index";
import {getSchools, themeColor} from "@/app/tools";
import PublicRefs from "@/pages/ConfigurablePage/utils/PublicRefs";
import curdSearchValueFormat, {searchValueFormat} from "@/utils/curdSearchValueFormat";
import useRemoveModal from "@/hooks/useRemoveModal";
import {sessionStorageGetItem, localStorageGetItem} from "@/utils/util";
import uuid from "@/utils/uuid";

export default (dispatch, dataStore) => {
  const setState = (payload) => dispatch({type: "configurablePage/save", payload});
  return {
    // 组件，一般是可以直接调用的，如提示等
    message,
    notification,
    Modal,

    // 普通方法
    request,
    dayjs,
    createElement,
    dispatch,
    setState,
    getSchools,
    PublicRefs,
    curdSearchValueFormat,
    searchValueFormat,
    sessionStorageGetItem,
    localStorageGetItem,
    uuid,

    // 自定义hooks
    useRemoveModal,

    // 数据
    dataStore,
    themeColor,
  };
};
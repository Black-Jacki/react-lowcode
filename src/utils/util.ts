import React from "react";
import {Config, Common, Function} from "@/types";

export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === "object";
export const isFunction = (value: unknown): value is Function => typeof value === "function";
export const isString = (value: unknown): value is string => typeof value === "string";
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";
export const isNumber = (value: unknown): value is number => typeof value === "number";
export const isUndef = (value: unknown): value is undefined => typeof value === "undefined";
export const isArray = (value: unknown) => Array.isArray(value);


/**
 * 返回一个方法的实现
 * 如果是调用的方法，就从全局方法里找到这个方法再返回
 * 如果是直接写的脚本，就直接返回这个脚本
 * @param functions
 * @param funcString
 */
export const getFunction = (functions: Array<Function> = [], funcString: string) => {
  if (/^\$\{.+\}$/.test(funcString)) {
    const funcName = funcString.substring(2, funcString.length - 1);
    return functions.find(funcItem => funcItem.name === funcName)?.script;
  } else {
    return funcString;
  }
};

export const getValue = (dataStore = {}, valueString: string) => {
  if (/^\$\[.+\]$/.test(valueString)) {
    const valueKeys = valueString.substring(2, valueString.length - 1)?.split(".");
    let d: any = dataStore;
    for (let i = 0; i < valueKeys.length; i++) {
      const key = valueKeys[i];
      if (!d) break;
      d = d[key];
    }
    return d;
  } else {
    return valueString;
  }
};

export const getStyle = (
  common: Common,
  style: React.CSSProperties | string,
  styleFunc: string,
  value: any,
  item: any,
  index: number
) => {
  if (!style && !styleFunc) return null;
  if (styleFunc) {
    return new Function("common", "value", "item", "index", styleFunc)(common, value, item, index);
  }
  if (isString(style)) {
    return JSON.parse(style);
  }
  return style;
};

export const getTagColor = (
  common: Common,
  tagColor: string,
  tagColorFunc: string,
  value: any,
  item: any,
  index: number
) => {
  if (!tagColor && !tagColorFunc) return null;
  if (tagColorFunc) {
    return new Function("common", "value", "item", "index", tagColorFunc)(common, value, item, index);
  }
  return tagColor;
};
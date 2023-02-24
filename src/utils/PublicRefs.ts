import React from "react";

type Key = string;
type Value = React.MutableRefObject<any>;

export default class PublicRefs {
  private static tableMap: Record<Key, Value> = {};
  private static formMap: Record<Key, Value> = {};

  static addTableRef(key: Key, value: Value) {
    this.tableMap[key] = value;
  }
  static getTableRef(key: Key) {
    return this.tableMap[key];
  }
  static getTableRefs() {
    return this.tableMap;
  }
  static removeTableRef(key: Key) {
    delete this.tableMap[key];
  }
  static clearTableRefs() {
    this.tableMap = {};
  }

  static addForm(key: Key, value: Value) {
    this.formMap[key] = value;
  }
  static getForm(key: Key) {
    return this.formMap[key];
  }
  static getForms() {
    return this.formMap;
  }
  static removeForm(key: Key) {
    delete this.formMap[key];
  }
  static clearForms() {
    this.formMap = {};
  }
}
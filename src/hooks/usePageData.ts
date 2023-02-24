import {useEffect} from "react";
import request from "@/utils/request";
import {message} from "antd";

export default function (config, dispatch, common, pathVariable) {
  useEffect(() => {
    if (!config) return;
    const {defaultState = {}, api} = config;
    const payload = {
      ...defaultState,
      canRender: true
    };
    if (pathVariable) {
      try {
        const p = {};
        const varSplit = pathVariable.split("&")
        varSplit.forEach(param => {
          const sp = param.split("=");
          p[sp[0]] = sp[1];
        });
        payload.pathVariable = p;
      } catch (e) {
        message.error("路径变量格式错误！");
      }
    }
    const queryList = [];
    api?.queries?.forEach(q => {
      const {method = "get", type = "query", url, options} = q;
      switch (type) {
        case "query":
          queryList.push(request[method](url, options));
          break;
        case "func":
          queryList.push(new Function("common", "payload", api.script)(common, payload));
          break;
        case "aggregate":
          break;
      }
    });
    Promise.all(queryList)
      .then(res => {
        for (let i = 0; i < queryList.length; i++) {
          const fieldKey = api.queries[i].as;
          const resItem = res[i];
          if (resItem.code === "1" && resItem.data) {
            payload[fieldKey] = resItem.data;
          }
        }
      })
      .finally(() => {
        if (config.dataStoreHandle) {
          new Function("common", "payload", config.dataStoreHandle)(common, payload);
        }
        dispatch({type: "configurablePage/save", payload});
      });

    return () => {
      dispatch({type: "configurablePage/clear"});
    };
  }, [config, dispatch, pathVariable]);
}
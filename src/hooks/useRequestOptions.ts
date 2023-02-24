import request from "@/app/index";
import {useEffect, useState} from "react";

export default function (
  options,
  api,
  dynRequest?: boolean,
  text?: string,
  common?: any,
) {
  const [opts, setOpts] = useState(options);
  useEffect(() => {
    if (!api || (!dynRequest && opts)) {
      setOpts(options);
      return;
    }
    if (api.queryFunc) {
      new Function("common", "text", "setOpts", api.queryFunc)(common, text, setOpts);
    } else if (api.query) {
      let {url, method = "get", label, value, options, searchName, afterRequestFunc} = api.query;
      if (dynRequest && searchName) {
        if (!text) return;
        options = {...options, params: {...options?.params, [searchName]: text}};
      }
      request[method](url, options).then(res => {
        if (res.code === "1" && res.data) {
          const opts = afterRequestFunc
            ? new Function("common", "text", "data", afterRequestFunc)(common, text, res.data)
            : res.data.map(item => ({label: item[label], value: item[value]}));
          setOpts(opts);
        }
      });
    }
  }, [api, options, dynRequest, text, common]);
  return opts;
}
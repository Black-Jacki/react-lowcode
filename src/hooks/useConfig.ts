import {useEffect, useState} from "react";
import api from "@api";
import {message} from "antd";

export default (pageId) => {
  const [config, setConfig] = useState({});
  useEffect(() => {
    if (!pageId) return null;
    api.ConfigPage.findById({id: pageId}).then(res => {
      if (res.code === "1" && res.data) {
        setConfig({
          ...res.data,
          config: JSON.parse(res.data.config)
        });
      } else {
        message.warning(res.msg || "未找到配置文件");
      }
    });
  }, [pageId]);
  return config;
};
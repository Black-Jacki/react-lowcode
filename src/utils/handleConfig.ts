import {isArray, isObject, isString, getFunction, getValue} from "./util";
import {Config, Common, Function, Action} from "@/types";

function loopMatch(
  config: Config,
  functions: Array<Function>,
  common: Common
) {
  if (!config) return;
  // 如果是数组就递归处理下一级对象
  if (isArray(config)) {
    config.forEach((conf: Config) => {
      loopMatch(conf, functions, common);
    });
  }
  // 如果是对象，遍历每个值相应处理
  if (isObject(config)) {
    for (let key in config) {
      const value = config[key];
      // 如果是字符串，将${} $[]语法糖转化为真实函数和变量
      if (isString(value)) {
        // 函数
        if (/^\$\{.+\}$/.test(value)) {
          config[key] = getFunction(functions, value);
        }
        // 变量
        if (/^\$\[.+\]$/.test(value)) {
          config[key] = getValue(common.dataStore, value);
        }
      } else if (value?.actions) {
        const {PublicRefs} = common;
        // actions配置写法，将配置转化为函数
        config[key] = () => {
          value.actions.forEach((action: Action) => {
            switch (action.actionType) {
              case "setState":
                common.setState(action.payload);
                break;
              case "tableReload":
                const table = PublicRefs.getTableRef(action.key);
                table?.current?.reload();
                break;
              case "formReset":
                const form = PublicRefs.getForm(action.key);
                if (form?.current) {
                  form.current?.resetFields();
                } else {
                  form?.resetFields();
                }
                break;
              case "open":
                window.open(action.url);
                break;
              case "link":
                window.location.href = action.url;
                break;
              case "hash":
                window.location.hash = action.url;
                break;
            }
          });
        };
      } else {
        // 继续递归处理下一级对象
        loopMatch(value, functions, common);
      }
    }
  }
}

export function handleConfig(
  config: Config,
  functions: Array<Function>,
  common: Common
) {
  if (!config) return;
  config = JSON.parse(JSON.stringify(config));
  loopMatch(config, functions, common);
  return config;
}

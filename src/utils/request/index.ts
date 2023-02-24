/**
 * http请求工具
 * @author zyh
 * @version 1.0
 * @since 2022-10-21
 */
import {extend} from "umi-request";
import errorHandler from "./errorHandler";

const index = extend({
  errorHandler, // 默认错误处理
  credentials: "include", // 默认请求是否带上cookie
});

export default index;
// @ts-nocheck

/**
 * @author zyh
 * @version 1.0
 * @since 2023/2/24
 */
import {create} from "dva-core";
import model from "@/model";

let app: any;
let store: any;
let dispatch: any;

function createApp(opt: any) {
  // redux日志
  // opt.onAction = [createLogger()];
  app = create(opt);
  // app.use(createLoading({}));

  if (!global.registered) {
    opt.models.map(model => app.model(model));
  }
  global.registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

const dvaApp = dva.createApp({
  initialState: {},
  models: [model],
});
const store = dvaApp.getStore();

export default {
  store,
  createApp,
  getDispatch() {
    return app.dispatch;
  }
}
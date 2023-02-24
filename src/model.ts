export default {
  namespace: "configurablePage",
  state: {},
  effects: {},
  reducers: {
    save(state: Record<string, any>, {payload}: {payload: Record<string, any>}) {
      return {...state, ...payload};
    },
    clear() {
      return {};
    }
  }
};
export type Config = Record<string, any> | undefined;

export type Common = Config;

export interface Function {
  name: string;
  script: string;
}

export interface Action {
  actionType: "setState" | "tableReload" | "formReset" | "open" | "link" | "hash";
  payload: Record<string, any>;
  key: string;
  url: string;
}
/**
 * 渲染页面
 * @author zyh
 * @version 1.0
 * @since 2023/1/7
 */
import React from "react";
import createElement from "./utils/createElement";
import useConfig from "./hooks/useConfig";
import usePageData from "./hooks/usePageData";
import useTitle from "@/hooks/useTitle";
import {handleConfig} from "./utils/handleConfig";
import {connect} from "react-redux";
import useParams from "./hooks/useParams";
import {Config} from "@/types";

interface IProps {
  match: {params?: Record<string, any>};
  dataStore: Record<string, any>;
  dispatch: (param: {type: string, payload: Record<string, any>}) => void;
  config: Config;
}

function Renderer(props: IProps): React.ReactNode {
  const {match, dataStore} = props;
  const pageId = match?.params?.pageId;
  const pathVariable = match?.params?.pathVariable;
  const {config, functions} = props.config || useConfig(pageId);
  const common = useParams(props.dispatch, dataStore);
  useTitle(config?.pageTitle, {restoreOnUnmount: true});
  usePageData(config, props.dispatch, common, pathVariable);
  if (!config || !dataStore.canRender) return null;
  const page: Config | undefined = handleConfig(config.page, functions, common);

  return createElement(page, common);
}

const mapStateToProps = (({configurablePage}: {configurablePage: Record<string, any>}) => ({dataStore: configurablePage}));

// @ts-ignore
export default connect(mapStateToProps)(Renderer);
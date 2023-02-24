/**
 * 递归解析配置文件和创建ReactNode
 * @author zyh
 * @version 1.0
 * @since 2023/1/7
 */
import React, {Fragment, ReactNode} from "react";
import {isArray, isString} from "./util";
import {Config, Common as ICommon} from "@/types";

import {
  Form,
  Input,
  InputNumber,
  Radio,
  Button,
  Card,
  Breadcrumb,
  Divider,
  Row,
  Col,
  Space,
  Modal,
  Drawer,
  Table,
  Tabs,
  Badge,
  Spin,
  Alert,
  Tooltip,
  Avatar,
  Rate,
  Slider,
  Popconfirm,
  Progress,
  Result,
  Skeleton,
  Tree,
} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {FormOutlined} from "@ant-design/icons";

import Tag from "@/components/Tag";
import TimestampDatePicker from "@/components/TimestampDatePicker";
import TForm from "@/components/TForm";
import TTable from "@/components/TTable";
import TSelector from "@/components/TSelector";
import TCheckboxGroup from "@/components/TCheckboxGroup";
import TRadioGroup from "@/components/TRadioGroup";
import TModalForm from "@/components/TModalForm";
import DragModal from "@/component/DragModal";
import TrueOrFalseCheckBox from "@/component/TrueOrFalseCheckBox";
import TrueOrFalseSwitch from "@/component/TrueOrFalseSwitch";
import FilesDraggerUploadObj from "@/component/FilesDraggerUploadObj";
import CodeEditor from "@/component/CodeEditor";
import RichTextEditor, {SimpleEditor} from "@/component/WangEditorV5";
import {
  View,
  Add,
  Edit,
  Save,
  Remove,
  AddDir,
  AddFile,
  Refresh,
  Confirm,
  Reject,
  Pointer,
  Export,
  Search,
  Send,
  Score,
  Refer,
  Report,
  Settings,
  MessageOne,
  MessageMore,
  Common,
  ToolBarAdd,
  ToolbarImport,
  ToolbarExport,
  ToolbarDownload,
} from "@/components/NormButton";

const createElement = (config: Config, common: ICommon) => {
  if (!config || config.props?.hideRender) return null;
  const firstChar = config.type?.[0];
  if ((/[A-Z]/).test(firstChar)) {
    return createComponent(config, common);
  } else {
    const configProps = handleProps(config.props, common);
    let children: Array<ReactNode> = createChildren(config.children, common);
    if (!isArray(children)) {
      children = [children];
    }
    return React.createElement(
      config.type,
      configProps,
      ...children
    );
  }
};

const createChildren = (params: string | Config | Array<Config>, common: ICommon) => {
  let children = null;
  if (params) {
    if (isString(params)) {
      children = params;
    } else if (isArray(params)) {
      children = params.map((child: Config, index: number) =>
        createElement({...child, props: {...child.props, key: child.props?.key || index}}, common));
    } else {
      children = createElement(params, common);
    }
  }
  return children;
};

const createComponent = (config: Config, common: Common) => {
  const configProps = handleProps(config.props, common);
  const nodeProps = handleNodeProps(config.nodeProps, common);
  const finalProps = {...configProps, ...nodeProps};
  const children = createChildren(config.children, common);
  switch (config.type) {
    case "Fragment":
      return <Fragment {...finalProps}>{children}</Fragment>;
    // Antd组件
    case "Form.Item":
      return <Form.Item {...finalProps}>{children}</Form.Item>;
    case "Input":
      return <Input {...finalProps}/>;
    case "TextArea":
      return <Input.TextArea {...finalProps}/>;
    case "InputNumber":
      return <InputNumber {...finalProps}/>;
    case "Radio":
      return <Radio {...finalProps}/>;
    case "Button":
      return <Button {...finalProps}>{children}</Button>;
    case "Card":
      return <Card {...finalProps}>{children}</Card>;
    case "PageContainer":
      return <PageContainer {...finalProps}>{children}</PageContainer>;
    case "Breadcrumb":
      return <Breadcrumb {...finalProps}>{children}</Breadcrumb>;
    case "Breadcrumb.Item":
      return <Breadcrumb.Item {...finalProps}>{children}</Breadcrumb.Item>;
    case "Divider":
      return <Divider {...finalProps}>{children}</Divider>;
    case "Row":
      return <Row {...finalProps}>{children}</Row>;
    case "Col":
      return <Col {...finalProps}>{children}</Col>;
    case "Space":
      return <Space {...finalProps}>{children}</Space>;
    case "Modal":
      return <Modal {...finalProps}>{children}</Modal>;
    case "Drawer":
      return <Drawer {...finalProps}>{children}</Drawer>;
    case "Table":
      return <Table {...finalProps}>{children}</Table>;
    case "Tabs":
      return <Tabs {...finalProps}>{children}</Tabs>;
    case "Tabs.TabPane":
      return <Tabs.TabPane {...finalProps}>{children}</Tabs.TabPane>;
    case "Badge":
      return <Badge {...finalProps}>{children}</Badge>;
    case "Spin":
      return <Spin {...finalProps}>{children}</Spin>;
    case "Alert":
      return <Alert {...finalProps}>{children}</Alert>;
    case "Tooltip":
      return <Tooltip {...finalProps}>{children}</Tooltip>;
    case "Avatar":
      return <Avatar {...finalProps}>{children}</Avatar>;
    case "Rate":
      return <Rate {...finalProps}>{children}</Rate>;
    case "Slider":
      return <Slider {...finalProps}>{children}</Slider>;
    case "Popconfirm":
      return <Popconfirm {...finalProps}>{children}</Popconfirm>;
    case "Progress":
      return <Progress {...finalProps}>{children}</Progress>;
    case "Result":
      return <Result {...finalProps}>{children}</Result>;
    case "Skeleton":
      return <Skeleton {...finalProps}>{children}</Skeleton>;
    case "Tree":
      return <Tree {...finalProps}>{children}</Tree>;

    // 图标
    case "FormOutlined":
      return <FormOutlined {...finalProps}/>;

    // 自定义组件
    case "Tag":
      return <Tag {...finalProps}>{children}</Tag>;
    case "DatePicker":
      return <TimestampDatePicker {...finalProps}/>;
    case "DragModal":
      return <DragModal {...finalProps}>{children}</DragModal>;
    case "Checkbox":
      return <TrueOrFalseCheckBox {...finalProps}>{children}</TrueOrFalseCheckBox>;
    case "Switch":
      return <TrueOrFalseSwitch {...finalProps}>{children}</TrueOrFalseSwitch>;
    case "FilesDraggerUploadObj":
      // @ts-ignore
      return <FilesDraggerUploadObj {...finalProps}/>;

    case "CodeEditor":
      return <CodeEditor {...finalProps}/>;
    case "RichTextEditor":
      return <RichTextEditor {...finalProps}/>;
    case "SimpleEditor":
      return <SimpleEditor {...finalProps}/>;
    case "View":
      return <View {...finalProps}/>;
    case "Add":
      return <Add {...finalProps}/>;
    case "Edit":
      return <Edit {...finalProps}/>;
    case "Save":
      return <Save {...finalProps}/>;
    case "Remove":
      return <Remove {...finalProps}/>;
    case "AddDir":
      return <AddDir {...finalProps}/>;
    case "AddFile":
      return <AddFile {...finalProps}/>;
    case "Refresh":
      return <Refresh {...finalProps}/>;
    case "Confirm":
      return <Confirm {...finalProps}/>;
    case "Reject":
      return <Reject {...finalProps}/>;
    case "Pointer":
      return <Pointer {...finalProps}/>;
    case "Export":
      return <Export {...finalProps}/>;
    case "Search":
      return <Search {...finalProps}/>;
    case "Send":
      return <Send {...finalProps}/>;
    case "Score":
      return <Score {...finalProps}/>;
    case "Refer":
      return <Refer {...finalProps}/>;
    case "Report":
      return <Report {...finalProps}/>;
    case "Settings":
      return <Settings {...finalProps}/>;
    case "MessageOne":
      return <MessageOne {...finalProps}/>;
    case "MessageMore":
      return <MessageMore {...finalProps}/>;
    case "Common":
      return <Common {...finalProps}/>;
    case "ToolBarAdd":
      return <ToolBarAdd {...finalProps}/>;
    case "ToolbarImport":
      return <ToolbarImport {...finalProps}/>;
    case "ToolbarExport":
      return <ToolbarExport {...finalProps}/>;
    case "ToolbarDownload":
      return <ToolbarDownload {...finalProps}/>;

    // 模板组件
    case "TForm":
      return <TForm {...config} common={common}/>;
    case "TTable":
      return <TTable props={configProps} nodeProps={nodeProps} common={common}/>;
    case "TSelector":
      return <TSelector {...finalProps} common={common}/>;
    case "TCheckboxGroup":
      return <TCheckboxGroup {...finalProps} common={common}/>;
    case "TRadioGroup":
      return <TRadioGroup {...finalProps} common={common}/>;
    case "TModalForm":
      return <TModalForm {...config} nodeProps={nodeProps} common={common}/>;
  }
};

const handleProps = (props: Config, common: ICommon) => {
  if (!props) return;
  const {onClick, onCancel, onChange, onPressEnter, rules} = props;
  const finalProps = props;
  if (onClick && isString(onClick)) {
    finalProps.onClick = (...args: Array<any>) => new Function("common", "args", onClick)(common, args);
  }
  if (onCancel && isString(onCancel)) {
    finalProps.onCancel = () => new Function("common", onCancel)(common);
  }
  if (onChange && isString(onChange)) {
    finalProps.onChange = (...args: Array<any>) => new Function("common", "args", onChange)(common, args);
  }
  if (onPressEnter && isString(onPressEnter)) {
    finalProps.onPressEnter = (...args: Array<any>) => new Function("common", "args", onPressEnter)(common, args);
  }
  if (rules && rules.length > 0) {
    const script = rules[0]?.validator;
    if (script && isString(script)) {
      rules[0].validator = (...args: Array<any>) => new Function("common", "args", script)(common, args);
    }
  }
  return finalProps;
};

const handleNodeProps = (props: Config, common: Common) => {
  if (!props) return;
  const nodeProps: Config = {};
  if (props) {
    for (let key in props) {
      const value = props[key];
      if (isArray(value)) {
        nodeProps[key] = value.map((child: Config) => createElement(child, common));
      } else {
        nodeProps[key] = createElement(value, common);
      }
    }
  }
  return nodeProps;
};

export {createChildren, createComponent};
export default createElement;
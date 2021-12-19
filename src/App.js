import './App.css';
import React, { Component } from "react";
import { Button, Tree, Checkbox } from "antd";
import {
  DownOutlined,
  UnorderedListOutlined,
  CodepenOutlined,
  ClusterOutlined,
  BorderLeftOutlined
} from '@ant-design/icons';
import CodeMirror from "./components/CodeMirror/CodeMirror";
import http from './http';
const ProListener = require("./components/formula/ProListener").ProListener;
const ProParser = require("./components/formula/ProParser");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: [], // 类别列表
      pointList: [], // 指标列表
      optionsTree: [], // 运算符
      cm: "cm"
    };
  }

  // 获取指标类型列表
  getPointTypes() {
    http({
      url: "/api/toolbox/srsourcecollect/findSrSourcecollectCategory"
    }).then(res => {
      if (res) {
        this.setState({ typeList: [...res.data] });
      }
    });
  }

  getPointList() {
    const typeid = "A001";
    http({
      url: `/api/toolbox/srbuiltcollect/findBuildCollectList/${typeid}`
    }).then(res => {
      if (res) {
        this.setState({ pointList: [...res.data] });
      }
    });
  }

  getOptionsTree() {
    http({
      method: "POST",
      url: "/api/toolbox/stformula/listFormulaOperationsTree"
    }).then(res => {
      if (res) {
        this.setState({ optionsTree: [...res.data] });
      }
    });
  }

  componentDidMount() {
    this.getPointTypes();
    this.getPointList();
    this.getOptionsTree();

    // console.log(ProListener);
    // console.log(ProParser);
  }

  render() {
    const { typeList, pointList, optionsTree } = this.state;
    return (
      <div className="App">
        <div className="form">
          <div className="editor">
            <CodeMirror></CodeMirror>
          </div>
          <ul className="tools">
            <li className="tools-item">
              <div className="tree-list padding-10">
                <div className="title">
                  < UnorderedListOutlined />
                  <span>类别</span>
                </div>
                <Tree
                  className="tree-list padding-10"
                  showLine
                  switcherIcon={<DownOutlined />}
                  fieldNames={{ title: "description", key: "type" }}
                  treeData={typeList}
                ></Tree>
              </div>
              <div className="tree-tools">
                <Checkbox className="checkbox-item">显示代码指标</Checkbox>
                <Checkbox className="checkbox-item">显示字符指标</Checkbox>
                <Checkbox className="checkbox-item">使用指标编码</Checkbox>
              </div>
            </li>
            <li className="tools-item padding-10">
              <div className="title">
                <BorderLeftOutlined />
                <span>指标</span>
              </div>
              <Tree
                className="tree-list padding-10"
                showLine
                switcherIcon={<DownOutlined />}
                fieldNames={{ title: "description", key: "setid" }}
                treeData={pointList}
              ></Tree>
            </li>
            <li className="tools-item padding-10">
              <div className="title">
                < CodepenOutlined />
                <span>代码</span>
              </div>
              <div className="tree-list padding-10"></div>
            </li>
            <li className="tools-item padding-10">
              <div className="title">
                <ClusterOutlined />
                <span>运算符</span>
              </div>
              <Tree
                className="tree-list padding-10"
                showLine
                switcherIcon={<DownOutlined />}
                fieldNames={{ title: "id", key: "id" }}
                treeData={optionsTree}
              ></Tree>
            </li>
          </ul>
          <div className="footer">
            <Button type="primary" danger>检查</Button>
            <Button type="default">翻译</Button>
            <Button type="default">取消</Button>
            <Button type="primary">确定</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

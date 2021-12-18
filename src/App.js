import './App.css';
import React, { Component } from "react";
import { Button, Tree } from "antd";
import {
  DownOutlined,
  UnorderedListOutlined,
  CodepenOutlined,
  ClusterOutlined,
  BorderLeftOutlined
} from '@ant-design/icons';
import CodeMirror from "./components/CodeMirror/CodeMirror";
import http from './http';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: [],
    };
  }

  getPointTypes() {
    http({
      url: "/api/toolbox/srsourcecollect/findSrSourcecollectCategory"
    }).then(res => {
      this.setState({ typeList: [...res.data] });
      console.log(this.state);
    });
  }

  componentDidMount() {
    this.getPointTypes();
  }

  render() {
    const { typeList } = this.state;
    return (
      <div className="App">
        <div className="form">
          <div className="editor">
            <CodeMirror></CodeMirror>
          </div>
          <ul className="tools">
            <li className="tools-item">
              <div className="tree-body padding-10">
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
              <div className="tree-tools"></div>
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
                fieldNames={{ title: "description", key: "type" }}
                treeData={typeList}
              ></Tree>
            </li>
            <li className="tools-item padding-10">
              <div className="title">
                < CodepenOutlined />
                <span>代码</span>
              </div>
              <div className="tree-list padding-10">dawdadaw</div>
            </li>
            <li className="tools-item padding-10">
              <div className="title">
                <ClusterOutlined />
                <span>运算符</span>
              </div>
              <div className="tree-list padding-10">dawdadaw</div>
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

import './App.css';
import React, { Component } from "react";
import { Button, Tree } from "antd";
import CodeMirror from "./components/CodeMirror/CodeMirror";
import { CarryOutOutlined } from '@ant-design/icons';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        {
          title: '类别',
          key: '0-0',
          icon: <CarryOutOutlined />,
          children: [
            { title: '机构', key: '0-0-0-0', icon: <CarryOutOutlined /> },
            {
              title: '人员',
              key: '0-0-0-1',
              icon: <CarryOutOutlined />,
            },
          ],
        },
      ]
    };
  }

  componentDidMount() {

  }

  render() {
    const { treeData }  = this.state;
    return (
      <div className="App">
        <div className="form">
          <div className="editor">
            <CodeMirror></CodeMirror>
          </div>
          <ul className="tools">
            <li className="tools-item">
              <Tree
                showLine
                defaultExpandedKeys={['0-0-0']}
                treeData={treeData}
              ></Tree>
            </li>
            <li className="tools-item">
              <Tree
                showLine
                defaultExpandedKeys={['0-0-0']}
                treeData={treeData}
              ></Tree>
            </li>
            <li className="tools-item">1</li>
            <li className="tools-item">1</li>
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

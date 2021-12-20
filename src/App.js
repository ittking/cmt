import './App.css';
import React, { Component } from "react";
import { Button, Tree, Checkbox } from "antd";
import _ from "lodash";
import {
  DownOutlined,
  UnorderedListOutlined,
  CodepenOutlined,
  ClusterOutlined,
  BorderLeftOutlined
} from '@ant-design/icons';
import CodeMirror from "./components/CodeMirror/CodeMirror";
import http from './http';
import EventsEmitter from "events";
import formula from "./components/peg/dist/zh";
const events = new EventsEmitter();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: [], // 类别列表
      pointList: [], // 指标列表
      optionsTree: [], // 运算符
      type: {
        typeid: "",
        description: ""
      },
      point: {
        fieldName: "",
        description: ""
      },
    };
  }

  // 获取类型
  getTypes() {
    http({
      url: "/api/toolbox/srsourcecollect/findSrSourcecollectCategory"
    }).then(res => {
      if (res && res.data) {
        const data = res.data.map(t => {
          t.selectable = false; return t;
        })
        this.setState({ typeList: [...data] });
      }
    });
  }

  // 获取类别详情
  getTypeDetail(e) {
    return new Promise((resolve) => {
      http({
        url: `/api/toolbox/srsourcecollect/findSrSourcecollectBytype/${e.type}`
      }).then(res => {
        if (res && res.data) {
          const children = res.data.map(t => {
            t.isLeaf = true; t.type = t.typeid; return t;
          })
          const list = this.state.typeList.map(t => {
            if (t.type === e.type) t.children = children;
            return t;
          })
          this.setState({ typeList: [...list] });
        }
        resolve()
      });
    })
  }

  // 获取指标
  getPointList(id, e) {
    http({
      url: `/api/toolbox/srbuiltcollect/findBuildCollectList/${id}`
    }).then(res => {
      if (res && res.data) {
        const data = res.data.map(p => {
          p.key = _.cloneDeep(p.ordersame); p.selectable = false; return p;
        })
        this.setState({ pointList: [...data], type: { typeid: e.node.typeid, description: e.node.description } });
      }
    });
  }

  // 获取指标详情
  getPointDetail(e) {
    return new Promise((resolve) => {
      http({
        method: "POST",
        url: "/api/toolbox/srbuiltitem/findSrBuildItemList",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({ typeid: e.typeid, setid: e.setid })
      }).then(res => {
        if (res && res.data) {
          const children = res.data.map(t => {
            t.isLeaf = true; t.key = _.cloneDeep(t.FieldName); return t;
          })
          const list = this.state.pointList.map(t => {
            if (t.setid === e.setid) t.children = children;
            return t;
          })
          this.setState({ pointList: [...list] });
        }
        resolve()
      });
    })
  }

  // 插入字段
  insertField(e) {
    const parentField = _.find(this.state.pointList, point => point.setid === e.node.SetId);
    const field = { fieldName: e.node.FieldName, description: e.node.description };
    const code = `${parentField.setid}.${field.fieldName}`;
    const param = `~${parentField.description}.${field.description}~`;
    console.log("code===>",code);
    events.emit("insertfield", param);
  }

  // 插入函数
  addFunction(e) {
    if (e.node.text) {
      events.emit("addFunction", e.node.text);
    }
  }

  // 获取运算符
  getOptionsTree() {
    http({
      method: "POST",
      url: "/api/toolbox/stformula/listFormulaOperationsTree"
    }).then(res => {
      if (res) {
        const data = this.updateTree(res.data);
        this.setState({ optionsTree: [...data] });
      }
    });
  }

  // 更新tree
  updateTree(list, id, children) {
    return list.map(node => {
      if (node.id === id) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          selectable: false,
          children: this.updateTree(node.children, id, children),
        };
      }
      return node;
    });
  }

  componentDidMount() {
    this.getTypes();
    this.getOptionsTree();
  }

  render() {
    const { typeList, pointList, optionsTree } = this.state;
    return (
      <div className="App">
        <div className="form">
          <div className="editor">
            <CodeMirror events={events}></CodeMirror>
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
                  treeData={typeList}
                  fieldNames={{ title: 'description', key: 'type' }}
                  loadData={this.getTypeDetail.bind(this)}
                  onSelect={(key, e) => this.getPointList(key[0], e)}
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
                blockNode
                switcherIcon={<DownOutlined />}
                fieldNames={{ title: "description" }}
                treeData={pointList}
                loadData={this.getPointDetail.bind(this)}
                onSelect={(key, e) => this.insertField(e)}
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
                onSelect={(key, e) => this.addFunction(e)}
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

import './App.css';
import React, { Component } from "react";
import { Button, Tree, Checkbox, message } from "antd";
import _ from "lodash";
import {
  DownOutlined,
  UnorderedListOutlined,
  CodepenOutlined,
  ClusterOutlined,
  BorderLeftOutlined
} from '@ant-design/icons';
import CodeMirror from "./components/CodeMirror/CodeMirror";
import EventsEmitter from "events";
import {
  getTypePoinList,
  getTypes,
  getTypeDetail,
  getPointList,
  getPointDetail,
  getOptionsTree,
  translateCode,
  saveFormula
} from "./api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: [], // 类别指标树
      typeList: [], // 类别
      pointList: [], // 指标
      optionsTree: [], // 运算符
      value: "", // 编辑器内容
      code: "", // 翻译代码
      isOnlyCodePoint: false, // 是否仅显示代码指标
      isOnlyStringPoint: false, // 是否仅显示字符指标
      events: new EventsEmitter()
    };
  }

  // 获取类别详情
  getTypeDetail(e) {
    const typeid = e.type;
    return new Promise((resolve) => {
      getTypeDetail(typeid).then(data => {
        const children = data.map(t => {
          t.isLeaf = true; t.type = t.typeid; return t;
        })
        const list = this.state.typeList.map(t => {
          if (t.type === typeid) t.children = children;
          return t;
        })
        this.setState({ typeList: [...list] });
      });
      resolve();
    });
  }

  // 获取指标
  getPointList(id) {
    this.setState({ pointList: [] });
    getPointList(id).then(data => {
      const result = data.map(p => {
        p.key = _.cloneDeep(p.ordersame); p.selectable = false; return p;
      })
      this.setState({ pointList: [...result] });
    });
  }

  // 获取指标详情
  getPointDetail(e) {
    return new Promise((resolve) => {
      getPointDetail(e.typeid, e.setid).then(data => {
        const children = data.map(t => {
          t.isLeaf = true; t.key = _.cloneDeep(t.FieldName); return t;
        })
        const list = this.state.pointList.map(t => {
          if (t.setid === e.setid) {
            t.children = children; t.selectable = false;
          }
          return t;
        })
        this.setState({ pointList: [...list] });
      });
      resolve();
    })
  }

  // 插入字段
  insertField(e) {
    const { SetId, FieldName, description } = e.node;
    const parentField = _.find(this.state.pointList, point => point.setid === SetId);
    const field = { fieldName: FieldName, description: description };
    // const code = `${parentField.setid}.${field.fieldName}`;
    const param = `~${parentField.description}.${field.description}~`;
    this.state.events.emit("insertfield", param);
  }

  // 插入函数
  addFunction(e) {
    if (e.node.text) {
      this.state.events.emit("addFunction", e.node.text);
    }
  }

  // 更新tree
  updateTree(list, id, children) {
    return list.map(node => {
      if (node.id === id) {
        return {
          ...node,
          children,
          selectable: false,
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

  // 代码编译
  translate() {
    const list = this.state.tree;
    const value = this.state.value;
    const code = translateCode(list,value);
    this.setState({ code });
  }

  // 保存公式
  save() {
    const list = this.state.tree;
    const value = this.state.value;
    const code = translateCode(list,value);
    saveFormula({
      formulaId: "",
      formulaName: `test_${new Date().getTime()}`,
      formula: code,
      formulaText: this.state.value
    }).then(res => {
      if (res && res.code === 200) {
        message.success("保存成功！");
      } else {
        message.error("保存成功！");
      }
    });
  }

  componentDidMount() {
    // 获取运算符
    getOptionsTree().then(data => {
      const result = this.updateTree(data);
      this.setState({ optionsTree: [...result] });
    });

    // 获取类别指标树
    getTypePoinList().then(data => {
      this.setState({ tree: [...data] })
    });

    // 获取类别
    getTypes().then(data => {
      const result = data.map(t => {
        t.selectable = false; return t;
      })
      this.setState({ typeList: [...result] });
    });
  }

  render() {
    const {
      typeList,
      pointList,
      optionsTree,
      events,
      value,
      isOnlyCodePoint,
      isOnlyStringPoint,
      code
    } = this.state;
    return (
      <div className="App">
        <div className="form">
          <div className="editor">
            <CodeMirror events={events} value={value} change={(value) => this.setState({ value, code: "" })}></CodeMirror>
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
                <Checkbox className="checkbox-item" checked={isOnlyCodePoint}>显示代码指标</Checkbox>
                <Checkbox className="checkbox-item" checked={isOnlyStringPoint}>显示字符指标</Checkbox>
                <Checkbox className="checkbox-item">使用指标编码</Checkbox>
              </div>
            </li>
            <li className="tools-item padding-10">
              <div className="title">
                <BorderLeftOutlined />
                <span>指标</span>
              </div>
              {pointList.length ? <Tree
                className="tree-list padding-10"
                showLine
                blockNode
                switcherIcon={<DownOutlined />}
                fieldNames={{ title: "description" }}
                treeData={pointList}
                loadData={this.getPointDetail.bind(this)}
                onSelect={(key, e) => this.insertField(e)}
              ></Tree> : ""}
            </li>
            <li className="tools-item padding-10">
              <div className="title">
                < CodepenOutlined />
                <span>代码</span>
              </div>
              <div className="tree-list padding-10">
                <pre>{code}</pre>
              </div>
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
            <Button type="default" onClick={() => this.translate()}>翻译</Button>
            <Button type="default">取消</Button>
            <Button type="primary">确定</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/lib/codemirror.js";
import 'codemirror/mode/javascript/javascript';
import './formula-default.css';
import './formula-mode';
import _ from "lodash";

class CodeMirror extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        mode: 'formula',
        theme: 'formula-default',
        autofocus: true,
        hintOptions: {
          hint: this._getHint,
          completeSingle: false,
          alignWithWord: true,
          closeOnUnfocus: true,
        },
      },
      editor: null, // 编辑器实例
      value: "",
      cm: null, // 编辑器对象
    };
  }

  // 插入字段
  _insertField(field, pos = null) {
    const currCursorLoc = pos || this.cm.getCursor();
    const fieldMarkText = this._getFieldMarkText(field);
    this.cm.replaceRange(field, currCursorLoc, { line: currCursorLoc.line, ch: currCursorLoc.ch + field.length });
    this.cm.markText(currCursorLoc, { ch: currCursorLoc.ch + field.length, line: currCursorLoc.line }, {
      className: 'cm-form-field',
      atomic: true,
      replacedWith: fieldMarkText,
      inclusiveLeft: false,
      inclusiveRight: false,
    })
    setTimeout(() => {
      this.cm.focus();
    }, 0)
  }

  // 插入函数
  _addFunction(funcName) {
    const currCursorLoc = this.cm.getCursor();
    this.cm.replaceRange(funcName, currCursorLoc);

    setTimeout(() => {
      this.cm.setCursor({ ch: currCursorLoc.ch + funcName.length, line: currCursorLoc.line })
      this.cm.focus();
    }, 0)
  }

  // 获取字段个体
  _getFieldMarkText(field) {
    var fieldMarkText = document.createElement('span');
    fieldMarkText.innerText = field;
    fieldMarkText.classList.add('cm-field-marker')
    return fieldMarkText;
  }

  /**
   * 回显代码
   * @param value 回显内容
   */
  _resetCode(value) {
    let params = value.match(/~[\u4e00-\u9fa5（）]+\.[\u4e00-\u9fa5（）]+~/g);
    if (params && params.length) {
      _.each(params, param => {
        const index = value.indexOf(param);
        const pos = this.cm.posFromIndex(index);
        this._insertField(param, pos);
      })
    }
  }

  componentDidMount() {
    // 设置默认值
    if (this.props.value) {
      this._resetCode();
      this.cm.setValue(this.props.value);
    }

    this.props.events.on("insertfield", (field) => {
      this._insertField(field);
    });

    this.props.events.on("addFunction", (name) => {
      this._addFunction(name);
    });

    this.props.events.on("resetCode", (value) => {
      this._resetCode(value);
    });

    // 监听编辑器
    this.cm.on("change", () => {
      const value = this.cm.getValue();
      this.props.change(value);
    })
  }

  render() {
    const { options, editor, value } = this.state;
    return (
      <CodeMirrorEditor
        className="cm-s-formula-default"
        value={value}
        ref={cm => this.cm = cm && cm.editor}
        options={options}
        editorDidMount={editor}
      ></CodeMirrorEditor>
    );
  }
}

export default CodeMirror;
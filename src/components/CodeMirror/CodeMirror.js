/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/lib/codemirror.js";
import 'codemirror/mode/javascript/javascript';
import './formula-default.css';
import './formula-mode';

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
          closeOnUnfocus: true
        },
      },
      editor: null, // 编辑器实例
      value: "",
      cm: null, // 编辑器对象
    };
  }

  insertField(field) {
    field = field || "～测试.测试~";
    const currCursorLoc = this.cm.getCursor();
    console.log("currCursorLoc===>", currCursorLoc);
    this.cm.replaceRange(field, currCursorLoc);
    this.cm.markText(currCursorLoc, { ch: currCursorLoc.ch + field.length, line: currCursorLoc.line }, {
      className: 'cm-form-field',
      atomic: true,
      replacedWith: field,
      inclusiveLeft: false,
      inclusiveRight: false,
    })
    setTimeout(() => {
      this.cm.focus();
    }, 0)
  }

  componentDidMount() {
    console.log(this.cm);
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
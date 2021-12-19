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
        autofocus:true,
        hintOptions: {
          hint: this._getHint,
          completeSingle: false,
          alignWithWord: true,
          closeOnUnfocus: true
        },
      },
      editor: null, // 编辑器实例
      value: ""
    };
  }

  componentDidMount() {

  }

  render() {
    const { options, editor, value } = this.state;
    return (
      <CodeMirrorEditor
        className="cm-s-formula-default"
        value={value}
        options={options}
        editorDidMount={editor}
      ></CodeMirrorEditor>
    );
  }
}

export default CodeMirror;
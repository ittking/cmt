import CodeMirror from 'codemirror'
import 'codemirror/addon/mode/simple'
CodeMirror.defineSimpleMode("formula", {
  start: [
    { regex: /(?:"[^"]*"?)/, token: "string" },
    { regex: /~[\u4e00-\u9fa5（）]+\.[\u4e00-\u9fa5（）]+~/, token: "value" },
    { regex: /[A-Z]+/, token: "function" },
    { regex: /[0-9\.]+/, token: "number" },
  ],
  meta: {
  }
});

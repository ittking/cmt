import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-c2cc65c4-e78e-4dcd-aa7a-217e6d27e1e8"
  return config;
},err => {
  return Promise.reject(err);// 请求错误处理
})

axios.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response.data)
  } else {
    console.log(response.data)
  }
})

export default axios;
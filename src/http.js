import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-73f3003e-8ddf-474f-a27d-8accf989f887"
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
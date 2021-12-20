import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-7d7ee3f6-6895-43a6-b937-346043c0d113"
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
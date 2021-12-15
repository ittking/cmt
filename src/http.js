import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-a506880f-bf21-4647-a6d2-5cfe55006e17"
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
import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-ee040463-4753-4c31-ae2f-4ff9d514f453"
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
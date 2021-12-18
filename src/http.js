import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-da015c57-de6e-4c6a-aa43-5ded129c00be"
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
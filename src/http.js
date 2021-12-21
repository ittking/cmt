import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-23e94d88-fbf6-4cc5-870c-6dd996de7e0a"
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
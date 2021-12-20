import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-6ca66994-02d5-4afd-958d-6743c31307a8"
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
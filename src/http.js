import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-be21b5d3-f406-44a4-a496-d7686fc330d7"
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
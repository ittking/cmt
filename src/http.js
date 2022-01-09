import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-53445ae0-ab31-4586-b737-0493d467b6d3"
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
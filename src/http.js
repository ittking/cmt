import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-9096ff50-bf88-4385-b47f-43ef670bc697"
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
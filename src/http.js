import axios from "axios";

axios.interceptors.request.use(config => {
  
  config.headers.token = "bGhr-b52a92c3-343d-4598-82be-2bbea4e7781c"
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
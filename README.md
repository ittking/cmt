# 公式项目启动说明

## 环境配置

安装node环境，执行 `node -v` 可查看 *node* 版本

## 安装依赖包

```
yarn install
```

## 配置用户 `Token`

> 进入目录：src/http.js 


```
axios.interceptors.request.use(config => {
  
  config.headers.token = "你的token"
  return config;
}
```

## 启动

```
yarn start
```

*访问 localhost:3000即可～* 
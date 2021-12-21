// /* eslint-disable import/no-anonymous-default-export */
 const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
  app.use(createProxyMiddleware("/api", {
    target: "http://27.185.13.109:7777",
    changeOrigin: false,
    pathRewrite: {
      "^/api": ""
    }
  }))
  app.use(createProxyMiddleware("/aps", {
    target: "http://tomcat.api.hualvhappy.com",
    changeOrigin: false,
    pathRewrite: {
      "^/aps": ""
    }
  }))
}
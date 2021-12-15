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
}
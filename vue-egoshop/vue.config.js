module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3003/",
                pathRewrite: { // 重写路径
                    "^/api": ""
                },
                changeOrigin: true // 允许跨域
            },
        }
    }
}
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000/',  // target host
                ws: true,  // proxy websockets 
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': ''  // rewrite path
                }
            },
        }
    }
};
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api', // 불러오려는 server 의 api path
        createProxyMiddleware({
            target:
                process.env.NODE_ENV === 'development'
                    ? 'http://localhost:8000'
                    : 'https://cryptic-castle-40575.herokuapp.com',
            changeOrigin: true,
        })
    );
};

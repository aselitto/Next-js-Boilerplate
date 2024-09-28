const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function expressMiddleware(router) {
  router.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000', // Adjust if your Next.js server runs on a different port
      changeOrigin: true,
    }),
  );
};

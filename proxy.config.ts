const PROXY_CONFIG = {
  '/api/*': {
    target: '',
    // "target": "https://dev.vannadev.com/",
    secure: false,
    changeOrigin: true,
    crossDomain: true,
    onProxyRes: function (proxyRes, req, res) {
      let cookies = proxyRes.headers['set-cookie'];
      if (cookies) {
        cookies.map(function (item) {
          proxyRes.headers['set-cookie'] = item.replace(/; secure/gi, '');
        });
      }
    }
  }
};

module.exports = PROXY_CONFIG;

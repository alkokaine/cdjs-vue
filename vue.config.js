const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/beer': {
          target: 'https://api.openbrewerydb.org',
          changeOrigin: true,
          pathRewrite: {
            '/beer': ''
          }
        },
        '/olympic': {
          target: 'http://sebastianszwarc.pl:9000',
          changeOrigin: true,
          pathRewrite: {
            '/olympic': ''
          }
        },
        '/qatar2022': {
          target: 'http://api.cup2022.ir/api/v1',
          changeOrigin: true,
          pathRewrite: {
            '/qatar2022':''
          }
        },
        '/dayoff': {
          target: 'https://isdayoff.ru/api',
          pathRewrite: {
            '/dayoff': ''
          }
        },
        '/geo': {
          target: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
          pathRewrite: {
            '/geo': ''
          },
          changeOrigin: false
        },
        '/suggestions': {
          target: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest',
          changeOrigin: true,
          pathRewrite: {
            '/suggestions': ''
          }
        },
        '/local': {
          target: 'https://localhost:5001/',
          pathRewrite: {
            '/local': ''
          }
        }
      },
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' }
    }
  }
}

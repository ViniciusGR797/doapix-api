const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  node: {
    __dirname: false
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './node_modules/swagger-ui-dist/swagger-ui.css', to: 'swagger-ui.css' },
        { from: './node_modules/swagger-ui-dist/swagger-ui-bundle.js', to: 'swagger-ui-bundle.js' },
        { from: './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js', to: 'swagger-ui-standalone-preset.js' },
        { from: './node_modules/swagger-ui-dist/favicon-16x16.png', to: 'favicon-16x16.png' },
        { from: './node_modules/swagger-ui-dist/favicon-32x32.png', to: 'favicon-32x32.png' }
      ]
    })
  ]
};

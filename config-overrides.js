const SassRuleRewire = require('react-app-rewire-sass-rule')
const path = require('path')
const rewireAliases = require('react-app-rewire-aliases')
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = function override(config, env) {
  require('react-app-rewire-postcss')(config, {
    plugins: loader => [require('postcss-rtl')()]
  })

  config = rewireAliases.aliasesOptions({
      
  })(config, env)

  // config = new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  config = new SassRuleRewire()
    .withRuleOptions({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['node_modules', 'src/scss']
            }
          }
        }
      ]
    })
    .rewire(config, env)
  return config
}

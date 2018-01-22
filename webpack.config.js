const path = require('path');

// create extra css file
// see: https://www.npmjs.com/package/extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// see: https://webpack.js.org/configuration/configuration-types/#exporting-a-function
module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  
  console.log('env:', env);

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        
        // include CSS in 
        // use: [
        //   'style-loader',
        //   'css-loader',
        //   'sass-loader'
        // ]

        // create extra css file
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },

    // create extra css file
    plugins: [
      CSSExtract
    ],

    // see: https://webpack.js.org/configuration/devtool/
    // source-map: an extra file is created "bundle.js.map"
    //    bundle.js.map is only loaded when the devtools are opened
    // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, // handle URLs by the history object not by requesting the server
      publicPath: '/dist/'
    }
  };
};

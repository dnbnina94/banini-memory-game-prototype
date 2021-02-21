const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    require('dotenv').config({ path: '.env.prod' });

    return {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, "public"),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    loader: "babel-loader",
                    test: /\.js$/,
                    exclude: /node_modules/   
                }, 
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(svg|png|jpe?g|gif)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                      },
                    ],
                }
            ]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.BACKEND_API_URL': JSON.stringify(process.env.BACKEND_API_URL),
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true
        }
    }
}
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const target = process.env.NODE_ENV === 'production' ? 'web' : 'browserslist'

export default {
    mode,

    entry: './src/app.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(path.dirname('./'), 'build'),
        assetModuleFilename: 'images/[hash][ext][query]',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/i,
                use: [
                    mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    devtool: mode === 'production' ? false : 'source-map',

    devServer: {
        static: './dist',
        hot: true,
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
    ],
};


import webpack from 'webpack';
import config from './index';
import baseConfig from './webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { host, port } = config.server;

export default {

    ...baseConfig,

    mode: 'development',
    devtool: 'cheap-module-eval-source-map',

    entry: [
        `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
        'babel-polyfill',
        `${config.client}/app.js`,
    ],

    output: {
        // ...baseConfig.output,
        publicPath: `http://${host}:${port}/`,
        path: `${config.dist}/src`,
        filename: 'app.js'
    },

    plugins: [
        // “If you are using the CLI, the webpack process will not exit with an error code by enabling this plugin.”
        // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
        new webpack.NoEmitOnErrorsPlugin(),

        // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            filename: `${config.dist}/src/index.html`,
            template: './src/index.html',
            inject: false,
            title: 'WFC'
        })
    ],

    // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
    target: 'web'
};

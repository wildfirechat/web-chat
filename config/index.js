import path from 'path';

const config = {
    server: {
        port: process.env.PORT || 3000,
        host: 'localhost'
    },

    client: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    dist: path.resolve(__dirname, '../dist'),

    // fixme 部署到服务器时，下面需要改成你们自己的服务器地址，**注意端口号**
    STATIC_RESOURCE_PATH: 'https://static.wildfirechat.cn:80/',
};

export default config;

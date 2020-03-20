import path from 'path';

const config = {
    server: {
        port: process.env.PORT || 3000,
        host: 'localhost'
    },

    client: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    dist: path.resolve(__dirname, '../dist'),

    // fixme 部署到服务器时，下面需要改成你们自己的服务器地址，如果需要使用非80端，一定要带上端口信息, 如:
    //STATIC_RESOURCE_PATH: 'https://static.wildfirechat.cn:8080/',
    STATIC_RESOURCE_PATH: 'https://static.wildfirechat.cn/',
};

export default config;

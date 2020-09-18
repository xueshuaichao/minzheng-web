const path = require('path');
const merge = require('deepmerge');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = {
    publicPath: '/',

    // tweak internal webpack configuration.
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => merge(options, {
                loaders: {
                    i18n: '@kazupon/vue-i18n-loader',
                },
            }));

        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets/images'))
            .set('@libs', resolve('src/libs'))
            .set('@store', resolve('src/store'))
            .set('@component', resolve('src/view/components'));
    },

    css: {
        // 配置高于chainWebpack中关于css loader的配置
        loaderOptions: {
            // css预设器配置项
            less: {
                javascriptEnabled: true,
            },
        },
    },

    transpileDependencies: [/\biview\/src\/locale\/lang\b/],

    devServer: {
        open: true,
        compress: true,
        // 解决 Webpack "Invalid Host Header"
        disableHostCheck: true,
        proxy: {
            '/api': {
                target:
                    'http://modular-gateway.testing1.svc.k8s.bjo.wdcloud.cc',
                ws: true,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
};

module.exports = {
    baseUrl: process.env.BASE_URL || "/",
    outputDir: '../',
    assetsDir: 'static',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/style/mixins.scss";`
            }
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Index Page'
        },
        notfount: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: '404.html',
            title: 'Not Found Page'
        }
    },
    devServer: {
        open: false,
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: process.env.VUE_APP_API_HOST,
                changeOrigin: true
            }
        }
    }
};
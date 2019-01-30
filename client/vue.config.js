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
            filename: '404.html',
            title: 'Index Page'
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.externals = {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                vuex: 'Vuex',
                axios: 'axios'
            }
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
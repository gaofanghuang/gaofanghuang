module.exports = {
    baseUrl: process.env.BASE_URL || "/",
    outputDir: '../blog/',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/style/mixins.scss";`
            }
        }
    },
    configureWebpack: {
        output: {
            chunkFilename: "js/[name]-[chunkhash].js"
        }
    },
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].chunksSortMode = "none";
            return args;
        });
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
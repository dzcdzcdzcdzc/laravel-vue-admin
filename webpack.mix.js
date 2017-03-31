let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.copy('node_modules/datatables.net-bs/css/dataTables.bootstrap.css', 'public/css/plugins/dataTables.bootstrap.css');
mix.copy('node_modules/toastr/build/toastr.min.css', 'public/css/plugins/toastr.min.css');
mix.combine(['node_modules/tooltipster/dist/css/tooltipster.bundle.css',
'node_modules/tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-light.min.css'],
'public/css/plugins/tooltipster.css');
mix.js('resources/assets/js/app.js', 'public/js/frame.js');
mix.autoload({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery',
    _: 'lodash'
});
mix.webpackConfig({
    resolve:{
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-router$': 'vue-router/dist/vue-router.common.js'
        }
    },
});
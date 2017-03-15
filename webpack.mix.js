const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.copy('node_modules/datatables.net-bs/css/dataTables.bootstrap.css', 'public/css/plugins/dataTables.bootstrap.css');
mix.js('resources/assets/js/app.js', 'public/js/frame.js');
mix.autoload({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery',
    _: 'lodash'
});
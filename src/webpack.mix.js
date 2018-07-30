let mix = require('laravel-mix');

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
mix.options({
    uglify: {
        uglifyOptions: {
          mangle: false
        }
    },
});

if (!mix.inProduction()) {
    mix.webpackConfig({devtool: 'inline-source-map'})
}

mix.combine([
    'node_modules/jquery/dist/jquery.js',
    /*'node_modules/angular/angular.js',
    'node_modules/angular-sanitize/angular-sanitize.js',*/
    'node_modules/popper.js/dist/umd/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    /*'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
*/
   ], 'public/js/vendor.js')
   .sourceMaps()
   .combine('resources/assets/js/**/*.js', 'public/js/app.js')
   
   .less('resources/assets/less/app.less', 'public/css')
   .sourceMaps()
   .version();

mix.browserSync({proxy: 'localhost:8000'});
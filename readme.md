# laravel-vue-admin

## 简介
写给自己使用的后台管理网站。

##控件
AdminLTE 2.3

Vue 2.1

vuex 2.1

Vue-router 2.1

Laravel 5.4

##注意
composer中的zizaco/entrust需要使用laravel的缓存的tag方法。tag方法无法在file和database存储类型下使用。

详见：https://laravel.com/docs/5.4/cache#cache-tags

去除了AdminLte 2.3 app.js中的parent.find('li.active').removeClass('active');
## 许可
GNU GENERAL PUBLIC LICENSE

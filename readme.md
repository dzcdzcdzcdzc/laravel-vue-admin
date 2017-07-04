# laravel-vue-admin

## 简介
写给自己使用的后台管理网站。

## 控件
AdminLTE 2.3

Vue 2.3

vuex 2.3

Vue-router 2.3

Laravel 5.4

## 安装
composer install

npm install

npm run dev

如果datatables控件报错，执行以下语句重新安装：

npm remove datatables.net

npm remove datatables.net-bs

npm install datatables.net

npm install datatables.net-bs

## 注意
composer中的zizaco/entrust需要使用laravel的缓存的tag方法。tag方法无法在file和database存储类型下使用。

详见：https://laravel.com/docs/5.4/cache#cache-tags

去除了AdminLte 2.3 app.js中的parent.find('li.active').removeClass('active');

去除了AdminLte的css中的所有谷歌字体
## 许可
GNU GENERAL PUBLIC LICENSE

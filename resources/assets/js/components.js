//框架组件
Vue.component('example', require('./components/Example.vue'));
Vue.component('sidebar_menu', require('./components/frame/sidebar_menu.vue'));
Vue.component('sidebar_menu_treeview', require('./components/frame/sidebar_menu_treeview.vue'));
Vue.component('content_header', require('./components/frame/content_header.vue'));
//datatable
Vue.component('datatables', resolve => {
    require.ensure(['./components/datatables/datatables.vue'], () => {
        resolve(require('./components/datatables/datatables.vue'))
    })
});
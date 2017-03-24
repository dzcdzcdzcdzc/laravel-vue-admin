//框架组件
Vue.component('d-example', require('./components/Example.vue'));
Vue.component('d-sidebar_menu', require('./components/frame/sidebar_menu.vue'));
Vue.component('d-sidebar_menu_treeview', require('./components/frame/sidebar_menu_treeview.vue'));
Vue.component('d-content_header', require('./components/frame/content_header.vue'));
//datatable
Vue.component('d-datatables', resolve => {
    require.ensure(['./components/datatables/datatables.vue'], () => {
        resolve(require('./components/datatables/datatables.vue'))
    })
});
//datatable
Vue.component('d-input', resolve => {
    require.ensure(['./components/forms/input.vue'], () => {
        resolve(require('./components/forms/input.vue'))
    })
});
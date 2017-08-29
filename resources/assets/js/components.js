//框架组件
Vue.component('d-example', require('./components/Example.vue'));
Vue.component('d-sidebar_menu', require('./components/frame/sidebar_menu.vue'));
Vue.component('d-sidebar_menu_treeview', require('./components/frame/sidebar_menu_treeview.vue'));
Vue.component('d-content_header', require('./components/frame/content_header.vue'));
//table
Vue.component('d-datatables', resolve => {
    require.ensure(['./components/table/datatables.vue'], () => {
        resolve(require('./components/table/datatables.vue'))
    })
});
//forms
Vue.component('d-input', resolve => {
    require.ensure(['./components/forms/input.vue'], () => {
        resolve(require('./components/forms/input.vue'))
    })
});
Vue.component('d-select', resolve => {
    require.ensure(['./components/forms/select.vue'], () => {
        resolve(require('./components/forms/select.vue'))
    })
});
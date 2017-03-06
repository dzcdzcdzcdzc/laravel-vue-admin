/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./routes');

Vue.component('example', require('./components/Example.vue'));

//面包屑
const breadcrumb = {
    state: {
        title: "",
        description: "",
        breadcrumb: []
    },
    mutations: {
        change(state, data) {
            state.title = data.title;
            state.description = data.description;
            state.breadcrumb = data.breadcrumb;
        }
    }
};

//vuex加载模块
window.store = new Vuex.Store({
    modules: {
        breadcrumb
    }
});

window.vm = new Vue({
    el: '#app',
    store,
    router,
});

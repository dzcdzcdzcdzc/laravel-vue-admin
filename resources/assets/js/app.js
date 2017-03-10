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

const Foo = resolve => {
    require.ensure(['./views/index.vue'], () => {
        resolve(require('./views/index.vue'))
    })
};
const Bar = {template: '<div>bar</div>'};

const routes = [
    {path: '/', component: Foo},
    {path: '/bar', component: Bar}
];

window.router = new VueRouter({
    mode: "history",
    linkActiveClass: "active",
    routes
});

window.router.beforeEach((to, from, next) => {
    store.commit("breadcrumb_change", {
        title: "",
        description: "",
        breadcrumb: []
    });
    next();
});

Vue.component('example', require('./components/Example.vue'));

Vue.component('sidebar_menu', require('./components/frame/sidebar_menu.vue'));

Vue.component('sidebar_menu_treeview', require('./components/frame/sidebar_menu_treeview.vue'));

//路由
const sidebar = {
    state: {
        menu: {}
    },
    mutations: {
        sidebar_menu_change (state, data) {
            state.menu = data;
        }
    },
    actions: {
        sidebar_get_menu(context) {
            axios.get('/api/path').then(function (response) {
                context.commit('sidebar_menu_change', response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
};

//面包屑
const breadcrumb = {
    state: {
        title: "",
        description: "",
        breadcrumb: []
    },
    mutations: {
        breadcrumb_change(state, data) {
            state.title = data.title;
            state.description = data.description;
            state.breadcrumb = data.breadcrumb;
        }
    }
};

//vuex加载模块
window.store = new Vuex.Store({
    modules: {
        sidebar,
        breadcrumb,
    }
});

window.vm = new Vue({
    el: '#app',
    store,
    router,
});

store.dispatch('sidebar_get_menu');
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

const routes = [
    {
        path: '/', component: resolve => {
        require.ensure(['./views/index.vue'], () => {
            resolve(require('./views/index.vue'))
        })
    }
    },
    {path: '/bar', component: {template: '<div>bar</div>'}}
];

window.router = new VueRouter({
    mode: "history",
    routes
});

window.router.beforeEach((to, from, next) => {
    store.commit('breadcrumb_change', to.path);
    next();
});

Vue.component('example', require('./components/Example.vue'));

Vue.component('sidebar_menu', require('./components/frame/sidebar_menu.vue'));

Vue.component('sidebar_menu_treeview', require('./components/frame/sidebar_menu_treeview.vue'));

Vue.component('content_header', require('./components/frame/content_header.vue'));
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
                let data = response.data;
                let menu = {};
                _(data).forEach(function (item) {
                    let p = menu;
                    _.forEach(item.menu.split("-"), function (v) {
                        if (!p[v]) {
                            item.children = {};
                            p[v] = item;
                        }
                        p = p[v]['children'];
                    });
                });
                context.commit('sidebar_menu_change', menu);
                store.commit('breadcrumb_change', window.location.pathname);
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
        menu: "",
        description: "",
        breadcrumb: []
    },
    mutations: {
        /**
         *查找路由更新面包屑
         * @param state
         */
        breadcrumb_change(state, path) {
            function find(menu) {
                for (let key of Object.keys(menu)) {
                    let item = menu[key];
                    if (item.path) {
                        if ((item.exact && path == item.path) ||
                            (!item.exact && !path.indexOf(item.path))) {
                            state.title = item.display_name;
                            state.menu = item.menu;
                            state.description = item.description;
                            state.breadcrumb.unshift({url: item.path, title: item.display_name});
                            return true;
                        }
                    }
                    if (!_.isEmpty(item.children) && find(item.children)) {
                        state.breadcrumb.unshift({url: item.path, title: item.display_name});
                        return true;
                    }
                }
                return false;
            }

            store.commit('breadcrumb_clear');
            let menu = store.state.sidebar.menu;
            if (!_.isObject(menu) || _.isEmpty(menu)) {
                return false;
            }
            find(menu);
            _.first(state.breadcrumb).first = 1;
            _.last(state.breadcrumb).last = 1;
        },
        /**
         * 面包屑清除
         * @param state
         */
        breadcrumb_clear(state){
            state.title = "";
            state.menu = "";
            state.description = "";
            state.breadcrumb = [];
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
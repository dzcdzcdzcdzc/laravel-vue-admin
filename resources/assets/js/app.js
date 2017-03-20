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
require('./router');

require('./components');

//框架
const frame = {
    state: {
        permissions: {},
        sidebar_menu: {}
    },
    getters: {
        //获取permissions中的menu部分
        get_menu: state => {
            return _.reject(state.permissions, {'icons': ''});
        }
    },
    mutations: {
        permissions_change: (state, data) => {
            state.permissions = data;
        },
        sidebar_menu_change: (state, data) => {
            state.sidebar_menu = data;
        },
    },
    actions: {
        init: state => {
            //获取用户权限
            axios.get('/api/path').then(function (response) {
                let data = response.data;
                state.commit('permissions_change', data);
                //将用户权限中的菜单组成树
                data = state.getters.get_menu;
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
                state.commit('sidebar_menu_change', menu);
                state.commit('breadcrumb_change', window.location.pathname);
            }).catch(function (error) {
                console.error(error);
            });
        }
    }
};

//vuex面包屑
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
         * @param path
         */
        breadcrumb_change: (state, path) => {
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
            let menu = store.getters.get_menu;
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
        breadcrumb_clear: state => {
            state.title = "";
            state.menu = "";
            state.description = "";
            state.breadcrumb = [];
        }
    }
};

//vuex加载模块
window.store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        frame,
        breadcrumb,
    }
});

window.vm = new Vue({
    el: '#app',
    store,
    router,
});

//全局方法
window.can = (name) => !!_.find(store.state.frame.permissions, {name:name});

store.dispatch('init');
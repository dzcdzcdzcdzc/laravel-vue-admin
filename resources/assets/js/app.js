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

//全局通知
window.toastr = require('toastr');
window.toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
//全局请求错误处理方法
window.ajax_except = error => {
    if (error.response) {
        if (error.response.data.error) {
            toastr.error(error.response.data.error);
            return;
        }
        switch (error.response.status) {
            case 405:
                toastr.error("请求方法不允许");
                return;
            case 500:
                toastr.error("服务器错误");
                return;
        }
    }
    toastr.error(error.message);
};

//框架
const frame = {
    state: {
        permissions: {}, //权限
        sidebar_menu: {}, //菜单
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
                state.dispatch('breadcrumb_change', window.location.pathname);
            }).catch(ajax_except);
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
         * @param data
         */
        breadcrumb_change: (state, data) => {
            state.title = data.title;
            state.menu = data.menu;
            state.description = data.description;
            state.breadcrumb = data.breadcrumb;
        }
    },
    actions: {
        breadcrumb_change: (state, path) => {
            function find(menu) {
                for (let key of Object.keys(menu)) {
                    let item = menu[key];
                    if (item.path) {
                        if ((item.exact && path === item.path) ||
                            (!item.exact && !path.indexOf(item.path))) {
                            data.title = item.display_name;
                            data.menu = item.menu;
                            data.description = item.description;
                            data.breadcrumb.unshift({url: item.path, title: item.display_name});
                            return true;
                        }
                    }
                    if (!_.isEmpty(item.children) && find(item.children)) {
                        data.breadcrumb.unshift({url: item.path, title: item.display_name});
                        return true;
                    }
                }
                return false;
            }

            let data = {title: "", menu: "", description: "", breadcrumb: []};
            let menu = store.state.frame.sidebar_menu;
            if (!_.isObject(menu) || _.isEmpty(menu)) {
                return false;
            }
            find(menu);
            _.first(data.breadcrumb).first = 1;
            _.last(data.breadcrumb).last = 1;
            state.commit('breadcrumb_change', data);
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
window.can = name => !!_.find(store.state.frame.permissions, {name});


window.temp = {
    state: {},
    store: (name, data) => {
        let arr = name.split('.');
        let p = temp.state;
        for (let i = 0; i < arr.length - 1; i++) {
            if (typeof(p[arr[i]]) === "undefined") {
                p[arr[i]] = {};
            }
            p = p[arr[i]];
        }
        p[_.last(arr)] = data;
    },
    delete: (name) => {
        let arr = name.split('.');
        let p = temp.state;
        for (let i = 0; i < arr.length - 1; i++) {
            p = p[arr[i]];
        }
        delete p[_.last(arr)];
    }
};

store.dispatch('init');
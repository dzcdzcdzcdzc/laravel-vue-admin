//路由路径对应模板
const routes = [
    {
        path: '/', component: resolve => {
        require.ensure(['./views/index.vue'], () => {
            resolve(require('./views/index.vue'))
        })
    }
    },
    {
        path: '/users', component: resolve => {
        require.ensure(['./views/users/index.vue'], () => {
            resolve(require('./views/users/index.vue'))
        })
    }
    },
];

//路由初始化
window.router = new VueRouter({
    mode: "history",
    routes
});

//路由切换钩子
window.router.beforeEach((to, from, next) => {
    store.dispatch('breadcrumb_change', to.path);
    next();
});
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
    routes
});

window.router.beforeEach((to, from, next) => {
    store.commit("change", {
        title: "",
        description: "",
        breadcrumb: []
    });
    next();
});
const Foo = resolve => require(['./views/index.vue'], resolve);
const Bar = { template: '<div>bar</div>' };

const routes = [
    {path: '/', component: Foo},
    {path: '/bar', component: Bar}
];

window.router = new VueRouter({
    routes
});

// window.router.beforeEach((to, from, next) => {
//     console.log(to, from, next);
// });
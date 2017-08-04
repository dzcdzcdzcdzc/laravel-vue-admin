//全局临时存储
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

//全局生成唯一id
window.mkid = () => {
    if (!window.temp.state.id) {
        window.temp.store('id', 1);
    }
    return String(Date.now()) + window.temp.state.id++;
};

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

//全局错误HTTP返回码提示
window.error_http = (status) => {
    switch (status) {
        case 401:
            toastr.error("用户未登录");
            return;
        case 403:
            toastr.error("请求被拒绝");
            return;
        case 404:
            toastr.error("页面未找到");
            return;
        case 405:
            toastr.error("请求方法不允许");
            return;
        case 500:
            toastr.error("服务器错误");
            return;
    }
};

//全局请求消息处理
axios.interceptors.response.use(
    response => {
        if (typeof(response.data.error) !== "undefined" && typeof(response.data.msg) === "string") {
            if (!response.data.error) {
                toastr.success(response.data.msg);
            } else {
                toastr.error(response.data.msg);
            }
        }
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.data.error) {
                toastr.error(error.response.data.error);
                return;
            }
            error_http(error.response.status);
        }
        toastr.error(error.message);
    }
);

//全局判断权限方法
window.can = name => !!_.find(store.state.frame.permissions, {name});

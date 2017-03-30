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

//全局判断权限方法
window.can = name => !!_.find(store.state.frame.permissions, {name});

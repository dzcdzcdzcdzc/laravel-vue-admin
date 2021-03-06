<template>
    <table :id="id" class="table table-bordered table-hover">
        <slot>
            <thead>
            <tr>
            </tr>
            </thead>
        </slot>
    </table>
</template>

<script>
    import 'datatables.net-bs'
    import 'datatables.net-bs/css/dataTables.bootstrap.css'
    import 'datatables.net-responsive-bs'
    export default {
        props: {
            'name': {
                type: String,
                default: 'datatables'
            },
            'conf': {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                id: mkid()
            }
        },
        created() {
            if (!$.fn.dataTable.pipeline) { //管道式分页加载数据
                $.fn.dataTable.pipeline = function (conf) {
                    let cacheLower = -1;
                    let cacheUpper = null;
                    let cacheLastRequest = null;
                    let cacheLastJson = null;
                    return function (request, drawCallback, settings) {
                        let ajax = false;
                        let requestStart = request.start;
                        let drawStart = request.start;
                        let requestLength = request.length;
                        let requestEnd = requestStart + requestLength;
                        if (settings.clearCache) {
                            ajax = true;
                            settings.clearCache = false;
                        } else if (cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper) {
                            ajax = true;
                        } else if (JSON.stringify(request.order) !== JSON.stringify(cacheLastRequest.order) ||
                            JSON.stringify(request.columns) !== JSON.stringify(cacheLastRequest.columns) ||
                            JSON.stringify(request.search) !== JSON.stringify(cacheLastRequest.search)
                        ) {
                            ajax = true;
                        }
                        cacheLastRequest = $.extend(true, {}, request);
                        if (ajax) {
                            if (requestStart < cacheLower) {
                                requestStart = requestStart - (requestLength * (conf.pages - 1));
                                if (requestStart < 0) {
                                    requestStart = 0;
                                }
                            }
                            cacheLower = requestStart;
                            cacheUpper = requestStart + (requestLength * conf.pages);
                            request.start = requestStart;
                            request.length = requestLength * conf.pages;
                            if ($.isFunction(conf.data)) {
                                let d = conf.data(request);
                                if (d) {
                                    $.extend(request, d);
                                }
                            } else if ($.isPlainObject(conf.data)) {
                                $.extend(request, conf.data);
                            }
                            settings.jqXHR = $.ajax({
                                "type": conf.method,
                                "url": conf.url,
                                "data": request,
                                "dataType": "json",
                                "cache": false,
                                "success": function (json) {
                                    cacheLastJson = $.extend(true, {}, json);
                                    if (cacheLower !== drawStart) {
                                        json.data.splice(0, drawStart - cacheLower);
                                    }
                                    if (requestLength >= -1) {
                                        json.data.splice(requestLength, json.data.length);
                                    }
                                    drawCallback(json);
                                },
                                "error": function (XMLHttpRequest, textStatus, errorThrown) {
                                    error_http(XMLHttpRequest.status);
                                }
                            });
                        } else {
                            let json = $.extend(true, {}, cacheLastJson);
                            json.draw = request.draw;
                            json.data.splice(0, requestStart - cacheLower);
                            json.data.splice(requestLength, json.data.length);
                            drawCallback(json);
                        }
                    }
                };
                $.fn.dataTable.Api.register('clearPipeline()', function () {
                    return this.iterator('table', function (settings) {
                        settings.clearCache = true;
                    });
                });
                $.getScript('/plugins/datatables/extensions/Responsive/js/dataTables.responsive.min.js');
            }
        },
        mounted() {
            const dconf = {
                processing: true,
                deferRender: true,
                responsive: true,
                scrollX: "100%",
                scrollXInner: "100%",
                order: [[0, "asc"]], //排序
                columns: [],
                serverSide: true,
                language: {
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页"
                    },
                    "oAria": {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                }
            };
            this.conf.ajax = $.fn.dataTable.pipeline(_.defaultsDeep(this.conf.ajax, {
                    url: '#', //加载地址
                    pages: 5, //每次加载页数
                    method: 'GET',
                    data: function (d) {
                        //额外数据
                    }
                })
            );
            let self = $("#" + this.id).DataTable(_.defaultsDeep(this.conf, dconf));
            temp.store(this.name + ".api", self);
            temp.store(this.name + ".reload", function () {
                this.api.clearPipeline();
                this.api.ajax.reload(null, false);
            });
        },
        destroyed() {
            temp.state[this.name].api.destroy();
            temp.delete(this.name);
        }
    }
</script>
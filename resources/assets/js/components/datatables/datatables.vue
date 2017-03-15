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
    import dt from 'datatables.net-bs'
    export default {
        props: ['conf'],
        data() {
            return {
                self : Object,
                id : 'datatables'+Math.floor(Math.random()*100000)
            }
        },
        mounted() {
            const dconf = {
                processing: true,
                deferRender: true,
                order: [[0, "asc"]],
                columns: [
                ],
                serverSide: true,
                ajax: {
                    url: '#',
                    data: function (d) {
                        //额外数据
                    }
                },
                language: {
                    "sProcessing":   "处理中...",
                    "sLengthMenu":   "显示 _MENU_ 项结果",
                    "sZeroRecords":  "没有匹配结果",
                    "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix":  "",
                    "sSearch":       "搜索:",
                    "sUrl":          "",
                    "sEmptyTable":     "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands":  ",",
                    "oPaginate": {
                        "sFirst":    "首页",
                        "sPrevious": "上页",
                        "sNext":     "下页",
                        "sLast":     "末页"
                    },
                    "oAria": {
                        "sSortAscending":  ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                }
            };
            this.self = $("#"+this.id).DataTable(_.defaultsDeep(this.conf,dconf));
            //给全选加事件
            //this.self.$(".chkall").on("click", function () {
            //    if ($(this).prop("checked") === true) {
            //        $("#"+this.id+" input[name='chk[]']").prop("checked", true);
            //    } else {
            //        $("#"+this.id+" input[name='chk[]']").prop("checked", false);
            //    }
            //});
        },
        destroyed() {
            this.self.destroy();
        }
    }
</script>

<style>
    @import "/css/plugins/dataTables.bootstrap.css"
</style>
<template>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Hover Data Table</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <datatables :conf="datatables">
                            <thead>
                            <tr>
                                <th><input class="chkall" type="checkbox"></th>
                                <th>序号</th>
                                <th>名字</th>
                                <th>邮箱</th>
                                <th>邮箱</th>
                                <th>邮箱</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                        </datatables>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </section>
</template>
<style>

</style>
<script>
    export default {
        data(){
            return {
                datatables:{
                    order: [[1, "asc"]],
                    columns: [
                        {
                            "data": "chk", "orderable": false,
                            "render": function (data, type, row) {
                                return '<input type="checkbox" name="chk[]" value=' + row.id + ' />';
                            }
                        },
                        {"data": "id"},
                        {"data": "name"},
                        {"data": "email"},
                        {"data": "email"},
                        {"data": "email"},
                        {"data": "created_at"},
                        {
                            "data": "operate", "orderable": false,
                            "render": function (data, type, row) {
                                return "<button class='btn-white btn btn-xs' onclick='window.open(\"/article/" + row.id + "/edit\",\"_blank\")'>编辑</button><button class='btn-white btn btn-xs' onclick='singledel(\"/article/" + row.id + "\");'>删除</button>";
                            }
                        }
                    ],
                    ajax: {
                        url: '/api/users',
                        data: function (d) {
                            //额外数据
                        }
                    }
                }
            }
        }
    }

</script>

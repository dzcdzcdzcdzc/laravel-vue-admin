<template>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">用户列表</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <d-datatables :conf="datatables">
                            <thead>
                            <tr>
                                <th><input class="chkall" type="checkbox"></th>
                                <th>序号</th>
                                <th>名字</th>
                                <th>邮箱</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                        </d-datatables>
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
    import 'tooltipster'
    export default {
        data(){
            return {
                datatables: {
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
                        {"data": "created_at"},
                        {
                            "data": "operate", "orderable": false,
                            "render": function (data, type, row) {
                                let str = '<div class="btn-group">';
                                if (can('用户管理修改')) {
                                    str += `<button type="button" onclick="router.push('/users/${row.id}/edit')" class="btn btn-default btn-xs">修改</button>`;
                                }
                                if (can('用户管理删除')) {
                                    str += `<button type="button" class="btn btn-default btn-xs deletebtn" data-id="${row.id}">删除</button>`;
                                }
                                str += '</div>';
                                return str;
                            }
                        }
                    ],
                    ajax: {
                        url: '/api/users',
                        data: function (d) {
                            //额外数据
                        }
                    },
                    drawCallback: function (settings) {
                        $('.deletebtn').tooltipster({
                            contentAsHTML: true,
                            interactive: true,
                            theme: 'tooltipster-light',
                            trigger: 'click',
                            content: `<div class="form-group text-center">确定删除吗</div>
                            <div class="btn-group">
                            <button type="button" class="btn btn-danger">是</button>
                            <button type="button" class="btn btn-info">否</button>
                            </div>`,
                            functionReady: function () {
                                let id = $(this)[0]['_$origin'].attr('data-id');
                                //删除确定事件
                                $('.tooltipster-sidetip button.btn-danger').click(function () {
                                    $('.deletebtn').tooltipster('hide');
                                    axios.delete('/api/users/' + id).then(function (response) {
                                        if (!response.data.error) {
                                            temp.state.datatables.reload();
                                            toastr.success(response.data.msg);
                                            return false;
                                        }
                                        toastr.error(response.data.msg);
                                    }).catch(ajax_except);
                                });
                                //删除取消事件
                                $('.tooltipster-sidetip button.btn-info').click(function () {
                                    $('.deletebtn').tooltipster('hide');
                                });
                            }
                        });
                    }
                }
            }
        }
    }

</script>
<style>
    @import "/css/plugins/tooltipster.css";
</style>
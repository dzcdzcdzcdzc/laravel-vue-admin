<template>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">角色权限编辑</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="box-body">
                                <d-input name="name" label="名字"></d-input>
                                <d-input name="menu" label="菜单"></d-input>
                                <d-input name="display_name" label="显示"></d-input>
                                <d-input name="description" label="描述"></d-input>
                                <d-input name="path" label="地址"></d-input>
                                <d-input name="icons" label="图标"></d-input>
                                <d-input name="exact" label="完全匹配"></d-input>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <div class="col-sm-10 col-md-offset-2">
                            <button type="button" @click="submit" class="btn btn-info">提交</button>
                            <button type="button" @click="cancel" class="btn btn-default">取消</button>
                        </div>
                    </div>
                </div>
                <!-- /.box -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </section>
</template>
<script>
    export default {
        data () {
            return {
                data: null,
            }
        },
        beforeRouteEnter (to, from, next) {
            axios.get('/api/permissions/' + to.params.id + '/edit').then(function (response) {
                store.commit('form_create', response.data);
                next();
            }).catch(function (error) {
                next(false);
            });
        },
        methods: {
            submit: function () {
                axios.put('/api/permissions/' + router.history.current.params.id, store.state.form).then(function (response) {
                    if (!response.data.error) {
                        router.push({name: 'permissions_index'});
                    }
                });
            },
            cancel: function () {
                router.push({name: 'permissions_index'});
            }
        }
    }

</script>
<style>
</style>
<template>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">角色编辑</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="box-body">
                                <d-input name="name" placeholder="名称"></d-input>
                                <d-input name="display_name" placeholder="显示名称"></d-input>
                                <d-input name="description" placeholder="描述"></d-input>
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
            axios.get('/api/roles/' + to.params.id + '/edit').then(function (response) {
                store.commit('form_create', response.data);
                next();
            }).catch(function (error) {
                next(false);
            });
        },
        methods: {
            submit: function () {
                axios.put('/api/roles/' + router.history.current.params.id, store.state.form).then(function (response) {
                    if (!response.data.error) {
                        router.push({name: 'roles_index'});
                    }
                });
            },
            cancel: function () {
                router.push({name: 'roles_index'});
            }
        }
    }

</script>
<style>
</style>
<template>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">用户编辑</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="box-body">
                                <d-input name="name" placeholder="用户名"></d-input>
                                <d-input name="email" placeholder="email"></d-input>
                                <d-input type="password" name="password1" placeholder="密码"></d-input>
                                <d-input type="password" name="password2" placeholder="再次输入密码"></d-input>
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
            axios.get('/api/users/' + to.params.id + '/edit').then(function (response) {
                store.commit('form_create', response.data);
                next();
            }).catch(function (error) {
                next(false);
            });
        },
        methods: {
            submit: function () {
                axios.put('/api/users/' + router.history.current.params.id, store.state.form).then(function (response) {
                    if (!response.data.error) {
                        router.push({name: 'users_index'});
                    }
                });
            },
            cancel: function () {
                router.push({name: 'users_index'});
            }
        }
    }

</script>
<style>
</style>
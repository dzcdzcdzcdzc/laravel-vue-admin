<template>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">用户编辑</h3>
                    </div>
                    <div class="box-body">
                        <d-input name="name" placeholder="用户名"></d-input>
                        <d-input name="email" placeholder="email"></d-input>
                        <d-input type="password" name="password1" placeholder="密码"></d-input>
                        <d-input type="password" name="password2" placeholder="再次输入密码"></d-input>
                    </div>
                    <div class="box-footer">
                        <button type="button" class="btn btn-default pull-right">取消</button>
                        <button type="button" @click="submit" class="btn btn-info pull-right">提交</button>
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
        watch: {
            $route () {
                axios.get('/api/users/' + to.params.id + '/edit').then(function (response) {
                    let data = response.data;
                    store.commit('form_create', data);
                });
            }
        },
        methods: {
            submit: function () {
                axios.put('/api/users/' + router.history.current.params.id, store.state.form).then(function (response) {
                    console.log(response);
                });
            }
        }
    }

</script>
<style>
</style>
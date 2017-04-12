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
                        <button type="submit" class="btn btn-default pull-right">取消</button>
                        <button type="submit" class="btn btn-info pull-right">提交</button>
                    </div>
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
            return {}
        }
    }

</script>
<style>
</style>
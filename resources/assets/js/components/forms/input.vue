<template>
    <form class="form-horizontal">
        <div class="box-body">
            <div class="form-group">
                <label :for="id" class="col-sm-2 control-label">{{placeholder}}</label>
                <div class="col-sm-10">
                    <input :type="type" class="form-control"
                           :name="name" :id="id" :placeholder="placeholder" :value="value">
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        props: {
            'name': {
                type: String,
                default: 'name'
            },
            'type': {
                type: String,
                default: 'text'
            },
            'placeholder': {
                type: String,
                default: ''
            },
            'value': {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                id: mkid()
            }
        },
    }
</script>

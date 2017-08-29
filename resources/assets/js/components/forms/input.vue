<template>
    <div class="form-group">
        <label :for="id" class="col-sm-2 control-label">{{label}}</label>
        <div class="col-sm-10">
            <input type="password" v-if="type=='password'" class="form-control"
                   :name="name" :id="id" :label="label" :value="value" v-model="value">
            <input v-else class="form-control" :name="name" :id="id" :placeholder="label" :value="value"
                   v-model="value">
        </div>
    </div>
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
            'label': {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                id: mkid()
            }
        },
        computed: {
            value: {
                get () {
                    if (typeof store.state.form === 'undefined') {
                        return '';
                    }
                    switch (typeof store.state.form[this.name]) {
                        case 'undefined':
                        case 'object':
                        case 'function':
                            return '';
                        default:
                            return String(store.state.form[this.name]);
                    }
                },
                set (value) {
                    store.commit('form_change', {name: this.name, value: value})
                }
            }
        }
    }
</script>

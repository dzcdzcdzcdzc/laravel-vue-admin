<template>
    <form class="form-horizontal">
        <div class="box-body">
            <div class="form-group">
                <label :for="id" class="col-sm-2 control-label">{{placeholder}}</label>
                <div class="col-sm-10">
                    <input type="password" v-if="type=='password'" class="form-control"
                           :name="name" :id="id" :placeholder="placeholder" :value="value" v-model="value">
                    <input type="text" v-else class="form-control"
                           :name="name" :id="id" :placeholder="placeholder" :value="value" v-model="value">
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
        },
        data() {
            return {
                id: mkid()
            }
        },
        computed: {
            value: {
                get() {
                    if (!store.state.form || !store.state.form[this.name]) {
                        return '';
                    }
                    return String(store.state.form[this.name]);
                },
                set(value) {
                    store.commit('form_change', {name: this.name, value: value})
                }
            }
        }
    }
</script>

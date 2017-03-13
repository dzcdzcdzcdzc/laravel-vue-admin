<template>
    <section class="content-header">
        <h1>{{title}}<small>{{description}}</small>
        </h1>
        <ol class="breadcrumb">
            <li v-for="item in breadcrumb" :class="{active:item.last}">
                <a v-if="!item.last && item.url" :href="item.url">
                    <i v-if="item.first" class="fa fa-dashboard">
                    </i>{{item.title}}</a>
                <template v-else>
                    <i v-if="item.first" class="fa fa-dashboard">
                    </i>{{item.title}}</template>
            </li>
        </ol>
    </section>
</template>

<script>
    export default {
        computed:{
            title(){
                return store.state.breadcrumb.title
            },
            description(){
                return store.state.breadcrumb.description
            },
            breadcrumb(){
                return store.state.breadcrumb.breadcrumb
            }
        }
    }
</script>

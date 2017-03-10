<template>
    <ul class="sidebar-menu">
        <template v-if="menu" v-for="header in menu">
            <li class="header"><i class="fa" :class="header.icons"></i>{{header.display_name}}</li>
            <template v-if="header.children" v-for="treeview in header.children">
                <li class="treeview">
                    <a :href="treeview.path">
                    <i class="fa" :class="treeview.icons"></i><span>{{treeview.display_name}}</span>
                    <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                    </a>
                    <sidebar_menu_treeview v-if="treeview.children" :treeview="treeview.children"></sidebar_menu_treeview>
                </li>
            </template>
        </template>
    </ul>
</template>

<script>
    export default {
        computed:{
            menu(){
                return store.state.sidebar.menu
            }
        }
    }

</script>

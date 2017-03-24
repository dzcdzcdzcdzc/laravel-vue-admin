<template>
    <ul class="sidebar-menu">
        <template v-for="header in menu">
            <li class="header"><i class="fa" :class="header.icons"></i>{{header.display_name}}</li>
            <template v-for="treeview in header.children">
                <li class="treeview">
                    <a :href="treeview.path">
                    <i class="fa" :class="treeview.icons"></i><span>{{treeview.display_name}}</span>
                    <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                    </a>
                    <d-sidebar_menu_treeview v-if="Object.keys(treeview.children).length" :treeview="treeview.children"></d-sidebar_menu_treeview>
                </li>
            </template>
        </template>
    </ul>
</template>

<script>
    export default {
        computed:{
            menu(){
                return store.state.frame.sidebar_menu;
            }
        }
    }

</script>

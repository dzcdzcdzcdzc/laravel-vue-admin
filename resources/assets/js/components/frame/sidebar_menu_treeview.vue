<template>
    <ul class="treeview-menu" style="display: none;">
        <template v-for="menu in treeview">
        <li><a :href="menu.path"><i class="fa" :class="menu.icons">
        </i>{{menu.display_name}}<span v-if="Object.keys(menu.children).length" class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i></span>
        </a>
            <sidebar_menu_treeview v-if="Object.keys(menu.children).length" :treeview="treeview.children"></sidebar_menu_treeview>
        </li>
        </template>
    </ul>
</template>

<script>
    export default {
        name: 'sidebar_menu_treeview',
        props: ['treeview']
    }

</script>

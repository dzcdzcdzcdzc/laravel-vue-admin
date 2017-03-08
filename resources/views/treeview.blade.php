<ul class="treeview-menu">
    @foreach($treeview as $menu)
        <router-link to="{{$menu['route']}}" tag="li"><a><i class="fa {{$menu['icons']}}"></i>{{$menu['display_name']}}
                @if(isset($menu['children']))
                    <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                @endif
            </a>
            @if(isset($menu['children']))
                @include('treeview', ['treeview'=>$menu['children']])
            @endif
        </router-link>
    @endforeach
</ul>
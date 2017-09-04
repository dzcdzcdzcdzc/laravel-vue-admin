<?php

namespace App\Http\Controllers;

use App\Model\Icons;
use Illuminate\Http\Request;

class DictController extends Controller
{
    public function icons(Request $request)
    {
        $info = Icons::select('id')->selectSub('icon', 'text');
        if ($q = $request->input('q')) {
            $info = $info->where('icon', 'like', '%' . $q . '%');
        }
        $page = $request->input('page', 1);
        $items = $info->offset(($page - 1) * 50)->limit(50)->get()->toArray();
        $total_count = Icons::count();
        return response()->json(['items' => $items, 'page' => $page, 'total_count' => $total_count]);
    }
}

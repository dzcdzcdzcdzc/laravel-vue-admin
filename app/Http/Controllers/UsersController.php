<?php

namespace App\Http\Controllers;

use App\Model\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $dt['draw'] = intval($request->input('draw')) or abort(403);
        $columns = $request->get('columns');
        $order = $request->get('order');
        $start = $request->input('start', 0);
        $length = $request->input('length', 10);
        $search = $request->input('search.value');
        $dt['recordsTotal'] = User::count();
        $list = User::select(['id', 'name', 'email', 'created_at']);
        if ($search) {
            $list->where('name', 'LIKE', "%" . $search . "%");
        }
        $dt['recordsFiltered'] = $list->count();
        $dt['data'] = $list->skip($start)->take($length)->orderBy($columns[$order[0]['column']]['data'], $order[0]['dir'])->get();
        $dt['draw'] = intval($request->input('draw', 0));
        // $dt['error']='暂时没有数据';
        return response()->json($dt);
    }
}

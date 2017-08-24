<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Store;
use Illuminate\Http\Request;
use App\Model\Permission;

class PermissionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $dt['draw'] = intval($request->input('draw')) or abort(403);
        $columns = $request->get('columns');
        $order = $request->get('order');
        $start = $request->input('start', 0);
        $length = $request->input('length', 10);
        $search = $request->input('search.value');
        $dt['recordsTotal'] = Permission::count();
        $list = Permission::select('id', 'name', 'menu', 'display_name', 'description', 'path', 'icons', 'exact');
        if ($search) {
            $list->where('name', 'LIKE', "%" . $search . "%");
        }
        $dt['recordsFiltered'] = $list->count();
        $dt['data'] = $list->skip($start)->take($length)->orderBy($columns[$order[0]['column']]['data'], $order[0]['dir'])->get();
        return response()->json($dt);
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     * @internal param Create $request
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Store $request)
    {
        $info = new Permission();
        $info->name = $request->input('name');
        $info->menu = $request->input('menu');
        $info->display_name = $request->input('display_name');
        $info->description = $request->input('description');
        $info->path = $request->input('path');
        $info->icons = $request->input('icons');
        $info->exact = $request->input('exact');
        if ($info->save()) {
            return response()->json(['error' => 0, 'msg' => '修改成功']);
        }
        return response()->json(['error' => 1, 'msg' => '修改失败']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Permission::select('name', 'menu', 'display_name', 'description', 'path', 'icons', 'exact')->findOrfail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     * @internal param User|int $info
     */
    public function update(Request $request, $id)
    {
        $info = Permission::findOrfail($id);
        $info->name = $request->input('name');
        $info->menu = $request->input('menu');
        $info->display_name = $request->input('display_name');
        $info->description = $request->input('description');
        $info->path = $request->input('path');
        $info->icons = $request->input('icons');
        $info->exact = $request->input('exact');
        if ($info->save()) {
            return response()->json(['error' => 0, 'msg' => '修改成功']);
        }
        return response()->json(['error' => 1, 'msg' => '修改失败']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Permission::destroy($id)) {
            return response()->json(['error' => 0, 'msg' => '删除成功']);
        };
        return response()->json(['error' => 1, 'msg' => '没有数据被删除']);
    }
}

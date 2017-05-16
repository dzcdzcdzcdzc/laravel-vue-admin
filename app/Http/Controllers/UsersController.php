<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
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
        $dt['recordsTotal'] = User::count();
        $list = User::select(['id', 'name', 'email', 'created_at']);
        if ($search) {
            $list->where('name', 'LIKE', "%" . $search . "%");
        }
        $dt['recordsFiltered'] = $list->count();
        $dt['data'] = $list->skip($start)->take($length)->orderBy($columns[$order[0]['column']]['data'], $order[0]['dir'])->get();
        return response()->json($dt);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
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
    public function store(Request $request)
    {
        //
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
        return User::select('name', 'email')->findOrfail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        dd($user);
        $user->name = $request->input('name');
        $user->email = $request->input('name');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (User::destroy($id)) {
            return response()->json(['error' => 0, 'msg' => '删除成功']);
        };
        return response()->json(['error' => 0, 'msg' => '没有数据被删除']);
    }
}

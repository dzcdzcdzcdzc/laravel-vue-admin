<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Store;
use Illuminate\Http\Request;
use App\Model\User;

class UsersController extends Controller
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
        $dt['recordsTotal'] = User::count();
        $list = User::select('id', 'name', 'email', 'created_at');
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
        $info = new User();
        $info->name = $request->input('name');
        $info->email = $request->input('email');
        $password1 = $request->input('password1');
        $password2 = $request->input('password2');
        if ($password1 == $password2) {
            $info->password = bcrypt($password1);
        } else {
            return response()->json(['error' => 1, 'msg' => '两次密码不相等']);
        }
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
        return User::select('name', 'email')->findOrfail($id);
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
        $info = User::findOrfail($id);
        $info->name = $request->input('name');
        $info->email = $request->input('email');
        $password1 = $request->input('password1');
        $password2 = $request->input('password2');
        if ($password1 && $password2) {
            if ($password1 == $password2) {
                $info->password = bcrypt($password1);
            } else {
                return response()->json(['error' => 1, 'msg' => '两次密码不相等']);
            }
        }
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
        if (User::destroy($id)) {
            return response()->json(['error' => 0, 'msg' => '删除成功']);
        };
        return response()->json(['error' => 1, 'msg' => '没有数据被删除']);
    }
}

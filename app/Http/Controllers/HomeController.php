<?php

namespace App\Http\Controllers;

use App\Model\Permission;
use App\Libraries\Helper;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['permission'] = Helper::getPermissionArray();
        return view('app', $data);
    }
}

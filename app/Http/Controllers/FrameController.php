<?php

namespace App\Http\Controllers;

use App\Model\Permission;

class FrameController extends Controller
{
    /**
     * 获得permission多维数组
     *
     * @return \Illuminate\Http\JsonResponse
     */
    static function getPermission()
    {
        return Permission::select("name", "menu", "display_name", "description", "path", "icons", "exact")->get()->toJson();
    }
}

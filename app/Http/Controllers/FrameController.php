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
    static function getPermissionArray()
    {
        return Permission::select("menu", "display_name", "path", "icons")
            ->where('icons', '!=', '')->get()->toJson();
    }
}

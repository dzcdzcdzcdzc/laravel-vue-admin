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
        $collection = Permission::select("menu", "display_name", "path", "icons")
            ->Where('icons', '!=', '')->get();
        if (empty($collection)) return response()->json([]);
        $collection->each(function ($item) use (&$array) {
            $p = &$array;
            foreach (explode("-", $item->menu) as $v) {
                if (!isset($p[$v])) {
                    $p[$v] = $item->toArray();
                }
                $p = &$p[$v]['children'];
            }
        });
        return response()->json($array);
    }
}

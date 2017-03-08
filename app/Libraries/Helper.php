<?php

namespace App\Libraries;

class Helper
{
    /**
     * 获得permission多维数组
     * @return array
     */
    static function getPermissionArray()
    {
        $collection = \App\Model\Permission::select("menu", "display_name", "route", "icons")
            ->Where('icons', '!=', '')->get();
        if (empty($collection)) return [];
        $collection->each(function ($item) use (&$array) {
            $p = &$array;
            foreach (explode("-", $item->menu) as $v) {
                if (!isset($p[$v])) {
                    $p[$v] = $item->toArray();
                }
                $p = &$p[$v]['children'];
            }
        });
        return $array;
    }
}
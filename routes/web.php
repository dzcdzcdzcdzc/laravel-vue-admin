<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::group(['prefix' => 'api'], function () {
    Route::get('path', 'FrameController@getPermission');

    //用户管理
    Route::get('roles', 'RolesController@index');
    Route::post('roles', 'RolesController@store');
    Route::get('roles/{id}/edit', 'RolesController@edit');
    Route::put('roles/{id}', 'RolesController@update');
    Route::delete('roles/{id}', 'RolesController@destroy');

    Route::get('users', 'UsersController@index');
    Route::post('users', 'UsersController@store');
    Route::get('users/{id}/edit', 'UsersController@edit');
    Route::put('users/{id}', 'UsersController@update');
    Route::delete('users/{id}', 'UsersController@destroy');

    Route::get('permissions', 'PermissionsController@index');
    Route::post('permissions', 'PermissionsController@store');
    Route::get('permissions/{id}/edit', 'PermissionsController@edit');
    Route::put('permissions/{id}', 'PermissionsController@update');
    Route::delete('permissions/{id}', 'PermissionsController@destroy');
});

Route::group(['prefix'=>'dict'], function (){
    Route::get('icons', 'DictController@icons');
});

Route::get('/{a?}/{b?}/{c?}/{d?}/{e?}', 'HomeController@index');

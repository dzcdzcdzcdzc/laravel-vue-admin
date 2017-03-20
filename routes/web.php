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
    Route::get('/path', 'FrameController@getPermission');

    //用户管理
    Route::get('/users', 'UsersController@index');
});

Route::get('/{a?}/{b?}/{c?}/{d?}/{e?}', 'HomeController@index');

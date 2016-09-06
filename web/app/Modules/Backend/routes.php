<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\App;

Route::group(['prefix' => 'admin', 'middleware' => ['web'], 'module' => 'Backend', 'namespace' => 'App\Modules\Backend\Controllers'], function () {
        Route::get('/demo', function () {
            return view('demo', ['content'=> PHP_EOL.\Illuminate\Foundation\Inspiring::quote().PHP_EOL]);
        });
        Route::get('/home-demo', ['uses' => 'Home@demo', 'as'=>'home_demo']);
});

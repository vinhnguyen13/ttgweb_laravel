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

Route::group(['middleware' => ['web'], 'module' => 'Frontend', 'namespace' => 'App\Modules\Frontend\Controllers'], function () {
        Route::get('/admin', function () {
            return view('welcome', ['content'=> PHP_EOL.\Illuminate\Foundation\Inspiring::quote().PHP_EOL]);
        });

});


Route::get('/generate/models', ['uses' => '\\Jimbolino\\Laravel\\ModelBuilder\\ModelGenerator5@start', 'namespace' => 'Jimbolino\Laravel\ModelBuilder']);
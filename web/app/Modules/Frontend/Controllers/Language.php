<?php
/**
 * Created by PhpStorm.
 * User: vinhnguyen
 * Date: 4/19/2016
 * Time: 11:27 AM
 */
namespace App\Modules\Frontend\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class Language extends Controller
{
    public function choose(Request $request, $locale=nul)
    {
        Session::set('locale', $locale);
        return Redirect::to('/'.$locale);
    }

    public function choose2()
    {
        return view('welcome', ['content'=> PHP_EOL.\Illuminate\Foundation\Inspiring::quote().PHP_EOL]);
    }

}
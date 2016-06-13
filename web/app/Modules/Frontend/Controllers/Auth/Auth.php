<?php

namespace App\Modules\Frontend\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Modules\Frontend\Models\User;

class Auth extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware($this->guestMiddleware(), ['except' => 'logout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    public function login(Request $request)
    {
        if (\Auth::guard('web')->check()) {
            return Redirect::back();
        }else{
            if($request->isMethod('post')) {
                $email = Input::get('email');
                $password = Input::get('password');
                /* login not pass
                $user = User::query()->where('email', $email)->firstOrFail();
                $chk = \Auth::guard('web')->login($user);
                */
                if (\Auth::attempt(['email' => $email, 'password' => $password])) {
                    return redirect()->intended('/');
                }
//            $chk = Auth::loginUsingId(1);;
//            Auth::guard('web')->user()
                return Redirect::to(route('home_index'));
            }
            return view('auth\login');
        }
    }

    public function logout(Request $request)
    {
        if (\Auth::guard('web')->check()) {
            \Auth::guard('web')->logout();
        }
        return Redirect::back();
    }

    public function register(Request $request)
    {
        if($request->isMethod('post')) {
            $user = User::query()->findOrFail(12);
            \Mail::send('emails.reminder', ['user' => $user, 'token' => 'XXXXXXX'], function ($m) use ($user) {
                $m->from('example@gmail.com', 'Your Application');
                $m->to($user->email, $user->name)->subject('Your Reminder!');
            });
            return Redirect::to('/');
        }
        return view('auth\register');
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(LoginRequest $request)
    {
        $credential = $request->only(['username', 'password']);
        $remember = $request->has('remember_me');

        if (Auth::attempt($credential, $remember)) {
            return response()->json([
                'status' => 'login success',
                'url' => route('home'),
            ]);
        }

        return response()->json([
            'status' => 'login fail',
            'errors' => [
                'username' => trans('messages.wrong_credential'),
                'password' => trans('messages.wrong_credential'),
            ],
        ]);
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('home');
    }
}

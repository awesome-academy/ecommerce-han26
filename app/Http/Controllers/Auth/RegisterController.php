<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function showRegisterForm()
    {
        return view('auth.register');
    }

    public function register(RegisterRequest $request, User $user)
    {
        $user->fill($request->all());
        $user['password'] = Hash::make($user['password']);
        $user['role'] = config('constants.user_role_id');
        $user->save();

        Auth::login($user);

        return response()->json([
            'status' => 'register success',
            'url' => session('url.intended', route('home')),
        ]);
    }
}

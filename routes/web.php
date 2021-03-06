<?php

use Illuminate\Support\Facades\Route;

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

Route::middleware('locale')->group(function () {
    Route::get('/language/{language}', 'LanguageController@changeLanguage')->name('language');

    Route::get('/', 'HomeController@index')->name('home');
    Route::get('/user', 'UserController@index');
    Route::prefix('/product')->group(function () {
        Route::get('/list', 'ProductController@list')->name('shop');
        Route::get('/detail', 'ProductController@detail');
    });

    Route::prefix('/user')->group(function () {
        Route::get('/', 'UserController@index');
        Route::get('/login', 'Auth\LoginController@showLoginForm');
        Route::post('/login', 'Auth\LoginController@login')->name('login');
        Route::get('/register', 'Auth\RegisterController@showRegisterForm');
        Route::post('/register', 'Auth\RegisterController@register')->name('register');
        Route::get('/logout', 'Auth\LoginController@logout')->name('logout');
    });
});

Route::middleware('auth')->group(function () {
    Route::prefix('/product')->group(function () {
        Route::get('/rate/{id}', 'ProductController@rateProduct');
        Route::get('/rated', 'ProductController@getLikedProducts');
    });
});

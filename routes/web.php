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

Route::group(['middleware' => 'locale'], function () {
    Route::get('/language/{language}', 'LanguageController@changeLanguage')->name('language');

    Route::get('/', 'HomeController@index')->name('home');
    Route::get('user', 'UserController@index');
    Route::prefix('product')->group(function () {
        Route::get('list', 'ProductController@list');
        Route::get('detail', 'ProductController@detail');
    });
});

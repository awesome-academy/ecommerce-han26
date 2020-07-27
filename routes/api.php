<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/products', 'ProductController@getAllProducts');
Route::get('/product/{id}', 'ProductController@getProduct');
Route::get('/categories', 'ProductController@getAllCategories');
Route::get('/ratings', 'ProductController@getLikedQuantity');
Route::prefix('/cart')->group(function () {
    Route::post('/add', 'ProductController@addProductToCart');
    Route::get('/remove/{id}', 'ProductController@removeProductFromCart');
    Route::get('/get', 'ProductController@getCart');
});

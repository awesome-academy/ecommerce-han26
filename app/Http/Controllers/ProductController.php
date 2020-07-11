<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function list()
    {
        return view('product_list');
    }

    public function getAllProducts()
    {
        return Product::with('productDetails')->get();
    }

    public function detail()
    {
        return view('product_detail');
    }
}
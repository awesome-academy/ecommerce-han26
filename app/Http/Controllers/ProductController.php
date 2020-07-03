<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function list()
    {
        return view('product_list');
    }

    public function detail()
    {
        return view('product_detail');
    }
}

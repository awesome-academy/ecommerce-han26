<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
        return Product::with(['productDetails', 'categories:categories.id'])->get();
    }

    public function detail(Request $request)
    {
        if ($productId = $request->query('id')) {
            Product::findOrFail($productId);
        } else {
            abort(404);
        }
        return view('product_detail');
    }

    public function getProduct($id)
    {
        return Product::with('productDetails')->find($id);
    }

    public function getAllCategories()
    {
        return Category::with('categories')->where('level', config('constants.higher_category_level'))->get();
    }
}

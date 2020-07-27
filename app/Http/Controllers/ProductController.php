<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;

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
        if (
            !($productId = $request->query('id'))
            || !(Product::where('id', $productId)->exists())
        ) {
            abort(404);
        }

        return view('product_detail');
    }

    public function getProduct($id)
    {
        return Product::with('productDetails')->findOrFail($id);
    }

    public function getAllCategories()
    {
        return Category::with('categories')->where('level', config('constants.higher_category_level'))->get();
    }

    public function rateProduct($id)
    {
        if (Product::where('id', $id)->exists()) {
            $comment = Comment::firstOrNew(
                ['user_id' => Auth::id(), 'product_id' => $id],
                ['content' => '', 'rating_level' => config('constants.dislike_rating')]
            );
            $comment->rating_level = $comment->rating_level
                ? config('constants.dislike_rating')
                : config('constants.like_rating');
            $comment->save();
        } else {
            abort(404);
        }

        return $comment;
    }

    public function getLikedProducts()
    {
        return Comment::where('user_id', Auth::id())
            ->where('rating_level', config('constants.like_rating'))
            ->pluck('product_id')
            ->unique()
            ->all();
    }

    public function getLikedQuantity()
    {
        return DB::table('comments')
            ->select('product_id', DB::raw('COUNT(*) AS rating_total'))
            ->where('rating_level', config('constants.like_rating'))
            ->groupBy('product_id')
            ->get();
    }

    public function isLikedProduct($id)
    {
        if (Product::where('id', $id)->exists()) {
            return Comment::where('product_id', $id)
                ->where('user_id', Auth::id())
                ->first();
        } else {
            abort(404);
        }
    }

    public function addProductToCart(Request $request)
    {
        $productDetail = ProductDetail::with('product')->findOrFail($request->id)->toArray();
        $serializedCart = $request->cookie('cart');

        if (isset($serializedCart)) {
            $cart = json_decode($serializedCart, true);
        } else {
            $cart = [];
        }

        $isInserted = false;

        $cart = array_map(function ($cartItem) use ($productDetail, &$isInserted, $request) {
            if ($cartItem['id'] === $productDetail['id']) {
                $cartItem['quantity'] += $request->quantity;
                $isInserted = true;
            }

            return $cartItem;
        }, $cart);

        if (!$isInserted) {
            $productDetail['quantity'] = $request->quantity;
            array_push($cart, $productDetail);
        }

        return response($cart)
            ->cookie('cart', json_encode($cart, JSON_FORCE_OBJECT), config('constants.five_years_in_minutes'));
    }

    public function removeProductFromCart(Request $request, $id)
    {
        $productDetail = ProductDetail::findOrFail($id)->toArray();
        $serializedCart = $request->cookie('cart');
        if (isset($serializedCart)) {
            $cart = json_decode($serializedCart, true);
        } else {
            $cart = [];
        }

        $cart = array_reduce($cart, function ($newCart, $cartItem) use ($productDetail) {
            if ($cartItem['id'] === $productDetail['id']) {
                if ($cartItem['quantity'] > 1) {
                    $cartItem['quantity']--;
                    array_push($newCart, $cartItem);

                    return $newCart;
                }

                return $newCart;
            }
            array_push($newCart, $cartItem);

            return $newCart;
        }, []);

        return response($cart)
            ->cookie('cart', json_encode($cart, JSON_FORCE_OBJECT), config('constants.five_years_in_minutes'));
    }

    public function getCart(Request $request)
    {
        $serializedCart = $request->cookie('cart');
        if (isset($serializedCart)) {
            $cart = json_decode($serializedCart, true);
        } else {
            $cart = [];
        }

        return response($cart);
    }
}

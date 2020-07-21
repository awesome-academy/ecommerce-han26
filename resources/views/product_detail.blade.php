@extends('layouts.app')
@section('content')
<section class="single_product_details_area d-flex align-items-center">
    <div class="single_product_thumb clearfix">
        <div class="product_thumbnail_slides owl-carousel">
            <img src="{{ asset(config('constants.temp_product_imgs_dir') . 'product-big-1.jpg') }}" alt="">
            <img src="{{ asset(config('constants.temp_product_imgs_dir') . 'product-big-2.jpg') }}" alt="">
            <img src="{{ asset(config('constants.temp_product_imgs_dir') . 'product-big-3.jpg') }}" alt="">
        </div>
    </div>
    <div class="single_product_desc clearfix">
        <span id="brandName"></span>
        <a href="#">
            <h2 id="productName"></h2>
        </a>
        <p class="product-price" id="productPrice"></p>
        <p class="product-desc" id="productDesc"></p>
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-secondary" role="status" id="spinner"></div>
        </div>
        <form class="cart-form clearfix" method="post">
            <div class="select-box d-flex mt-50 mb-30">
                <select name="select" class="mr-5"></select>
                <select name="select"></select>
            </div>
            <div class="cart-fav-box d-flex align-items-center">
                <button class="btn essence-btn" id="addToCartBtn">{{ trans('product.add_to_cart') }}</button>
                <input type="number" class="product-quantity form-control ml-3 pr-0" value="0" min="0" id="cartQuantity">
                <div class="product-favourite ml-4">
                    <a href="#" class="favme fa fa-heart" id="favoriteBtn"></a>
                </div>
            </div>
        </form>
    </div>
</section>
@endsection
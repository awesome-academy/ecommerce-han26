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
        <span><!-- Brand name --></span>
        <a href="#">
            <h2><!-- Product name --></h2>
        </a>
        <p class="product-price"><span class="old-price"><!-- Old price --></span>  </p> <!-- Price --><p class="product-desc"><!-- Description --></p>

        <!-- Form -->
        <form class="cart-form clearfix" method="post">
            <!-- Select Box -->
            <div class="select-box d-flex mt-50 mb-30">
                <select name="select" id="productSize" class="mr-5">
                    <option value="value">{{ trans('product.size') }}<!-- Size --></option>
                </select>
                <select name="select" id="productColor">
                    <option value="value">{{ trans('product.color') }}<!-- Color --></option>
                </select>
            </div>
            <div class="cart-fav-box d-flex align-items-center">
                <button type="submit" name="addtocart" value="5" class="btn essence-btn">{{ trans('product.add_to_cart') }}</button>
                <div class="product-favourite ml-4">
                    <a href="#" class="favme fa fa-heart"></a>
                </div>
            </div>
        </form>
    </div>
</section>
@endsection

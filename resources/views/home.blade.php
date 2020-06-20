@extends('layouts.app')
@section('content')
    <section class="welcome_area bg-img background-overlay bg-img-1">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="hero-content">
                        <h6><!-- Brand name --></h6>
                        <h2><!-- Advertising Sentence --></h2>
                        <a href="#" class="btn essence-btn">{{ trans('home.banner_button_title') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="top_catagory_area section-padding-80 clearfix">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="single_catagory_area d-flex align-items-center justify-content-center bg-img bg-img-2">
                        <div class="catagory-content">
                            <a href="#"><!-- Category --></a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="single_catagory_area d-flex align-items-center justify-content-center bg-img bg-img-3">
                        <div class="catagory-content">
                            <a href="#"><!-- Category --></a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="single_catagory_area d-flex align-items-center justify-content-center bg-img bg-img-4">
                        <div class="catagory-content">
                            <a href="#"><!-- Category --></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="cta-area">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="cta-content bg-img background-overlay bg-img-5">
                        <div class="h-100 d-flex align-items-center justify-content-end">
                            <div class="cta--text">
                                <h6><!-- sale percents --></h6>
                                <h2>{{ trans('home.sale_title') }}</h2>
                                <a href="#" class="btn essence-btn">{{ trans('home.sale_button_title') }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="new_arrivals_area section-padding-80 clearfix">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-heading text-center">
                        <h2>{{ trans('home.popular_title') }}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="popular-products-slides owl-carousel">
                        <div class="single-product-wrapper">
                            <div class="product-img">
                                <img src="{{ asset('img/product-img/product-3.jpg') }}" alt="">
                                <!-- Hover Thumb -->
                                <img class="hover-img" src="{{ asset('img/product-img/product-4.jpg') }}" alt="">
                                <div class="product-badge new-badge">
                                    <span>{{ trans('home.new_product') }}</span>
                                </div>
                                <div class="product-badge offer-badge">
                                    <span><!-- sale percents --></span>
                                </div>
                                <div class="product-favourite">
                                    <a href="#" class="favme fa fa-heart"></a>
                                </div>
                            </div>
                            <div class="product-description">
                                <span><!-- Brand name --></span>
                                <a href="#">
                                    <h6><!-- Product name --></h6>
                                </a>
                                <p class="product-price"><span class="old-price"><!-- Old price --></span> <!-- Price --></p>
                                <div class="hover-content">
                                    <div class="add-to-cart-btn">
                                        <a href="#" class="btn essence-btn">{{ trans('home.add_to_card_button_title') }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="brands-area d-flex align-items-center justify-content-between">
        <div class="single-brands-logo">
            <img src="{{ asset(config('constants.fixed_imgs_dir') . 'brand1.png') }}" alt="">
        </div>
        <div class="single-brands-logo">
            <img src="{{ asset(config('constants.fixed_imgs_dir') . 'brand2.png') }}" alt="">
        </div>
        <div class="single-brands-logo">
            <img src="{{ asset(config('constants.fixed_imgs_dir') . 'brand3.png') }}" alt="">
        </div>
        <div class="single-brands-logo">
            <img src="{{ asset(config('constants.fixed_imgs_dir') . 'brand4.png') }}" alt="">
        </div>
        <div class="single-brands-logo">
            <img src="{{ asset(config('constants.fixed_imgs_dir') . 'brand5.png') }}" alt="">
        </div>
        <div class="single-brands-logo">
            <img src="{{ asset(config('constants.fixed_imgs_dir') . 'brand6.png') }}" alt="">
        </div>
    </div>
@endsection

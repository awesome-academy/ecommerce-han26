@extends('layouts.app')
@section('content')
<div class="breadcumb_area bg-img bg-img-breadcumb">
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <div class="page-title text-center">
                    <h2>{{ trans('product.page_header') }}</h2>
                </div>
            </div>
        </div>
    </div>
</div>
<section class="shop_grid_area section-padding-80">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-4 col-lg-3">
                <div class="shop_sidebar_area">
                    <div class="widget catagory mb-50">
                        <h6 class="widget-title mb-30">{{ trans('product.slide_header') }}</h6>
                        <div class="catagories-menu">
                            <ul id="menu-content2" class="menu-content collapse show">
                                <li data-toggle="collapse" data-target="#clothing">
                                    <a href="#"><!-- Category level 1 --></a>
                                    <ul class="sub-menu collapse show" id="clothing">
                                        <!-- 'show' class make submenu collapse -->
                                        <li><a href="#"><!-- Category level 2 --></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="widget price mb-50">
                        <h6 class="widget-title mb-30">{{ trans('product.filter_title') }}</h6>
                        <p class="widget-title2 mb-30">{{ trans('product.price_slider_title') }}</p>
                        <div class="widget-desc">
                            <div class="slider-range">
                                <div data-min="49" data-max="360" data-unit="$" class="slider-range-price ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" data-value-min="49" data-value-max="360" data-label-result="{{ trans('product.range_slider') }}">
                                    <div class="ui-slider-range ui-widget-header ui-corner-all"></div>
                                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
                                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
                                </div>
                                <div class="range-price">{{ trans('product.range_slider') }}<!-- $price - $price --></div>
                            </div>
                        </div>
                    </div>
                    <div class="widget color mb-50">
                        <p class="widget-title2 mb-30">{{ trans('product.color_picker') }}</p>
                        <div class="widget-desc">
                            <ul class="d-flex">
                                <li><a href="#" class="color1"></a></li>
                                <li><a href="#" class="color2"></a></li>
                                <li><a href="#" class="color3"></a></li>
                                <li><a href="#" class="color4"></a></li>
                                <li><a href="#" class="color5"></a></li>
                                <li><a href="#" class="color6"></a></li>
                                <li><a href="#" class="color7"></a></li>
                                <li><a href="#" class="color8"></a></li>
                                <li><a href="#" class="color9"></a></li>
                                <li><a href="#" class="color10"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="widget brands mb-50">
                        <p class="widget-title2 mb-30">{{ trans('product.brand') }}</p>
                        <div class="widget-desc">
                            <ul>
                                <li><a href="#"><!-- Brand name --></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-8 col-lg-9">
                <div class="shop_grid_product_area">
                    <div class="row">
                        <div class="col-12">
                            <div class="product-topbar d-flex align-items-center justify-content-between">
                                <div class="total-products">
                                    <p><span></span> {{ trans('product.products_found') }}</p>
                                </div>
                                <div class="product-sorting d-flex">
                                    <p>{{ trans('product.sort_by') }}</p>
                                    <form action="#" method="get">
                                        <select name="select" id="sortByselect">
                                            <option value="value">{{ trans('product.highest_rated') }}</option>
                                            <option value="value">{{ trans('product.newest') }}</option>
                                            <option value="value">{{ trans('product.high_to_low') }}</option>
                                            <option value="value">{{ trans('product.low_to_high') }}</option>
                                        </select>
                                        <input type="submit" class="d-none" value="">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="productList" class="row"></div>
                </div>
                <nav aria-label="navigation">
                    <ul class="pagination mt-50 mb-70">
                        <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-left"></i></a></li>
                        <li class="page-item"><a class="page-link" href="#"><!-- 1 --></a></li>
                        <li class="page-item"><a class="page-link" href="#"><!-- 2 --></a></li>
                        <li class="page-item"><a class="page-link" href="#"><!-- 3 --></a></li>
                        <li class="page-item"><a class="page-link" href="#"><!-- ... --></a></li>
                        <li class="page-item"><a class="page-link" href="#"><!-- 21 --></a></li>
                        <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</section>
@endsection

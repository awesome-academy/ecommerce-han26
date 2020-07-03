<div class="cart-bg-overlay"></div>
<div class="right-side-cart-area">
    <div class="cart-button">
        <a href="#" id="rightSideCart"><img src="{{ asset(config('constants.fixed_imgs_dir') . 'bag.svg') }}" alt=""> <span><!-- Number of product types --></span></a>
    </div>
    <div class="cart-content d-flex">
        <div class="cart-list">
            <div class="single-cart-item">
                <a href="#" class="product-image">
                    <img src="{{ asset(config('constants.temp_product_imgs_dir') . 'product-1.jpg') }}" class="cart-thumb" alt="">
                    <div class="cart-item-desc">
                        <span class="product-remove"><i class="fa fa-close" aria-hidden="true"></i></span>
                        <span class="badge"><!-- Brand name --></span>
                        <h6><!-- Product name --></h6>
                        <p class="size">{{ trans('navigation.cart_size_title') }}<!-- Product size --></p>
                        <p class="color">{{ trans('navigation.cart_color_title') }}<!-- Product color --></p>
                        <p class="price"><!-- Price in $ --></p>
                    </div>
                </a>
            </div>
        </div>
        <div class="cart-amount-summary">
            <h2>{{ trans('navigation.cart_header') }}</h2>
            <ul class="summary-table">
                <li><span>{{ trans('navigation.cart_subtotal_title') }}</span> <span><!-- Price subtotal in $ --></span></li>
                <li><span>{{ trans('navigation.cart_delivery_title') }}</span> <span><!-- Delivery fee --></span></li>
                <li><span>{{ trans('navigation.cart_discount_title')}}</span> <span><!-- Discount --></span></li>
                <li><span>{{ trans('navigation.cart_total_title')}}</span> <span><!-- Price total in $ --></span></li>
            </ul>
            <div class="checkout-btn mt-100">
                <a href="#" class="btn essence-btn">{{ trans('navigation.cart_order_title') }}</a>
            </div>
        </div>
    </div>
</div>

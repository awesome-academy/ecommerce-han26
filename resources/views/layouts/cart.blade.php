<div class="cart-bg-overlay"></div>
<div class="right-side-cart-area">
    <div class="cart-button">
        <a href="#" id="rightSideCart"><img src="{{ asset(config('constants.fixed_imgs_dir') . 'bag.svg') }}" alt=""> <span id="cartLength2"></span></a>
    </div>
    <div class="cart-content d-flex">
        <div class="cart-list" id="cartList">
        </div>
        <div class="cart-amount-summary">
            <h2>{{ trans('navigation.cart_header') }}</h2>
            <ul class="summary-table">
                <li><span>{{ trans('navigation.cart_subtotal_title') }}</span> <span id="subTotal"><!-- Price subtotal in $ --></span></li>
                <li><span>{{ trans('navigation.cart_delivery_title') }}</span> <span id="deliFee"><!-- Delivery fee --></span></li>
                <li><span>{{ trans('navigation.cart_discount_title')}}</span> <span id="discount"><!-- Discount --></span></li>
                <li><span>{{ trans('navigation.cart_total_title')}}</span> <span id="totalPrice"><!-- Price total in $ --></span></li>
            </ul>
            <div class="checkout-btn mt-100">
                <a href="#" class="btn essence-btn">{{ trans('navigation.cart_order_title') }}</a>
            </div>
        </div>
    </div>
</div>

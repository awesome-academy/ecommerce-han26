<div class="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
    <nav class="classy-navbar" id="essenceNav">
        <a class="nav-brand" href="{{ route('home') }}"><img src="{{ asset(config('constants.fixed_imgs_dir') . 'logo.png') }}" alt=""></a>
        <div class="classy-navbar-toggler">
            <span class="navbarToggler"><span></span><span></span><span></span></span>
        </div>
        <div class="classy-menu">
            <div class="classycloseIcon">
                <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
            </div>
            <div class="classynav">
                <ul>
                    <li><a href="#">{{ trans('navigation.menu_1') }}</a>
                        <div class="megamenu">
                            <div class="single-mega cn-col-4">
                                <img src="{{ asset(config('constants.background_imgs_dir') . 'bg-6.jpg') }}" alt="">
                            </div>
                        </div>
                    </li>
                    <li><a href="#">{{ trans('navigation.menu_2') }}</a>
                        <ul class="dropdown">
                            <li><a href="{{ route('home') }}">{{ trans('navigation.menu_2_item_1') }}</a></li>
                            <li><a href="{{ route('shop') }}">{{ trans('navigation.menu_2_item_2') }}</a></li>
                            <li><a href="{{ route('login_view') }}">{{ trans('navigation.menu_2_item_3') }}</a></li>
                            <li><a href="{{ route('register_view') }}">{{ trans('navigation.menu_2_item_4') }}</a></li>
                            <li><a href="{{ route('logout') }}">{{ trans('navigation.menu_2_item_5') }}</a></li>
                        </ul>
                    </li>
                    <li><a href="#">{{ trans('navigation.menu_3') }}</a></li>
                    <li><a href="#">{{ trans('navigation.menu_4') }}</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="header-meta d-flex clearfix justify-content-end">
        <div class="language-area">
            @if (config('app.locale') === 'vi')
            <a href="{{ route('language', ['language' => 'en']) }}">
                <img src="{{ asset(config('constants.fixed_imgs_dir') . 'vn.svg') }}" alt="">
            </a>
            @else
            <a href="{{ route('language', ['language' => 'vi']) }}">
                <img src="{{ asset(config('constants.fixed_imgs_dir') . 'us.svg') }}" alt="">
            </a>
            @endif
        </div>
        <div class="favourite-area">
            <a href="#"><img src="{{ asset(config('constants.fixed_imgs_dir') . 'heart.svg') }}" alt=""></a>
        </div>
        <div class="user-login-info">
            <a href="#"><img src="{{ asset(config('constants.fixed_imgs_dir') . 'user.svg') }}" alt=""></a>
        </div>
        <div class="cart-area">
            <a href="#" id="essenceCartBtn"><img src="{{ asset(config('constants.fixed_imgs_dir') . 'bag.svg') }}" alt=""> <span id="cartLength1"></span></a>
        </div>
    </div>
</div>

@extends('layouts.app')
@section('content')
<div class="breadcumb_area bg-img bg-img-breadcumb">
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <div class="page-title text-center">
                    <h2>{{ trans('user.register') }}</h2>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="checkout_area section-padding-80">
    <div class="container">
        <div class="row  justify-content-center">
            <div class="col-12 col-md-6">
                <div class="checkout_details_area mt-50 clearfix">
                    <div class="cart-page-heading mb-30">
                        <h5>{{ trans('user.register') }}</h5>
                    </div>
                    <form action="#" method="post">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="username">{{ trans('user.username') }}</label>
                                <input type="text" class="form-control" id="username" value="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="password">{{ trans('user.password') }}</label>
                                <input type="password" class="form-control" id="password" value="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="confirmPassword">{{ trans('user.confirm_password') }}</label>
                                <input type="password" class="form-control" id="confirmPassword" value="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="address">{{ trans('user.address') }}</label>
                                <input type="text" class="form-control" id="address" value="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="phoneNumber">{{ trans('user.phone_number') }}</label>
                                <input type="text" class="form-control" id="phoneNumber" value="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="email">{{ trans('user.email') }}</label>
                                <input type="email" class="form-control" id="email" value="">
                            </div>
                            <div class="col-12 mb-4">
                                <div class="d-flex justify-content-end">
                                    <a href="#" id="submit" class="btn essence-btn">{{ trans('user.register') }}</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

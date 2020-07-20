@extends('layouts.app')
@section('content')
<div class="breadcumb_area bg-img bg-img-breadcumb">
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <div class="page-title text-center">
                    <h2>{{ trans('user.login') }}</h2>
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
                        <h5>{{ trans('user.login') }}</h5>
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
                            <div class="col-12">
                                <div class="custom-control custom-checkbox d-block mb-2">
                                    <input type="checkbox" class="custom-control-input" id="remember">
                                    <label class="custom-control-label" for="remember">{{ trans('user.remember_me') }}</label>
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="d-flex justify-content-end">
                                    <a href="#" id="submit" class="btn essence-btn">{{ trans('user.login') }}</a>
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

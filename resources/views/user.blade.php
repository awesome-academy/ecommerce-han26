@extends('layouts.app')
@section('content')
<div class="breadcumb_area bg-img bg-img-breadcumb">
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <div class="page-title text-center">
                    <h2>{{ trans('user.member') }}</h2>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="checkout_area section-padding-80">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="checkout_details_area mt-50 clearfix">
                    <div class="cart-page-heading mb-30">
                        <h5>{{ trans('user.billing_address') }}</h5>
                    </div>
                    <form action="#" method="post">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="first_name">{{ trans('user.first_name') }}<span>{{ trans('user.asterisk') }}</span></label>
                                <input type="text" class="form-control" id="first_name" value="" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="last_name">{{ trans('user.last_name') }} <span>{{ trans('user.asterisk') }}</span></label>
                                <input type="text" class="form-control" id="last_name" value="" required>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="company">{{ trans('user.company') }}</label>
                                <input type="text" class="form-control" id="company" value="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="country">{{ trans('user.country') }} <span>{{ trans('user.asterisk') }}</span></label>
                                <select class="w-100" id="country">
                                    <option value="us">{{ trans('user.country_1') }}</option>
                                    <option value="vn">{{ trans('user.country_2') }}</option>
                                </select>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="street_address">{{ trans('user.address') }} <span>{{ trans('user.asterisk') }}</span></label>
                                <input type="text" class="form-control" id="street_address2" value="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="phone_number">{{ trans('user.phone_number') }} <span>{{ trans('user.asterisk') }}</span></label>
                                <input type="number" class="form-control" id="phone_number" min="0" value="">
                            </div>
                            <div class="col-12 mb-4">
                                <label for="email_address">{{ trans('user.email') }} <span>{{ trans('user.asterisk') }}</span></label>
                                <input type="email" class="form-control" id="email_address" value="">
                            </div>
                            <div class="col-12">
                                <div class="custom-control custom-checkbox d-block mb-2">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                                    <label class="custom-control-label" for="customCheck1">{{ trans('user.privacy') }}</label>
                                </div>
                                <div class="custom-control custom-checkbox d-block mb-2">
                                    <input type="checkbox" class="custom-control-input" id="customCheck2">
                                    <label class="custom-control-label" for="customCheck2">{{ trans('user.create_account') }}</label>
                                </div>
                                <div class="custom-control custom-checkbox d-block">
                                    <input type="checkbox" class="custom-control-input" id="customCheck3">
                                    <label class="custom-control-label" for="customCheck3">{{ trans('user.subscribe') }}</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-5 ml-lg-auto">
                <div class="order-details-confirmation">
                    <div class="cart-page-heading">
                        <h5>{{ trans('user.order_title') }}</h5>
                        <p>{{ trans('user.order_subtitle') }}</p>
                    </div>
                    <ul class="order-details-form mb-4">
                        <li><span>{{ trans('user.product_column') }}</span> <span>{{ trans('user.total') }}</span></li>
                        <li><span><!-- Product Name --></span> <span><!-- Total --></span></li>
                        <li><span>{{ trans('user.subtotal') }}</span> <span><!-- Total --></span></li>
                        <li><span>{{ trans('user.shipping') }}</span> <span>{{ trans('user.free_shipping') }}</span></li>
                        <li><span>{{ trans('user.total') }}</span> <span><!-- Total --></span></li>
                    </ul>
                    <div id="accordion" role="tablist" class="mb-4">
                        <div class="card">
                            <div class="card-header" role="tab" id="headingOne">
                                <h6 class="mb-0">
                                    <a data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><i class="fa fa-circle-o mr-3"></i>{{ trans('user.paypal') }}</a>
                                </h6>
                            </div>
                            <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body">
                                    <p>{{ trans('user.lorem') }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" role="tab" id="headingTwo">
                                <h6 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><i class="fa fa-circle-o mr-3"></i>{{ trans('user.cash') }}</a>
                                </h6>
                            </div>
                            <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div class="card-body">
                                    <p>trans('user.lorem')</p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" role="tab" id="headingThree">
                                <h6 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><i class="fa fa-circle-o mr-3"></i>{{ trans('user.credit') }}</a>
                                </h6>
                            </div>
                            <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                                <div class="card-body">
                                    <p>{{ trans('user.lorem') }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" role="tab" id="headingFour">
                                <h6 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" href="#collapseFour" aria-expanded="true" aria-controls="collapseFour"><i class="fa fa-circle-o mr-3"></i>{{ trans('user.bank') }}</a>
                                </h6>
                            </div>
                            <div id="collapseFour" class="collapse show" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                                <div class="card-body">
                                    <p>{{ trans('user.lorem') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="btn essence-btn">{{ trans('user.order_button') }}</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

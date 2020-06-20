<footer class="footer_area clearfix">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="single_widget_area d-flex mb-30">
                    <div class="footer-logo mr-50">
                        <a href="#"><img src="{{ asset(config('constants.fixed_imgs_dir') . 'logo2.png') }}" alt=""></a>
                    </div>
                    <div class="footer_menu">
                        <ul>
                            <li><a href="#">{{ trans('footer.menu_1') }}</a></li>
                            <li><a href="#">{{ trans('footer.menu_2') }}</a></li>
                            <li><a href="#">{{ trans('footer.menu_3') }}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="single_widget_area mb-30">
                    <ul class="footer_widget_menu">
                        <li><a href="#">{{ trans('footer.widget_1') }}</a></li>
                        <li><a href="#">{{ trans('footer.widget_2') }}</a></li>
                        <li><a href="#">{{ trans('footer.widget_3') }}</a></li>
                        <li><a href="#">{{ trans('footer.widget_4') }}</a></li>
                        <li><a href="#">{{ trans('footer.widget_5') }}</a></li>
                        <li><a href="#">{{ trans('footer.widget_6') }}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row align-items-end">
            <div class="col-12 col-md-6">
                <div class="single_widget_area">
                    <div class="footer_heading mb-30">
                        <h6>{{ trans('footer.email_subcribe') }}</h6>
                    </div>
                    <div class="subscribtion_form">
                        <form action="#" method="post">
                            <input type="email" name="mail" class="mail" placeholder="{{ trans('footer.email_placeholder') }}">
                            <button type="submit" class="submit"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="single_widget_area">
                    <div class="footer_social_area">
                        <a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                        <a href="#" data-toggle="tooltip" data-placement="top" title="Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                        <a href="#" data-toggle="tooltip" data-placement="top" title="Pinterest"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                        <a href="#" data-toggle="tooltip" data-placement="top" title="Youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
<div class="row mt-5">
            <div class="col-md-12 text-center">
                <p>
                {{ trans('footer.bottom_1') }} &copy;<script>document.write(new Date().getFullYear());</script> {{ trans('footer.bottom_2') }} <i class="fa fa-heart-o" aria-hidden="true"></i> {{ trans('footer.bottom_3') }} <a href="#" target="_blank">{{ trans('footer.author') }}</a>
                </p>
            </div>
        </div>
    </div>
</footer>

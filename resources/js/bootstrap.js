window._ = require("lodash");

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require("popper.js").default;
    window.$ = window.jQuery = require("jquery");

    require("bootstrap");
    require("../../node_modules/jquery-ui-dist/jquery-ui.min");
    require("../../node_modules/owl.carousel/dist/owl.carousel.min");
    require("../../node_modules/jquery.easing/jquery.easing.min");
    require("../../node_modules/magnific-popup/dist/jquery.magnific-popup.min");
    require("../../node_modules/isotope-layout/dist/isotope.pkgd.min");
    require("../../node_modules/jquery.nicescroll/dist/jquery.nicescroll.min");
    require("../../node_modules/jquery-nice-select/js/jquery.nice-select.min");
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

(function($, window, document) {
    "use strict";

    // Main function
    $.fn.scrollUp = function(options) {
        // Ensure that only one scrollUp exists
        if (!$.data(document.body, "scrollUp")) {
            $.data(document.body, "scrollUp", true);
            $.fn.scrollUp.init(options);
        }
    };

    // Init
    $.fn.scrollUp.init = function(options) {
        // Define vars
        var o = ($.fn.scrollUp.settings = $.extend(
                {},
                $.fn.scrollUp.defaults,
                options
            )),
            triggerVisible = false,
            animIn,
            animOut,
            animSpeed,
            scrollDis,
            scrollEvent,
            scrollTarget,
            $self;

        // Create element
        if (o.scrollTrigger) {
            $self = $(o.scrollTrigger);
        } else {
            $self = $("<a/>", {
                id: o.scrollName,
                href: "#top"
            });
        }

        // Set scrollTitle if there is one
        if (o.scrollTitle) {
            $self.attr("title", o.scrollTitle);
        }

        $self.appendTo("body");

        // If not using an image display text
        if (!(o.scrollImg || o.scrollTrigger)) {
            $self.html(o.scrollText);
        }

        // Minimum CSS to make the magic happen
        $self.css({
            display: "none",
            position: "fixed",
            zIndex: o.zIndex
        });

        // Active point overlay
        if (o.activeOverlay) {
            $("<div/>", {
                id: o.scrollName + "-active"
            })
                .css({
                    position: "absolute",
                    top: o.scrollDistance + "px",
                    width: "100%",
                    borderTop: "1px dotted" + o.activeOverlay,
                    zIndex: o.zIndex
                })
                .appendTo("body");
        }

        // Switch animation type
        switch (o.animation) {
            case "fade":
                animIn = "fadeIn";
                animOut = "fadeOut";
                animSpeed = o.animationSpeed;
                break;

            case "slide":
                animIn = "slideDown";
                animOut = "slideUp";
                animSpeed = o.animationSpeed;
                break;

            default:
                animIn = "show";
                animOut = "hide";
                animSpeed = 0;
        }

        // If from top or bottom
        if (o.scrollFrom === "top") {
            scrollDis = o.scrollDistance;
        } else {
            scrollDis =
                $(document).height() - $(window).height() - o.scrollDistance;
        }

        // Scroll function
        scrollEvent = $(window).scroll(function() {
            if ($(window).scrollTop() > scrollDis) {
                if (!triggerVisible) {
                    $self[animIn](animSpeed);
                    triggerVisible = true;
                }
            } else {
                if (triggerVisible) {
                    $self[animOut](animSpeed);
                    triggerVisible = false;
                }
            }
        });

        if (o.scrollTarget) {
            if (typeof o.scrollTarget === "number") {
                scrollTarget = o.scrollTarget;
            } else if (typeof o.scrollTarget === "string") {
                scrollTarget = Math.floor($(o.scrollTarget).offset().top);
            }
        } else {
            scrollTarget = 0;
        }

        // To the top
        $self.click(function(e) {
            e.preventDefault();

            $("html, body").animate(
                {
                    scrollTop: scrollTarget
                },
                o.scrollSpeed,
                o.easingType
            );
        });
    };

    // Defaults
    $.fn.scrollUp.defaults = {
        scrollName: "scrollUp", // Element ID
        scrollDistance: 300, // Distance from top/bottom before showing element (px)
        scrollFrom: "top", // 'top' or 'bottom'
        scrollSpeed: 300, // Speed back to top (ms)
        easingType: "easeOutElastic", // Scroll to top easing (see http://easings.net/)
        animation: "fade", // Fade, slide, none
        animationSpeed: 200, // Animation in speed (ms)
        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
        scrollTarget: false, // Set a custom target element for scrolling to. Can be element or number
        scrollText: "Scroll to top", // Text for element, can contain HTML
        scrollTitle: false, // Set a custom <a> title if required. Defaults to scrollText
        scrollImg: false, // Set true to use image
        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 2147483647 // Z-Index for the overlay
    };

    // Destroy scrollUp plugin and clean all modifications to the DOM
    $.fn.scrollUp.destroy = function(scrollEvent) {
        $.removeData(document.body, "scrollUp");
        $("#" + $.fn.scrollUp.settings.scrollName).remove();
        $("#" + $.fn.scrollUp.settings.scrollName + "-active").remove();

        // If 1.7 or above use the new .off()
        if ($.fn.jquery.split(".")[1] >= 7) {
            $(window).off("scroll", scrollEvent);

            // Else use the old .unbind()
        } else {
            $(window).unbind("scroll", scrollEvent);
        }
    };

    $.scrollUp = $.fn.scrollUp;
})(jQuery, window, document);

!(function(e) {
    e.fn.classyNav = function(n) {
        var a = e(".classy-nav-container"),
            s = e(".classynav ul"),
            o = e(".classynav > ul > li"),
            l = e(".classy-navbar-toggler"),
            i = e(".classycloseIcon"),
            t = e(".navbarToggler"),
            d = e(".classy-menu"),
            r = e(window),
            c = e.extend(
                {
                    theme: "light",
                    breakpoint: 991,
                    openCloseSpeed: 300,
                    alwaysHidden: !1,
                    openMobileMenu: "left",
                    dropdownRtl: !1,
                    stickyNav: !1,
                    stickyFooterNav: !1
                },
                n
            );
        return this.each(function() {
            function n() {
                window.innerWidth <= c.breakpoint
                    ? a.removeClass("breakpoint-off").addClass("breakpoint-on")
                    : a.removeClass("breakpoint-on").addClass("breakpoint-off");
            }
            ("light" !== c.theme && "dark" !== c.theme) || a.addClass(c.theme),
                ("left" !== c.openMobileMenu && "right" !== c.openMobileMenu) ||
                    a.addClass(c.openMobileMenu),
                !0 === c.dropdownRtl && a.addClass("dropdown-rtl"),
                l.on("click", function() {
                    t.toggleClass("active"), d.toggleClass("menu-on");
                }),
                i.on("click", function() {
                    d.removeClass("menu-on"), t.removeClass("active");
                }),
                o.has(".dropdown").addClass("cn-dropdown-item"),
                o.has(".megamenu").addClass("megamenu-item"),
                s.find("li a").each(function() {
                    e(this).next().length > 0 &&
                        (e(this)
                            .parent("li")
                            .addClass("has-down")
                            .append('<span class="dd-trigger"></span>'),
                        e(this)
                            .parent("li")
                            .addClass("has-down")
                            .append('<span class="dd-arrow"></span>'));
                }),
                s.find("li .dd-trigger").on("click", function(n) {
                    n.preventDefault(),
                        e(this)
                            .parent("li")
                            .children("ul")
                            .stop(!0, !0)
                            .slideToggle(c.openCloseSpeed),
                        e(this)
                            .parent("li")
                            .toggleClass("active");
                }),
                e(".megamenu-item, .cn-dropdown-item").addClass("pr12"),
                e(".megamenu-item").removeClass("has-down pr12"),
                s.find("li .dd-trigger").on("click", function(n) {
                    n.preventDefault(),
                        e(this)
                            .parent("li")
                            .children(".megamenu")
                            .slideToggle(c.openCloseSpeed);
                }),
                n(),
                r.on("resize", function() {
                    n();
                }),
                !0 === c.alwaysHidden &&
                    a.addClass("breakpoint-on").removeClass("breakpoint-off"),
                !0 === c.stickyNav &&
                    r.on("scroll", function() {
                        r.scrollTop() > 0
                            ? a.addClass("classy-sticky")
                            : a.removeClass("classy-sticky");
                    }),
                !0 === c.stickyFooterNav && a.addClass("classy-sticky-footer");
        });
    };
})(jQuery);

(function($) {
    "use strict";

    var WOW = require("wowjs").WOW;
    var $window = $(window);

    // :: Nav Active Code
    if ($.fn.classyNav) {
        $("#essenceNav").classyNav();
    }

    // :: Sliders Active Code
    if ($.fn.owlCarousel) {
        $(".popular-products-slides").owlCarousel({
            items: 4,
            margin: 30,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
        $(".product_thumbnail_slides").owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: [
                "<img src='img/core-img/long-arrow-left.svg' alt=''>",
                "<img src='img/core-img/long-arrow-right.svg' alt=''>"
            ],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });
    }

    // :: Header Cart Active Code
    var cartbtn1 = $("#essenceCartBtn");
    var cartOverlay = $(".cart-bg-overlay");
    var cartWrapper = $(".right-side-cart-area");
    var cartbtn2 = $("#rightSideCart");
    var cartOverlayOn = "cart-bg-overlay-on";
    var cartOn = "cart-on";

    cartbtn1.on("click", function() {
        cartOverlay.toggleClass(cartOverlayOn);
        cartWrapper.toggleClass(cartOn);
    });
    cartOverlay.on("click", function() {
        $(this).removeClass(cartOverlayOn);
        cartWrapper.removeClass(cartOn);
    });
    cartbtn2.on("click", function() {
        cartOverlay.removeClass(cartOverlayOn);
        cartWrapper.removeClass(cartOn);
    });

    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: "easeInOutQuart",
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // :: Sticky Active Code
    $window.on("scroll", function() {
        if ($window.scrollTop() > 0) {
            $(".header_area").addClass("sticky");
        } else {
            $(".header_area").removeClass("sticky");
        }
    });

    // :: Nice Select Active Code
    if ($.fn.niceSelect) {
        $("select").niceSelect();
    }

    // :: Slider Range Price Active Code
    $(".slider-range-price").each(function() {
        var min = jQuery(this).data("min");
        var max = jQuery(this).data("max");
        var unit = jQuery(this).data("unit");
        var value_min = jQuery(this).data("value-min");
        var value_max = jQuery(this).data("value-max");
        var label_result = jQuery(this).data("label-result");
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function(event, ui) {
                var result =
                    label_result +
                    " " +
                    unit +
                    ui.values[0] +
                    " - " +
                    unit +
                    ui.values[1];
                t.closest(".slider-range")
                    .find(".range-price")
                    .html(result);
            }
        });
    });

    // :: Favorite Button Active Code
    var favme = $(".favme");

    favme.on("click", function() {
        $(this).toggleClass("active");
    });

    favme.on("click touchstart", function() {
        $(this).toggleClass("is_animating");
    });

    favme.on("animationend", function() {
        $(this).toggleClass("is_animating");
    });

    // :: Nicescroll Active Code
    if ($.fn.niceScroll) {
        $(".cart-list, .cart-content").niceScroll();
    }

    // :: wow Active Code
    if ($window.width() > 767) {
        new WOW({ live: false }).init();
    }

    // :: Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: PreventDefault a Click
    $("a[href='#']").on("click", function($) {
        $.preventDefault();
    });
})(jQuery);

/*
    Name: Mizio
    Description: Clean & Minimal Portfolio HTML5 Template
    Version: 1.0
    Author: MountainTheme

    TABLE OF CONTENTS
    ---------------------------
     1. Loading
     2. Page Loader
     3. Mobile Menu
     4. Flex Slider
     5. AOS
     6. LlghtGallery
     7. Stretch Portfolio
     8. Mizio cursor
     9. Portio
     10. Blog
     11. Parallax
     12. Fullscreen menu
     13. Contact Form
     14. Mizio Style
     15. Mizio Slider
     16. Mizio Creative
     17. Google Map
*/

jQuery.noConflict()(function($) {

'use strict';

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iPhone: function() {
    return navigator.userAgent.match(/iPhone/i);
  },
  iPad: function() {
    return navigator.userAgent.match(/iPad/i);
  },
  iPod: function() {
    return navigator.userAgent.match(/iPod/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


/* ================================= */
/* :::::::::: 1. Loading ::::::::::: */
/* ================================= */
$(window).load(function() {

  $(document).ready(function() {

    mt_minimal_loading();
    mt_mobile_menu();
    mt_flexslider();
    mt_mizio_creative();
    mt_ajax_contact_form();
    mt_aos();
    mt_mizio_slider();
    mt_mizio_cursor();
    mt_mizio_style();
    mt_parallax();
    mt_fullscreen_menu();
    mt_lightgallery();
    mt_google_map();
    mt_portfolio();
    mt_blog();

    // re-call functions for cube portfolio
    $(document).on('onAfterLoadMore.cbp', function(event) {
     mt_mizio_cursor();
     mt_aos();
    });

    $(document).on('filterComplete.cbp', function(event) {
     mt_aos();
    });
    
    jQuery("#grid-home").on('initComplete.cbp', function(event) {
     mt_stretch_portfolio();
     mt_aos();
    });

  });

});

/* ============================= */
/* :::::: 2. Page Loader ::::::: */
/* ============================= */

function mt_minimal_loading() {
  $('.minimal-page-loader').delay(1000).fadeOut("slow");
}

/* ================================= */
/* ::::::: 3. Mobile Menu :::::::::: */
/* ================================= */

function mt_mobile_menu() {

  $("nav .menu").slicknav({
    prependTo: 'header .mobile-menu',
    allowParentLinks: true
  });
}

/* ================================= */
/* :::::::: 4. Flex Slider ::::::::: */
/* ================================= */

function mt_flexslider() {
  $('.flexslider').flexslider({
    controlNav: false,
    prevText: '<i class="fa fa-angle-left"></i>',
    nextText: '<i class="fa fa-angle-right"></i>',
    slideshowSpeed: '4000',
    pauseOnHover: true
  });
}

/* ================================= */
/* :::::::::::: 5. AOS ::::::::::::: */
/* ================================= */

function mt_aos() {
  AOS.init({
    disable: 'mobile',
    offset: 120,
    once: true,
    duration: 1000,
    easing: 'ease',
  });
}

/* ================================= */
/* ::::::: 6. LlghtGallery ::::::::: */
/* ================================= */

function mt_lightgallery() {

  $("#wrapper").lightGallery({
    selector: '.mizio-gallery',
    share: false,
    download: false
  });

}

/* ================================= */
/* :::: 7. Stretch Portfolio ::::::: */
/* ================================= */

function mt_stretch_portfolio() {

  var obj = document.getElementById("grid-home");
  const rect = obj.getBoundingClientRect();
  const left = rect.left;
  const right = window.innerWidth - rect.right;

  const ml = parseFloat($("#grid-home").css('margin-left') || 0);
  const mr = parseFloat($("#grid-home").css('margin-right') || 0);
  $("#grid-home").css({
    'margin-left': ml - left,
    'margin-right': mr - right,
  });
}

if ($("#grid-home").hasClass('portfolio__stretch')) {
  const evp = `.vpf-uid-${ self.uid }`;
  const $wnd = $(window);
  $wnd.on(`load${ evp } resize${ evp } orientationchange${ evp }`, () => {
    mt_stretch_portfolio();
  });
  mt_stretch_portfolio();

}

/* ================================= */
/* :::::::: 8. Mizio cursor :::::::: */
/* ================================= */

function mt_mizio_cursor() {

  Array.prototype.forEach.call(document.querySelectorAll('.circle-drag'), function(media) {

    const circle = document.querySelector("." + media.getAttribute('data-circle'));
    TweenMax.set(circle, {
      scale: 0,
      xPercent: -50,
      yPercent: -50
    });

    media.addEventListener("pointerenter", function(e) {
      TweenMax.to(circle, 0.3, {
        scale: 1,
        opacity: 1
      });
      positionCircle(e, media, circle);
    });

    media.addEventListener("pointerleave", function(e) {
      TweenMax.to(circle, 0.3, {
        scale: 0,
        opacity: 0
      });
      positionCircle(e, media, circle);
    });

    media.addEventListener("pointermove", function(e) {
      positionCircle(e, media, circle);
    });

  });

  function positionCircle(e, media, circle) {
    var rect = media.getBoundingClientRect();
    var relX = e.pageX - rect.left;
    var relY = e.pageY - rect.top - window.scrollY;
    TweenMax.to(circle, 0.15, {
      x: relX,
      y: relY
    });
  }

}

/* ================================= */
/* ::::::::: 9. Portfolio :::::::::: */
/* ================================= */

function mt_portfolio() {

  $('#grid-home').cubeportfolio({
    filters: '.portfolioFilter',
    layoutMode: 'masonry',
    sortByDimension: true,
    mediaQueries: [{
      width: 1500,
      cols: 2,
    }, {
      width: 1100,
      cols: 2,
    }, {
      width: 800,
      cols: 2,
    }, {
      width: 480,
      cols: 1,
      options: {
        caption: '',
        gapHorizontal: 15,
        gapVertical: 15,
      }
    }],
    defaultFilter: '*',
    animationType: 'quicksand',
    gapHorizontal: 135,
    gapVertical: 95,
    gridAdjustment: 'responsive',
    caption: 'zoom',
    displayType: 'sequentially',
    displayTypeSpeed: 100,

    plugins: {
      loadMore: {
        element: '.load-more',
        action: 'click',
        loadItems: 2,
      }
    },
  });


  $('#grid-masonry-2').cubeportfolio({
    filters: '.portfolioFilter',
    layoutMode: 'masonry',
    sortByDimension: true,
    mediaQueries: [{
      width: 1500,
      cols: 2,
    }, {
      width: 1100,
      cols: 2,
    }, {
      width: 800,
      cols: 2,
    }, {
      width: 480,
      cols: 1,
      options: {
        caption: '',
        gapHorizontal: 15,
        gapVertical: 15,
      }
    }],
    defaultFilter: '*',
    animationType: 'quicksand',
    gapHorizontal: 115,
    gapVertical: 125,
    gridAdjustment: 'responsive',
    caption: 'zoom',
    displayType: 'sequentially',
    displayTypeSpeed: 100,

    plugins: {
      loadMore: {
        element: '.load-more',
        action: 'click',
        loadItems: 2,
      }
    },
  });


  $('#grid-masonry-3').cubeportfolio({
    filters: '.portfolioFilter',
    layoutMode: 'masonry',
    sortByDimension: true,
    mediaQueries: [{
      width: 1500,
      cols: 3,
    }, {
      width: 1100,
      cols: 3,
    }, {
      width: 800,
      cols: 2,
    }, {
      width: 480,
      cols: 1,
      options: {
        caption: '',
        gapHorizontal: 15,
        gapVertical: 15,
      }
    }],
    defaultFilter: '*',
    animationType: 'quicksand',
    gapHorizontal: 0,
    gapVertical: 0,
    gridAdjustment: 'responsive',
    caption: 'zoom',
    displayType: 'sequentially',
    displayTypeSpeed: 100,

    plugins: {
      loadMore: {
        element: '.load-more',
        action: 'click',
        loadItems: 1,
      }
    },
  });

  $('#grid-masonry-4').cubeportfolio({
    filters: '.portfolioFilter',
    layoutMode: 'masonry',
    sortByDimension: true,
    mediaQueries: [{
      width: 1500,
      cols: 4,
    }, {
      width: 1100,
      cols: 4,
    }, {
      width: 800,
      cols: 3,
    }, {
      width: 480,
      cols: 1,
      options: {
        caption: '',
        gapHorizontal: 15,
        gapVertical: 15,
      }
    }],
    defaultFilter: '*',
    animationType: 'quicksand',
    gapHorizontal: 0,
    gapVertical: 0,
    gridAdjustment: 'responsive',
    caption: 'zoom',
    displayType: 'sequentially',
    displayTypeSpeed: 100,

    plugins: {
      loadMore: {
        element: '.load-more',
        action: 'click',
        loadItems: 1,
      }
    },
  });

}

/* ================================= */
/* :::::::::: 10. Blog ::::::::::::: */
/* ================================= */

function mt_blog() {

  $('#grid-blog').cubeportfolio({
    filters: '.blogFilter',
    layoutMode: 'masonry',
    sortByDimension: true,
    mediaQueries: [{
      width: 1500,
      cols: 1,
    }, {
      width: 1100,
      cols: 1,
    }, {
      width: 800,
      cols: 1,
    }, {
      width: 480,
      cols: 1,
      options: {
        caption: '',
        gapHorizontal: 15,
        gapVertical: 15,
      }
    }],
    defaultFilter: '*',
    animationType: 'quicksand',
    gapHorizontal: 30,
    gapVertical: 0,
    gridAdjustment: 'responsive',
    caption: 'zoom',
    displayType: 'sequentially',
    displayTypeSpeed: 100,

    plugins: {
      loadMore: {
        element: '.blog-load-more',
        action: 'click',
        loadItems: 2,
      }
    },
  });

  $('#grid-blog-2').cubeportfolio({
    filters: '.blogFilter',
    layoutMode: 'masonry',
    sortByDimension: true,
    mediaQueries: [{
      width: 1500,
      cols: 2,
    }, {
      width: 1100,
      cols: 2,
    }, {
      width: 800,
      cols: 2,
    }, {
      width: 480,
      cols: 1,
      options: {
        caption: '',
        gapHorizontal: 15,
        gapVertical: 0,
      }
    }],
    defaultFilter: '*',
    animationType: 'quicksand',
    gapHorizontal: 30,
    gapVertical: 30,
    gridAdjustment: 'responsive',
    caption: 'zoom',
    displayType: 'sequentially',
    displayTypeSpeed: 100,

    plugins: {
      loadMore: {
        element: '.blog-load-more',
        action: 'click',
        loadItems: 2,
      }
    },
  });

  $('#grid-blog-3').cubeportfolio({
    filters: '.blogFilter',
    layoutMode: 'masonry',
    sortByDimension: true,
    mediaQueries: [{
      width: 1500,
      cols: 3,
    }, {
      width: 1100,
      cols: 3,
    }, {
      width: 800,
      cols: 3,
    }, {
      width: 480,
      cols: 1,
      options: {
        caption: '',
        gapHorizontal: 15,
        gapVertical: 0,
      }
    }],
    defaultFilter: '*',
    animationType: 'quicksand',
    gapHorizontal: 30,
    gapVertical: 30,
    gridAdjustment: 'responsive',
    caption: 'zoom',
    displayType: 'sequentially',
    displayTypeSpeed: 100,

    plugins: {
      loadMore: {
        element: '.blog-load-more',
        action: 'click',
        loadItems: 2,
      }
    },
  });
}

/* ================================= */
/* :::::::: 11. Parallax ::::::::::: */
/* ================================= */

function mt_parallax() {
  $('.parallax').jarallax({
    speed: 0.5,
    noAndroid: true
  });
}

/* ==================================== */
/* :::::: 12. Fullscreen menu ::::::::: */
/* ==================================== */

function mt_fullscreen_menu() {

  // fullscreen menu
  $(".fullscreen-nav-trigger").on("click", function() {
    $(this).toggleClass("active");
    $(".fullscreen-menu").toggleClass("visible-fullscreen-menu");
    $("body").toggleClass("hidden-scroll");
  });

  // for toggle menu
  $("#toggle-menu li.menu-item-has-children > a").on("click", function(e) {
    e.preventDefault();
    $(this).siblings(".sub-menu").slideToggle(300);
    $(this).parent("li.menu-item-has-children").toggleClass("is-open");
  });

}

/* ================================= */
/* :::::: 13. Contact Form ::::::::: */
/* ================================= */

function mt_ajax_contact_form() {

  $('#submit').on("click", function() {
    // validate and process form here 
    $("#ajax-contact-form").validate({

      rules: {

        name: {
          required: true,
        },

        email: {
          required: true,
          email: true,
        },

        phone: {
          required: true,
        },

        msg: {
          required: true,
        },
      },

      messages: {

        name: {
          required: "The field is required.",
        },

        email: {
          required: "The field is required.",
          email: "The e-mail address entered is invalid.",
        },

        phone: {
          required: "The field is required.",
        },

        msg: {
          required: "The field is required.",
        },

      },

      // JQuery's awesome submit handler.
      submitHandler: function(form) {

        // Create variables from the form
        var name = $('input#name').val();
        var email = $('input#email').val();
        var phone = $('input#phone').val();
        var msg = $('textarea#msg').val();

        // Create variables that will be sent in a URL string to contact.php
        var dataString = '&name=' + name + '&email=' + email + '&phone=' + phone + '&msg=' + msg;

        $.ajax({
          type: "POST",
          url: "php/contact.php",
          data: dataString,
          success: function(data) {
            if (data == 'OK') {
              var result = '<div class="notification_ok"><i class="fa fa-check"></i> Your email was sent. Thanks!</div>';
              $("#ajax-contact-form").find('input[type=text], input[type=email], textarea').val("");

            } else {
              result = data;
            }
            $('#note').html(result);

          }

        });
        return false;
      }
    });
  });

}

/* ================================ */
/* :::::: 14. Mizio Style ::::::::: */
/* ================================ */

function mt_mizio_style() {

  if ($('.mizio-style').length) {

    const toggleSwitch = document.querySelector('.mizio-style input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
      document.documentElement.setAttribute('mizio-style', currentTheme);

      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
      }
    }

    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('mizio-style', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('mizio-style', 'light');
        localStorage.setItem('theme', 'light');
      }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

  }

}

/* ================================ */
/* :::::: 15. Mizio Slider :::::::: */
/* ================================ */

function mt_mizio_slider() {

  //Vars Swiper
  var currentIndex,
    slidesCount;

  //Init Swiper
  var swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    spaceBetween: 60,
    slidesPerView: 'auto',
    parallax: true,
    loop: true,
    speed: 1000,
    mousewheel: true,
    observer: true,
    observeParents: true,
    allowTouchMove: false,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      1036: {
        allowTouchMove: true,
        mousewheel: false,
        freeMode: true,
        parallax: false,
      }
    },
    on: {
      init: function() {
        currentIndex = this.realIndex + 1;
        slidesCount = $('.swiper-slide:not(.swiper-slide-duplicate)').length;

        var title = $(this.slides[this.activeIndex]).attr("data-title");
        $('.current-title').text(title);

        var category = $(this.slides[this.activeIndex]).attr("data-category");
        $('.current-category').text(category);

        $('.current-box-title').attr('data-heading', title);

        $('.image-mizio').addClass('circle-drag');

        $(".image-mizio").each(function(index) {
          $(this).attr("data-circle", "js-circle-" + index + "");
        });

        $(".mizio-circle").each(function(index) {
          $(this).addClass("js-circle-" + index + "");
        });

        updateCounter();
      },
      transitionEnd: function() {
        currentIndex = this.realIndex + 1;

        var title = $(this.slides[this.activeIndex]).attr("data-title");
        $('.current-title').text(title);

        var category = $(this.slides[this.activeIndex]).attr("data-category");
        $('.current-category').text(category);

        $('.current-box-title').attr('data-heading', title);

        updateCounter();
      },
      slideChange: function() {
        $('.box-slide, .box-inner-slide').removeClass('is_active_next');
        $('.box-slide, .box-inner-slide').removeClass('is_active_prev');

      },
      slideNextTransitionEnd: function() {
        $('.box-slide, .box-inner-slide').addClass('is_active_next');
      },
      slidePrevTransitionStart: function() {
        $('.box-slide, .box-inner-slide').addClass('is_active_prev_bottom');
      },
      slidePrevTransitionEnd: function() {
        $('.box-slide, .box-inner-slide').addClass('is_active_prev');
        $('.box-slide, .box-inner-slide').removeClass('is_active_prev_bottom');
      },

    }
  });

  function pad(num) {
    var s = num + "";
    while (s.length < 2) s = "0" + s;
    return s;
  }

  function updateCounter() {
    var current = pad(currentIndex);
    var total = pad(slidesCount);

    $('.current-slide').text(current);
    $('.total-slides').text(total);
  }


}

/* ================================ */
/* ::::: 16. Mizio Creative ::::::: */
/* ================================ */

function mt_mizio_creative() {

  function loadData() {
    $('.left-title-project:first, .left-title-project.is_hovered').each(function() {
      var title = $(this).data('title'),
        category = $(this).data('category'),
        year = $(this).data('year'),
        text = $(this).data('text'),
        image = $(this).data('image'),
        url = $(this).data('url');

      $('.right-title-project').text(title);
      $('.category-project').text(category);
      $('.date-project').text(year);
      $('.text-project').text(text);
      $(".details-project a, .cover-box-project a").attr("href", "" + url + "");
      $('.image-cover').animate({
        opacity: 0
      }, 100, function() {
        $(this).css({
          'background-image': 'url(' + image + ')'
        }).animate({
          opacity: 1
        });
      });
    });

  }

  loadData();

  $('.left-title-project:first').addClass('is_hovered');

  var mizioMenu = $('.left-box-project .left-title-project');

  mizioMenu.mouseenter(function() {
    mizioMenu.filter('.is_hovered').removeClass("is_hovered");
    $(this).addClass("is_hovered");

    loadData();

  });

}

/* ================================= */
/* :::::::: 17. Google Map ::::::::: */
/* ================================= */

function mt_google_map() {

  if ($('#google-container').length) {

    //set your google maps parameters
    var latitude = 34.300362,
      longitude = -118.241269,
      map_zoom = 8;

    //google map custom marker icon - .png fallback for IE11
    var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    var marker_url = (is_internetExplorer11) ? 'assets/images/dot-map.png' : 'assets/images/dot-map.png';

    //define the basic color of your map, plus a value for saturation and brightness

    var saturation_value = -18,
      brightness_value = 15;

    //we define here the style of the map
    var style = [{
        //set saturation for the labels on the map
        elementType: 'labels',
        stylers: [{
          saturation: saturation_value
        }, ]
      },
      { //poi stands for point of interest - don't show these lables on the map 
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }, ]
      },
      {
        //don't show highways lables on the map
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }, ]
      },

      {
        //don't show arterial road lables on the map
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }, ]
      },
      {
        //don't show road lables on the map
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      //style different elements on the map
      {
        featureType: 'transit',
        elementType: 'geometry.fill',
        stylers: [{
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      {
        featureType: 'poi.government',
        elementType: 'geometry.fill',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      {
        featureType: 'poi.sport_complex',
        elementType: 'geometry.fill',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      {
        featureType: 'poi.attraction',
        elementType: 'geometry.fill',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      {
        featureType: 'poi.business',
        elementType: 'geometry.fill',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry.fill',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry.fill',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      },
      {
        featureType: 'landscape',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]

      },


      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [

          {
            visibility: 'on'
          },
          {
            lightness: brightness_value
          },
          {
            saturation: saturation_value
          },
        ]
      }
    ];


    //set google map options
    var map_options = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: map_zoom,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: style,
      fullscreenControl: false,
    }

    //inizialize the map
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    //add a custom marker to the map

    var contentString = '<div class="contact-box left">' + '<h3>CONTACT INFORMATION.</h3>' + '<ul>' + '<li><i class="fa-fw fa fa-map-marker"></i>Melbourne, Australia</li>' + '<li><i class="fa-fw fa fa-phone"></i>765-302-2878</li>' + '<li><i class="fa-fw fa fa-envelope-o"></i><a href="mailto:name@domain.com" target="_blank">name@domain.com</a></li>' + '<li><i class="fa-fw fa fa-globe"></i><a href="https://themeforest.net/user/mountaintheme" target="_blank">mycompanyname.com</a></li>' + '</ul>' + '</div>'


    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map,
      title: 'Santa Monica, Los Angeles',
      visible: true,
      icon: marker_url,
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);

    });


  }
}

});

$(document).ready( () => {
    (function($){
        var typed = new Typed('span.txt-rotate', {
            strings: ['Soy estudiante', 'Soy programador ', 'Soy Guille Casasola.'],
            typeSpeed: 50,
            backSpeed: 100,
            fadeOut: false,
            smartBackspace: true,
        });

         // Floating label headings for the contact form
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    
      // Show the navbar when the page is scrolled up
      var MQL = 992;
    
      //primary navigation slide-in effect
      if ($(window).width() > MQL) {
        var headerHeight = $('#mainNav').height();
        $(window).on('scroll', {
            previousTop: 0
          },
          function() {
            var currentTop = $(window).scrollTop();
            //check if user is scrolling up
            if (currentTop < this.previousTop) {
              //if scrolling up...
              if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
                $('#mainNav').addClass('is-visible');
              } else {
                $('#mainNav').removeClass('is-visible is-fixed');
              }
            } else if (currentTop > this.previousTop) {
              //if scrolling down...
              $('#mainNav').removeClass('is-visible');
              if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
            }
            this.previousTop = currentTop;
          });
      }
    })(jQuery);
    
    $(".projects-wrapper").isotope({
        filter: '*',
        layoutMode: 'masonry'
    });
    $(".list-filter a").click(function(){
        var selector =  $(this).attr('data-filter');
        $('.list-filter a').removeClass('active');
        $(this).addClass('active');
        $('.projects-wrapper').isotope({
            filter: selector
        });
        return false
    })

    $(".popup-image").magnificPopup({
        type:'image',
        closeOnContentClick: true,
        gallery:{
            enabled: true,
            navigateByImgClick: true
        }
    })
    $(".popup-image-2").magnificPopup({
        type:'image'
    })
});

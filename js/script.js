
$(document).ready( () => {

    (function($){
        var typed = new Typed('span.txt-rotate', {
            strings: ['Soy Lic. en Computación...','Soy desarrollador.. ','Soy entusiasta...', 'Soy Guille Casasola.'],
            typeSpeed: 50,
            backSpeed: 80,
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

    // Timer Recibida 
    const timestamp = new Date('Wed Nov 30 2022 10:00:00 GMT-0300').getTime() / 1000
    var flipdown = new FlipDown(timestamp);
    flipdown.start();
    flipdown.ifEnded(() => {
        
      console.log('The countdown has ended!');
    });
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbxSxHVwvgQjOWaIvh1c0i7x3mGAUS_corwEDZ4_jn3q_YnuXkSwj1epRGn9Lcm5UQ/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()

  const formData = new FormData();

  formData.append('Nombre', form['nombre'].value);
  formData.append('Email', form['email'].value);

  formData.append('Suscribirse', form['newsletter'].checked);
  formData.append('Comentario', form['comentario'].value);

  $("#contact-form").hide()
  $("#loading").show()
  $('#contactModalLabel').text('Enviando mensaje...');
  fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', 
      body: formData 
  }).finally(()=>{
    $('#contactModal').modal('hide');

    Swal.fire({
      title: 'Mensaje Enviado!',
      html: 'Gracias por contactarte. Te mando un abrazo <img src="/images/abrazo.svg" width="25" height="25">',

      icon: 'success',
      confirmButtonColor: '#c9a04f', 
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      // if (result.isConfirmed) {
      // }  Lo dejo comentado para saber que se puede esperar respuesta del boton
      form.reset();
      $("#contact-form").show()
      $("#loading").hide()
      $('#contactModalLabel').text('Espero tu mensaje!');
    })
  });
 

  
})



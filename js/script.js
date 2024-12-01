
initializeTheme()
$(document).ready(() => {
  setTimeout(()=>{
    initializeTheme()
  },1000)
  (function ($) {
    var typed = new Typed('span.txt-rotate', {
      strings: ['Soy Lic. en Computación...', 'Soy desarrollador.. ', 'Soy Guille Casasola.'],
      typeSpeed: 50,
      backSpeed: 80,
      fadeOut: false,
      smartBackspace: true,
    });

    // Show the navbar when the page is scrolled up
    var MQL = 992;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
      var headerHeight = $('#mainNav').height();
      $(window).on('scroll', {
        previousTop: 0
      },
        function () {
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
  $(".list-filter a").click(function () {
    var selector = $(this).attr('data-filter');
    $('.list-filter a').removeClass('active');
    $(this).addClass('active');
    $('.projects-wrapper').isotope({
      filter: selector
    });
    return false
  })

  $(function () {
    $('[data-bs-toggle="popover"]').popover()
  })
  // $(".popup-image").magnificPopup({
  //     type:'image',
  //     closeOnContentClick: true,
  //     gallery:{
  //         enabled: true,
  //         navigateByImgClick: true
  //     }
  // })
  // $(".popup-image-2").magnificPopup({
  //     type:'image'
  // })

  // Timer Recibida 
  // const timestamp = new Date('Wed Nov 30 2022 10:00:00 GMT-0300').getTime() / 1000
  // var flipdown = new FlipDown(timestamp);
  // flipdown.start();
  // flipdown.ifEnded(() => {

  //   console.log('The countdown has ended!');
  // });
});



function setTheme(theme) {
  if (theme === 'light' || theme === 'dark') {
    localStorage.setItem('theme', theme);
    console.log(`Theme set to ${theme}`);
  } else {
    console.error('Invalid theme. Please use "light" or "dark".');
  }
}
function getTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    console.log(`Current theme is ${theme}`);
    return theme;
  } else {
    console.log('No theme set. Defaulting to "light".');
    return 'light'; // Retorna 'light' como valor predeterminado si no hay un tema configurado.
  }
}



function toggleTheme() {

  const currentTheme = document.documentElement.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', newTheme); // Cambiar el atributo

  toggleIcons(newTheme)
  setTheme(newTheme); // Almacenar en localStorage
  sendMessage({
    setConfig: {
      theme: newTheme
    }
  });
}
function toggleIcons(theme) {
  const iconNight = document.getElementById('icon-night');
  const iconSunny = document.getElementById('icon-sunny');
  iconNight.classList.toggle('d-none', theme == "dark");
  iconSunny.classList.toggle('d-none', theme == "light");
}
function initializeTheme() {
  const theme = getTheme();
  document.documentElement.setAttribute('data-bs-theme', theme); // Establece el atributo en <html>
  toggleIcons(theme)
  sendMessage({
    setConfig: {
      theme: theme
    }
  });
}

function sendMessage(message) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}
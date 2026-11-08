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
  }).finally(() => {
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
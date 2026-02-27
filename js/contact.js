const form = document.getElementById('form')
var wrapper = document.querySelector('.contact-form-wrapper')

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault()
  const formData = new FormData(form)
  const object = Object.fromEntries(formData)
  const json = JSON.stringify(object)
  wrapper.innerHTML = '<div class="contact-loading"><div class="loader"></div></div>'
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  }).then(async (response) => {
    let json = await response.json()
    if (response.status == 200) {
      wrapper.innerHTML =
        '<div class="contact-success">' +
          '<img src="/images/envelope-circle-check-solid-full.svg" alt="" class="contact-success__icon">' +
          '<p class="contact-success__message">Contact submission sent! I will get back to you soon</p>' +
        '</div>'
      form.reset()
    } else {
      console.log(response)
    }
  })
  .catch(error => {
    console.log(error)
  })
})